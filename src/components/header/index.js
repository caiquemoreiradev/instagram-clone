import React, { useState, useEffect } from 'react';
import { Modal, makeStyles, Button, Input } from '@material-ui/core';
import { FiHeart, FiHome, FiSend, FiCompass } from 'react-icons/fi';

import { auth } from '../../services/firebase';

import './styles.css';

function Header() {
    const [open, setOpen] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [openSign, setOpenSignin] = useState(false);
    const [user, setUser] = useState(null);

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

    const signUp = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message))

        setEmail('');
        setPassword('');
        setUsername('');

        setOpen(false);
    }

    const signIn = (event) => {
        event.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

        setEmail('');
        setPassword('');

        setOpenSignin(false);
    }



    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }


    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));


    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle)
    
    return (
        <div className="container__header">
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt="Instagram Logo"
                            />
                        </center>

                        <Input
                            placeholder='Username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <Input
                            placeholder='Email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type='submit' onClick={signUp}>Sign up</Button>

                        <p>Já tem uma conta?</p>
                        <Button>Sign in</Button>
                    </form>
                </div>
            </Modal>

            <Modal
                open={openSign}
                onClose={() => setOpenSignin(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className='app__signup'>
                        <center>
                            <img
                                className="app__headerImage"
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                                alt="Instagram Logo"
                            />
                        </center>

                        <Input
                            placeholder='Email'
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type='submit' onClick={signIn}>Sign in</Button>

                        <p>Ainda não tem cadastro?</p>
                        <Button onClick={signUp}>Sign up</Button>
                    </form>
                </div>
            </Modal>

            <div className="app__header">
                <img
                    className="app__headerImage"
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                    alt="Instagram Logo"
                />

                {
                    user ? (
                        <div className="app__logged">
                             <div className="user__info">
                                 <FiHome size={25} className='icon' />
                                 <FiSend size={25} className='icon' />
                                 <FiCompass size={25} className='icon' />
                                 <FiHeart size={25} className='icon' />
                                <img onClick={() => auth.signOut()} src='https://avatars0.githubusercontent.com/u/56305107?s=460&u=2240a7b9b5e8499f64fb1607b42c00f0af10096a&v=4' alt="User" />
                            </div>
                        </div>
                    ) : (
                            <div className="app__logincontainer">
                                <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
                                <Button onClick={() => setOpen(true)}>Sign Up</Button>
                            </div>
                        )
                }

            </div>
        </div>
    );
}

export default Header;