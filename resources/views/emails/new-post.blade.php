<div class="px-4">
  <h1 class="my-4 text-2xl">
    New post was created!</h1>

  <div>
    <p class="mb-2 font-semibold">{{ $post->title }}</p>
    <p class="text-sm">{{ substr($post->body, 200) }}</p>
    <a className="mt-auto rounded-lg px-3 py-1 my-4 block w-fit bg-slate-300 hover:bg-slate-100"
      href={{ $postUrl }}>
      Read more
    </a>
  </div>
</div>
