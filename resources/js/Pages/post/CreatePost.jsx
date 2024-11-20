import { Head, useForm } from "@inertiajs/react";

export default function CreatePost() {
  const { data, setData, post, errors, processing } = useForm({
    title: "",
    body: "",
  });

  const errorsActive = errors;

  function submit(e) {
    e.preventDefault();
    post("/posts");
  }

  return (
    <>
      <Head title="Create new post" />

      <h1 className="text-xl text-center mt-4 font-semibold leading-tight text-gray-800">
        Create new post
      </h1>

      <div>
        <form
          onSubmit={submit}
          className="w-96 sm:w-[512px] py-12 px-8 mx-auto"
        >
          <label className="mb-1 block" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            value={data.title}
            className={`w-full mb-4 ${
              (errors.title && errorsActive.title) ? "border-red-500" : ''
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
            value={data.body}
            className={`w-full min-h-64 ${
              (errors.body && errorsActive.body) ? "border-red-500" : ''
            }`}
            type="text"
            onChange={(e) => {
              setData("body", e.target.value);
              errors.body = "";
            }}
            rows={10}
          />
          {errors.body && <p className="text-red-500 pb-4">{errors.body}</p>}

          <button
            className={`mx-auto px-16 py-2 mt-8 bg-slate-300 hover:bg-slate-400 rounded-full flex ${
              processing && "animate-pulse"
            }`}
            type="submit"
            disabled={processing}
          >
            Create Post
          </button>
        </form>
      </div>
    </>
  );
}
