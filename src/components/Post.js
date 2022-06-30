import React from 'react';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';

// build a single post view component

// passing a prop of post
const Post = ({ post }) => {
    // pass Delta post content into QuillDeltaToHtml converter
    const converter = new QuillDeltaToHtmlConverter(
        post.content.ops, {});

    // convert Delta content to HTML content
    const contentHTML = converter.convert();
    return (
        <article className="post container">
            <h1> {
                post.title
            }
                <div 
                    className="content" 
                    // display HTML from Deltas from Quill editor
                    dangerouslySetInnerHTML={{
                        __html: contentHTML}}>
                    {
                } 
                </div>
            </h1>
        </article>
    );
};

export default Post;
