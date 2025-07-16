import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../features/auth/authSlice"

const GithubCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
        const state = urlParams.get("state");

        if (code && state ) {
            axios
            .post("http://localhost:8080/auth/github/access_token", {
            code,
            state,
            })
        .then(response => {
            const { token, user } = response.data;
            dispatch(setToken(token));
            dispatch(setUser(user));
            navigate("/");
            })
        .catch((error) => {
            console.error("Login failed:", error);
            navigate("/?error=true");
            });
        } else {
            navigate("/");
            }
        }, [dispatch, navigate]);
    return <p>Authenticate yourself with GitHub...</p>
    };

    export default GithubCallback;
