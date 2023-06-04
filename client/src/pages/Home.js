import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getUser, setUser} from "../redux/authSlice";
import api from "../api/axiosInstance";

function Home() {
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!authState.user) {
    //         dispatch(getUser()).then(response => {
    //             if (response.payload) {
    //                 dispatch(setUser(response.payload));
    //             } else {
    //                 navigate('/login');
    //             }
    //         });
    //     }
    // }, [authState, dispatch, navigate]);
    const callApi = () => {
        api
            .post('/users')
            .then(response => {
                const data = response.data;
                alert(JSON.stringify(data));
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={callApi}>Call API</button>
            </header>
        </div>
    );
}

export default Home;
