import { Head, router, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js/index";
import { useState } from "react";

export default function EditPost({ currentPost }) {
  const { data, setData, post, errors, processing } = useForm({
    title: currentPost.title,
    body: currentPost.body,
    image: null,
  });

  const errorsActive = errors;

  const route = useRoute();

  function submit(e) {
    e.preventDefault();
    // Option 1, needs a post route in web.php
    // post(route("posts.update", currentPost.id));

    // Option 2, needs a post route in web.php
    // post(`/posts/${currentPost.id}`);

    // Option 3
    router.post(route("posts.update", currentPost.id), {
      _method: "PUT",
      title: data.title,
      body: data.body,
      image: data.image,
    });
  }

  const [image, setImage] = useState(null);
  const reader = new FileReader();

  // change and preview post image
  function handleImageChange(e) {
    const file = e.target.files[0];

    reader.onload = (e) => {
      if (file.size > 2048000) {
        // 2 MB limit
        alert("File size exceeds the limit of 2MB");
        return;
      }

      setImage(e.target.result);
      setData("image", file);
      errorsActive.image = "";
    };

    file && reader.readAsDataURL(file);
  }

  function removeImage() {
    setData("image", null);
    currentPost.image = null;
    setImage(null);
  }

  return (
    <>
      <Head title="Edit post" />

      <h1 className="text-xl text-center mt-4 font-semibold leading-tight text-gray-800">
        Edit post
      </h1>

      <div>
        <form
          onSubmit={submit}
          encType="multipart/form-data"
          className="w-96 sm:w-[512px] py-12 px-8 mx-auto"
        >
          <label className="mb-1 block" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            id="title"
            value={data.title}
            className={`w-full mb-4 ${
              errors.title && errorsActive.title ? "border-red-500" : ""
            }`}
            type="text"
            onChange={(e) => {
              setData("title", e.target.value);
              errors.title = "";
            }}
          />
          {errors.title && <p className="text-red-500 pb-4">{errors.title}</p>}
          <label className="mb-1 block" htmlFor="body">
            Text
          </label>
          <textarea
            name="body"
            id="body"
            value={data.body}
            className={`w-full min-h-64 ${
              errors.body && errorsActive.body ? "border-red-500" : ""
            }`}
            type="text"
            onChange={(e) => {
              setData("body", e.target.value);
              errors.body = "";
            }}
            rows={10}
          />
          {errors.body && <p className="text-red-500 pb-4">{errors.body}</p>}

          <label className="mt-2 mb-1 block" htmlFor="image">
            Image
          </label>
          <input
            name="image"
            id="image"
            type="file"
            className={`w-full mb-4 ${
              errors.image && errorsActive.image ? "border-red-500" : ""
            }`}
            onChange={handleImageChange}
          />
          {errors.image && <p className="text-red-500 pb-4">{errors.image}</p>}

          {(currentPost.image || image) && (
            <div>
              <img
                className="w-20 h-20 mb-4"
                src={image ? image : "/storage/" + currentPost.image}
                alt="post's image"
              />
              <button onClick={removeImage} className="px-2 py-1 mt-4 text-sm text-white bg-red-500 hover:bg-red-400 rounded-sm flex">
                Remove image
              </button>
            </div>
          )}

          <button
            className={`mx-auto px-16 py-2 mt-8 bg-slate-300 hover:bg-slate-400 rounded-full flex ${
              processing && "animate-pulse"
            }`}
            type="submit"
            disabled={processing}
          >
            Update Post
          </button>
        </form>
      </div>
    </>
  );
}
