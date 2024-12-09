import { Head, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Post from "./components/Post";
import { useRoute } from "../../../../vendor/tightenco/ziggy/src/js/index";

export default function UserPosts({ posts, user, isSubscribed, isAuthor }) {
  const { post, processing } = useForm();
  const route = useRoute();

  function handleSubscribe(e) {
    e.preventDefault();
    post(route(isSubscribed ? "user.unsubscribe" : "user.subscribe", user));
  }

  return (
    <>
      <Head title="Dashboard" />

      <h1 className="text-xl text-center my-4 font-semibold leading-tight text-gray-800">
        {user.name}'s posts
      </h1>

      {!isAuthor && (
        <form className="flex" onSubmit={handleSubscribe}>
          <button
            className={`ml-auto mr-6 rounded-lg px-2 py-1 text-white bg-amber-400 hover:bg-amber-500 ${
              processing && "animate-pulse"
            }`}
          >
            {isSubscribed ? "Unsubscribe" : "Subscribe"}
          </button>
        </form>
      )}

      <div className="mx-4 mt-4 block md:grid md:grid-cols-2 2xl:grid-cols-3">
        {posts.data &&
          posts.data.map((post) => (
            <Post
              key={post.id}
              post={post}
              user={post.user}
              isSinglePost={false}
              readMore={true}
              maxLength={70}
            />
          ))}
        <Pagination items={posts}></Pagination>
      </div>
    </>
  );
}
