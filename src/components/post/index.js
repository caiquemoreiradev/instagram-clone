import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

import { FiHeart, FiSend, FiMessageCircle, FiMoreHorizontal, FiUpload } from 'react-icons/fi'

import { db } from '../../services/firebase';

import './styles.css';

function Post({ postId, user, username, imageUrl, caption }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comment')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                })
        }

        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db
            .collection('posts')
            .doc(postId)
            .collection('comment')
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        setComment('');
    }

    return (
        <div className="container-post">

            <div className="post__header">
                <div className="user-info">
                    <img
                        src='https://avatars0.githubusercontent.com/u/56305107?s=460&u=2240a7b9b5e8499f64fb1607b42c00f0af10096a&v=4'
                        alt="Caique Moreira"
                    />
                    <h3>{username}</h3>
                </div>

                <div className="user-options">
                    <FiMoreHorizontal size={20} />
                </div>
            </div>

            <img
                className="post__image"
                src={imageUrl}
                alt="Post"
            />

            <div className="insta-icons">
                <div className="left">
                    <FiHeart className='icon' size={25} />
                    <FiMessageCircle className='icon' size={25} />
                    <FiSend className='icon' size={25} />
                </div>

                <div className="right">
                    <FiUpload size={25} />
                </div>
            </div>
            
            <h4 className='post__text'><strong>{username}</strong> {caption}</h4>

            <div className="post__comments">
                {comments.map((comment) => (
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))}
            </div>

            {user && (
                <form className='post__commentBox'>
                    <input
                        className='post__input'
                        type='text'
                        placeholder='Adicione um comentário...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        disabled={!comment}
                        className='post__button'
                        type='submit'
                        onClick={postComment}
                    >
                        Post
                </button>
                </form>
            )}
        </div>
    );
}

export default Post;