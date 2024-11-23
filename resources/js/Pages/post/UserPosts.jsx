import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Post from "./components/Post";

export default function UserPosts({ posts, author }) {
  return (
    <>
      <Head title="Dashboard" />

      <h1 className="text-xl text-center mt-4 font-semibold leading-tight text-gray-800">
        {author}'s posts
      </h1>

      <div className="mx-4 block md:grid md:grid-cols-2 2xl:grid-cols-3">
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
