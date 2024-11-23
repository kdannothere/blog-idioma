import { Head } from "@inertiajs/react";
import Message from "@/Components/Message";
import Pagination from "@/Components/Pagination";
import Post from "./post/components/Post";

export default function Dashboard({ posts }) {
  return (
    <>
      <Head title="Dashboard" />

      <Message />

      <h1 className="text-xl text-center mt-4 font-semibold leading-tight text-gray-800">
        Your posts
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
