import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/ducks/authentication';

const Main = () => {
    const dispatch = useDispatch();

    const handleClick = async () => {
        await dispatch(logout());
    }

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <button onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
}

export default Main;
