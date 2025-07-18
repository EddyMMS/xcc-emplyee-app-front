import * as React from 'react';
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store";

const PrivateRoute = ({ children }: { children: React.JSX.Element }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    return token ? children : <Navigate to="/loginpage" />}

    export default PrivateRoute;