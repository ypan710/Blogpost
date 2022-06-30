import React from 'react';
import {Link} from "react-router-dom";
import '../App.css'


const Posts = ({ posts, deletePost, isAuthenticated }) => (
    <article className="posts container">
        <h1>Posts</h1>
        <ul> {/* display a list item if no posts are displayed */}
            {
            posts.length < 1 && (
                <li key="empty">No posts yet!</li>
            )
            }
            {/* map over the posts and display the title of each post */}
            {
            posts.map(post => (
                <li key={post.key}>
                    <h2> {/* creates a link to a URL */}
                        <Link to={`/post/${post.slug}`}> {
                            post.title
                        }</Link>
                    </h2>
                    {/* only authenticated users can edit and posts */}
                    {isAuthenticated && (
                        <p>
                            <Link to={`edit/${post.slug}`}>Edit</Link>
                            {" | "}
                            <button 
                                className="linkLike"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deletePost(post);
                                }}>
                                Delete
                            </button>
                        </p>
                    )}
                </li>
            ))
        } </ul>
    </article>
);

export default Posts;
