import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "./useFetch";
import EditBlog from "./EditBlog";

const BlogDetails = () => {
    const { id } = useParams();
    const { data:blog, error, isPending} = useFetch(`http://localhost:8000/blogs/${id}`);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const navigate = useNavigate();
    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${id}`, {
            method: 'DELETE'
        }).then(() => {
            console.log('blog deleted');
            navigate('/');
        })
    }
    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>

                    <button className="button" onClick={ handleDelete }>Delete</button>
                </article>
            )}
        <div className="edit-container">
            <button onClick={() => setIsEditOpen(!isEditOpen)} className="button" >{isEditOpen ? 'Close' : 'Edit Blog'}</button>
            {
               isEditOpen && <EditBlog></EditBlog> 
            }
           
        </div>
            
        </div>
     );
}
 
export default BlogDetails;