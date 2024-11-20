import { Head, Link} from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy/src/js/index";
import Message from "@/Components/Message";

export default function Home({ posts }) {
  const route = useRoute();

  return (
    <>
      <Head title="Home" />

      <Message></Message>

      <h1 className="text-xl text-center mt-4 font-semibold leading-tight text-gray-800">
        Latest posts
      </h1>
      <div className="block md:grid md:grid-cols-2 2xl:grid 2xl:grid-cols-3">
        {posts.data ? (
          posts.data.map((post) => (
            <article
              key={post.id}
              className="m-4 p-4 bg-slate-300 rounded-3xl overflow-hidden"
            >
              <p className="pb-2 flex text-sm text-gray-500">
                  {"Posted: " +
                    new Date(post.created_at).toLocaleDateString() +
                    " - " +
                    new Date(post.created_at).toLocaleTimeString()}
              </p>
              <h2 className="text-xl font-semibold pb-4 overflow-hidden text-ellipsis">
                {post.title}
              </h2>
              <p className="overflow-hidden text-ellipsis">{post.body}</p>

              <Link
                className="rounded-lg p-1 mt-4 block w-fit bg-slate-200 hover:bg-slate-100"
                href={route("posts.show", post)}
              >
                Read more...
              </Link>

              {/* <Link
                  className="rounded-lg p-1 mt-4 block w-fit bg-slate-200 hover:bg-slate-100"
                  href={`/posts/${post.id}`}
                >
                  Read more...
                </Link> */}
            </article>
          ))
        ) : (
          <p className="text-center w-full py-8">Loading...</p>
        )}
      </div>

      <nav className="mx-4 my-4 flex flex-wrap">
        {posts.links.map((link) =>
          link.url && !link.active ? (
            <Link
              key={link.label}
              dangerouslySetInnerHTML={{ __html: link.label }}
              href={link.url}
              disabled={link.active}
              className={`mx-1 mb-2 px-3 py-2 w-fit h-fit bg-slate-300 hover:bg-slate-200 rounded-full`}
            />
          ) : (
            <span
              key={link.label}
              dangerouslySetInnerHTML={{ __html: link.label }}
              className={`mx-1 mb-2 px-3 py-2 w-fit h-fit bg-slate-300 hover:bg-slate-200 rounded-full cursor-default ${
                link.active ? "bg-slate-400" : "opacity-60"
              }`}
            ></span>
          )
        )}
      </nav>
    </>
  );
}
