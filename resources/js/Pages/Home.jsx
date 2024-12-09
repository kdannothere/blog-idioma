import { Head } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Post from "./post/components/Post";

export default function Home({ posts }) {
  return (
    <>
      <Head title="Home" />

      <h1 className="text-xl text-center my-4 font-semibold leading-tight text-gray-800">
        Latest posts
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
