import Link from "next/link";
import clsx from "clsx";
import NotFound from "@/app/not-found";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Pagination {
  limit: number;
  page: number;
}

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

export type SearchParams = {
  searchParams: Record<string, string | string[] | undefined>;
};

const getPosts = async (
  pagination: Pagination = {
    limit: 9999,
    page: 1,
  }
): Promise<Post[]> => {
  const data = await fetch(
    `${BASE_API_URL}/posts?_limit=${pagination.limit}&_page=${pagination.page}`
  );
  return data.json();
};

const getTotalPosts = async (): Promise<number> => {
  const response = await fetch(`${BASE_API_URL}/posts?_limit=1`, {
    method: "HEAD",
  });
  return parseInt(response.headers.get("x-total-count") || "1", 10);
};

export default async function Community({ searchParams }: SearchParams) {
  const { _limit, _page } = searchParams;
  const [pageSize, rawPage] = [_limit, _page].map(Number);
  const page = isNaN(rawPage) ? 1 : rawPage;
  const totalPosts = await getTotalPosts();
  const totalPages = Math.ceil(totalPosts / (pageSize || 10));

  if (page > totalPages) return NotFound();

  const posts = await getPosts({
    limit: pageSize || 10,
    page: page,
  });

  return (
    <main className="flex flex-col items-center min-h-screen max-w-5xl m-auto p-10">
      <h1 className="text-center mt-5 mb-5 font-bold text-green-700 text-4xl">
        Get in touch with other users here!
      </h1>

      <div className="py-5 text-green-800">
        Page <span className="font-bold">{page}</span> of{" "}
        <span className="font-bold">{totalPages}</span>
      </div>

      <div className="flex items-baseline gap-8 pb-10">
        <PaginationLinks page={page} totalPages={totalPages} pageSize={pageSize || 10} />
      </div>

      <ul className="flex flex-col gap-8 p-10 bg-green-100 rounded-2xl w-full">
        {posts.map((post) => (
          <li key={post.id} className="w-full">
            <Link href={`/community/${post.id}`}>
              <span className="block w-full text-2xl bg-white text-green-700 border-2 border-green-400 px-3 py-2 rounded hover:bg-green-600 hover:text-white transition-all">
                <b>POST {post.id}:</b>
                <p className="text-orange-600 text-lg">{post.title}</p>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="py-5 text-green-800">
        Page <span className="font-bold">{page}</span> of{" "}
        <span className="font-bold">{totalPages}</span>
      </div>

      <div className="flex items-baseline gap-8 pb-10">
        <PaginationLinks page={page} totalPages={totalPages} pageSize={pageSize || 10} />
      </div>
    </main>
  );
}

function PaginationLinks({
  page,
  totalPages,
  pageSize,
}: {
  page: number;
  totalPages: number;
  pageSize: number;
}) {
  return (
    <div className="flex gap-4">
      <Link
        href={{
          pathname: "/community",
          query: { _page: 1, _limit: pageSize },
        }}
        className={clsx(
          "rounded bg-orange-300 px-3 py-2 text-green-800 font-bold text-xs",
          page === 1 && "pointer-events-none opacity-50"
        )}
      >
        FIRST
      </Link>
      <Link
        href={{
          pathname: "/community",
          query: { _page: page > 1 ? page - 1 : 1, _limit: pageSize },
        }}
        className={clsx(
          "rounded bg-green-500 px-3 py-2 text-white font-bold text-xs",
          page === 1 && "pointer-events-none opacity-50"
        )}
      >
        PREVIOUS
      </Link>
      <Link
        href={{
          pathname: "/community",
          query: { _page: page + 1, _limit: pageSize },
        }}
        className={clsx(
          "rounded bg-green-500 px-3 py-2 text-white font-bold text-xs",
          page === totalPages && "pointer-events-none opacity-50"
        )}
      >
        NEXT
      </Link>
      <Link
        href={{
          pathname: "/community",
          query: { _page: totalPages, _limit: pageSize },
        }}
        className={clsx(
          "rounded bg-orange-300 px-3 py-2 text-green-800 font-bold text-xs",
          page === totalPages && "pointer-events-none opacity-50"
        )}
      >
        LAST
      </Link>
    </div>
  );
}
