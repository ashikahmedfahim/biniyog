import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveAccessToken } from '../slices/authSlice';
import { saveUser } from '../slices/authSlice';
import jwt_decode from "jwt-decode";
import axiosInstance from '../axiosInstance';

const PrivateRoute = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const { accessToken } = useSelector(state => state.auth);

    const location = useLocation();
    const dispatch = useDispatch();

    const getAccessToken = async () => {
        try {
            const { data: response } = await axiosInstance.get("/users/get-access-token");
            if (response.data.accessToken) {
                dispatch(saveAccessToken(response.data.accessToken));
                const user = jwt_decode(response.data.accessToken);
                dispatch(saveUser(user));
                setTimeout(() => {
                    getAccessToken();
                }, 3000 * 1000);
            } else {
                return (
                    <Navigate to="/log-in" state={{ from: location }} replace></Navigate>
                );
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!accessToken) {
            getAccessToken();
        } else {
            setIsLoading(false);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-12 w-12"></div>
            </div>
        );
    }

    if (accessToken) {
        return (
            <>
                {props.children}
            </>
        );
    }

    return <Navigate to="/log-in" state={{ from: location }} replace></Navigate>;

};

export default PrivateRoute;