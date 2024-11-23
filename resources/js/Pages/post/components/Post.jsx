import { Link, useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy/src/js/index";
import { stringTruncate } from "@/utils";

const Post = ({
  post,
  user,
  isSinglePost = true,
  action = null,
  readMore = null,
  maxLength = 0,
}) => {
  const { delete: destroy } = useForm();
  const route = useRoute();

  function handleDelete(e) {
    e.preventDefault();
    destroy(route("posts.destroy", post));
  }
  return (
    <>
      <article className="my-8 p-8 min-w-80 flex flex-col md:mx-8 bg-slate-200 rounded-3xl overflow-hidden">
        <div className="panel flex justify-between">
          <div className="info text-sm text-gray-500">
            <p className="flex flex-wrap">
              <span className="mr-1">Posted:</span>
              <span className="mr-1">
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span>{new Date(post.created_at).toLocaleTimeString()}</span>
            </p>
            <p className="pb-2 flex text-sm text-gray-500">
              <span>Author:</span>
              <Link
                className="pl-1 text-gray-700 font-semibold hover:text-blue-500"
                href={route("posts.user", user)}
              >
                {user.name}
              </Link>
            </p>
          </div>
          <div className="actions h-fit flex justify-end flex-wrap">
            {action?.delete && (
              <div className="inline-flex ml-4 mb-4">
                <form onSubmit={handleDelete}>
                  <button className="rounded-lg px-2 py-1 text-white bg-red-600 hover:bg-red-500">
                    Delete
                  </button>
                </form>
              </div>
            )}
            {action?.edit && (
              <div className="inline-flex ml-4 mb-4">
                <Link
                  href={route("posts.edit", post)}
                  className="rounded-lg px-2 py-1 text-white bg-green-600 hover:bg-green-500"
                >
                  Edit
                </Link>
              </div>
            )}
          </div>
        </div>
        {isSinglePost ? (
          <h1 className="text-xl font-semibold pb-4 overflow-hidden text-ellipsis">
            {post.title}
          </h1>
        ) : (
          <h2 className="text-xl font-semibold pb-4 overflow-hidden text-ellipsis">
            {post.title}
          </h2>
        )}
        <p className="mb-4 overflow-hidden text-ellipsis">
          {stringTruncate(post.body, maxLength)}
        </p>
        {readMore && (
          <Link
            className="mt-auto rounded-lg px-3 py-1 my-4 block w-fit bg-slate-300 hover:bg-slate-100"
            href={route("posts.show", post)}
          >
            Read more
          </Link>
        )}
      </article>
    </>
  );
};

export default Post;
