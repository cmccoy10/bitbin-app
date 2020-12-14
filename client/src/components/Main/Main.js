import React from 'react';
import LeftNavPanel from './LeftNavPanel';
import RightPanel from './RightPanel/RightPanel';
import "./Main.css"
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../store/ducks/users';
import RightHomePanel from './RightPanel/RightHomePanel';


const Main = () => {
    const deletedId = useSelector(state => state.users.trashBinId);
    const token = useSelector(state => state.authentication);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    },[])

    return (
        <div className="mainContainer">
            <div className="leftNavPanel">
                <LeftNavPanel/>
            </div>
            <Route path="/home">
                <div className="rightPanel">
                    <RightHomePanel token={token}/>
                </div>
            </Route>
            <Route path="/folders/:id" >
                <div className="rightPanel">
                    <RightPanel deletedId={deletedId}/>
                </div>
            </Route>
        </div>
    );
}

export default Main;
