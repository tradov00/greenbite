import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPost = async (id: string): Promise<Post | null> => {
  try {
    const res = await fetch(`${BASE_API_URL}/posts/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export default async function CommunityPost({
  params,
}: {
  params: { postID: string };
}) {
  const post = await getPost(params.postID);
  if (!post) return notFound();

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-3xl font-bold font-tahoma p-10 capitalize text-green-600">
        <span>POST {post.id}:</span> {post.title}
      </h1>

      <p className="text-xl border-2 border-green-400 font-tahoma text-orange-600 rounded-2xl p-10 mb-10">
        {post.body}
      </p>

      <Link
        href="/community"
        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
      >
        ← Back to Community
      </Link>
    </main>
  );
}
