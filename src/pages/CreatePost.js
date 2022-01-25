import { addDoc, collection } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';

function CreatePost( { isAuth } ) {
    const [title, setTitle] =  useState("");
    const [postText, setPostText] = useState("");

    const navigate = useNavigate();

    const createPost = async () => {
        await addDoc( collection( db, "posts" ) , {
            title,
            postText,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName
            }
        } )

        navigate("/");
    }

    useEffect( () => {
        if( ! isAuth ) {
            navigate('/login');
        }
    }, [isAuth] )

    return ( 
        <div className='createPostPage'>
            <div className='cpContainer'>
                <h1>Create A Post</h1>
                <div className='inputGp'>
                    <label>Title:</label>
                    <input value={title} onChange={ event => setTitle( event.target.value ) } placeholder='title' />
                </div>
                <div className='inputGp'>
                    <label>Post:</label>
                    <textarea placeholder='post' value={postText} onChange={ (event) => setPostText(event.target.value) }></textarea>
                </div>
                <button onClick={createPost}> Submit Post </button>
            </div>
        </div> 
    );
}

export default CreatePost;
