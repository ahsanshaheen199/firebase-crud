import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';

function Home( { isAuth } ) {

    const [posts, setPosts] = useState([]);

    useEffect(  () => {
        const getPosts = async () => {
            try {
                const postCollectionsRef = await getDocs( collection(db, 'posts') );
            
                const postList = postCollectionsRef.docs.map( doc => {
                    return {...doc.data(), id: doc.id}
                } );

                setPosts(postList)

            } catch( error ) {
                console.log(error);
            }
        }

        getPosts()
    }, [] );

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

return (
    <div className="homePage">
        {posts.map((post, index) => {
        return (
            <div key={index} className="post">
                <div className="postHeader">
                    <div className="title">
                        <h1> {post.title}</h1>
                    </div>
                    <div className="deletePost">
                    {isAuth && post.author.id === auth.currentUser.uid && (
                        <button
                        onClick={() => {
                            deletePost(post.id);
                        }}
                        >
                        {" "}
                        &#128465;
                        </button>
                    )}
                    </div>
                </div>
                <div className="postTextContainer"> {post.postText} </div>
            <h3>@{post.author.name}</h3>
            </div>
        );
        })}
    </div>
);
}

export default Home;
