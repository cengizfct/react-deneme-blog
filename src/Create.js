import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "./api";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('cengiz');
  const [isPending, setIsPending] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    postRequest('http://localhost:8000/blogs', blog)
      .then(() => {
        setIsPending(false);
        navigate('/');
      })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="cengiz">cengiz</option>
          <option value="efe">efe</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending &&  <button disabled>Wait...</button>}
       
        
      </form>
    </div>
  );
}
 
export default Create;