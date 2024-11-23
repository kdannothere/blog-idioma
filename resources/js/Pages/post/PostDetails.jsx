import { Head } from "@inertiajs/react";
import Post from "./components/Post";

export default function PostDetails({ post, user, action }) {
  // const { delete: destroy } = useForm();
  // const route = useRoute();

  // function handleDelete(e) {
  //   e.preventDefault();
  //   destroy(route("posts.destroy", post));
  // }

  return (
    <>
      <Head title={post.title} />

      <Post post={post} user={user} action={action} />
    </>
  );
}
