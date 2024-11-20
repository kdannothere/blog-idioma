import { Head, Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js/index";

export default function PostDetails({ post }) {
  const { delete: destroy } = useForm();
  const route = useRoute();

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("posts.destroy", post));
  }

  return (
    <>
      <Head title={post.title} />
      {post ? (
        <article
          key={post.id}
          className="mx-8 my-8 p-8 md:mx-16 2xl:w-[1440px] 2xl:mx-auto bg-slate-200 rounded-3xl overflow-hidden"
        >
          <div className="pb-2 flex flex-wrap text-sm text-gray-500">
            <span className="mr-auto">
              {"Posted: " +
                new Date(post.created_at).toLocaleDateString() +
                " - " +
                new Date(post.created_at).toLocaleTimeString()}
            </span>
            <div className="inline-flex ml-4">
              <form onSubmit={handleDelete}>
                <button className="rounded-lg px-2 py-1 text-white bg-red-600 hover:bg-red-500">
                  Delete
                </button>
              </form>
            </div>
            <div className="inline-flex ml-4">
              <Link
                href={route("posts.edit", post)}
                className="rounded-lg px-2 py-1 text-white bg-green-600 hover:bg-green-500"
              >
                Edit
              </Link>
            </div>
          </div>
          <h1 className="text-xl font-semibold pb-4 overflow-hidden text-ellipsis">
            {post.title}
          </h1>
          <p className="overflow-hidden text-ellipsis">{post.body}</p>
        </article>
      ) : (
        <p className="text-center w-full py-8">Loading...</p>
      )}
    </>
  );
}
