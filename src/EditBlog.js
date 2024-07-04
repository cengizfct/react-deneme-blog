import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import { putRequest } from "./api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: blog,
    error,
    isPending,
    setData,
  } = useFetch(`http://localhost:8000/blogs/${id}`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedBlog = { ...blog }
    try{
        await putRequest(`http://localhost:8000/blogs/${id}`, updatedBlog)
        navigate(0)
    }catch(err){
        console.log(err);
    }
    
  };

  console.log(blog, "blog");

  return (
    <div className="create">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <div>
          <h2>Edit Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Blog title:</label>
            <input
              type="text"
              required
              value={blog.title}
              //   onChange={(e) => setTitle(e.target.value)}
              onChange={(e) => setData({ ...blog, title: e.target.value })}
            />
            <label>Blog body:</label>
            <textarea
              required
              value={blog.body}
              //   onChange={(e) => setBody(e.target.value)}
              onChange={(e) => setData({ ...blog, body: e.target.value })}
            ></textarea>
            <label>Blog author:</label>
            <select
              value={blog.author}
              onChange={(e) => setData({ ...blog, author: e.target.value })}
            >
              <option value="cengiz">cengiz</option>
              <option value="efe">efe</option>
            </select>
            {!isPending && <button>Confirm</button>}
            {isPending && <button disabled>Wait...</button>}
          </form>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
