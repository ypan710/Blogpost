import React from 'react';
import {Link} from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => (
    <header className="App-header">
        <ul className="container">
            <li key="home">
                <Link to="/">My Site</Link>< br/>
            </li>
            {/* check if user has been authenticated */}
            {isAuthenticated ? (
            <>
            <li key="post">
                <Link to="/new">New Post</Link>
            </li>
            <li>
                <button
                    className="linkLike"
                    onClick={e => {
                        e.preventDefault();
                        onLogout();
                    }}>
                Logout
                </button>
            </li>
            </>
            ) : (
            <li>
                <Link to="/login">Login</Link>
            </li>
            )}
        </ul>
    </header>
)

export default Header;
