import { usePosts } from "../context/PostContext";
import { VscEmptyWindow } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
export function Home() {
  const { posts } = usePosts();

  if (posts.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        <VscEmptyWindow className="w-48  h-48 text-white mb-2" />
        <h1 className="text-white text-2xl">There are no posts</h1>
      </div>
    );

  return (
    <div className="text-white">
      <header className="flex justify-between py-4 ">
        <h1 className="text-2xl text-gray-300  font-bold">
          Posts {posts.length}
        </h1>
        <Link
          className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white transition-colors rounded"
          to={"/new"}
        >
          Create new Post
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-2  pb-10">
        {posts.map((post) => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
