import toast from "react-hot-toast";
import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
export function PostCard({ post }) {
  const navigate = useNavigate();

  const { deletePost } = usePosts();

  const handleDelete = (_id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">Do you want to delete?</p>
          <div>
            <button
              className="text-white bg-red-600 hover:bg-red-500 transition-colors px-3 py-2 text-sm rounded-sm mx-2"
              onClick={async () => {
                await deletePost(_id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2 transition-colors"
              onClick={() => {
                toast.dismiss(t.id);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        style: {
          background: "#202020",
        },
      }
    );
  };

  return (
    <div
      className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer transition-colors flex flex-col justify-between"
      onClick={() => {
        navigate(`/posts/${post._id}`);
      }}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between">
          <h3>{post.title}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(post._id);
            }}
            className="bg-red-600 text-sm px-2 py-1 rounded-sm hover:bg-red-500 transition-colors"
          >
            Delete
          </button>
        </div>
        <p>{post.description}</p>
      </div>
      {post.image && (
        <img
          className="w-full h-96 object-cover"
          src={post.image.url}
        />
      )}
    </div>
  );
}
