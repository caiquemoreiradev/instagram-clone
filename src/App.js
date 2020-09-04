import React, { useState, useEffect } from 'react';
import './App.css';

import Post from './components/post';
import ImageUpload from './components/imageUpload';

import { db, auth } from './services/firebase';
import Header from './components/header';
import Stories from './stories';

function App() {

  const [posts, setPosts] = useState([]);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }

  }, [user, username]);


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  }, []);

  return (
    <div className="App">

      <Header />

      <div className="content">

        <div className="main">
          <div className="main__container">
            <div className="posts">
            <Stories />
              {posts.map(({ id, post }) => (
                <Post
                  key={id}
                  postId={id}
                  user={user}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                />
              ))}
            </div>
          </div>

          {user?.displayName ? (
            <ImageUpload username={user.displayName} />
          ) : (
              <div></div>
            )}

        </div>
      </div>
    </div>
  );
}

export default App;
