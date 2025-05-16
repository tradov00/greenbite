import { Post } from "../page";

interface Params {
    postID: string;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

const getPost = async (id: string): Promise<Post> => {
    const data = await fetch(`${BASE_API_URL}/posts/${id}`);
    return data.json();
};

export default async function Community_Insights_Post({ params }: { params: Params }) {
    const post = await getPost(params.postID);

    return (
        <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
            <h1 className="text-3xl font-bold font-tahoma p-10 capitalize text-green-600">
                <span>POST {post.id}:</span> {post.title}
            </h1>
            <p className="text-xl border-2 border-green-400 font-tahoma text-orange-600 rounded-2xl p-10">{post.body}</p>
        </main>
    );
}