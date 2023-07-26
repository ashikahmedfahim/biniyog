import React from 'react';
import FollowUserCard from '../components/FollowUserCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowedUsers, setIsFollowerLoading, setIsUpdateNeeded } from '../slices/followerSlice';
import axiosInstance from '../axiosInstance';
import { Spinner } from 'flowbite-react';

const MyFollows = () => {
    const { followedUsers, isFollowerLoading, isUpdateNeeded } = useSelector(state => state.follower);
    const dispatch = useDispatch();

    const getFollowAbleUsers = async () => {
        try {
            dispatch(setIsFollowerLoading(true));
            const { data: response } = await axiosInstance.get('/followers/my-follows');
            dispatch(setFollowedUsers(response.data));
            dispatch(setIsUpdateNeeded(false));
        } catch (error) {
            dispatch(setFollowedUsers([]));
        } finally {
            dispatch(setIsFollowerLoading(false));
        }
    };

    useEffect(() => {
        if (!followedUsers.length || isUpdateNeeded)
            getFollowAbleUsers();
    }, [isUpdateNeeded]);
    return (
        <div className='my-5'>
            {
                isFollowerLoading ?
                    <div className='h-20 flex items-center justify-center'>
                        <Spinner />
                    </div>
                    :
                    !followedUsers.length ?
                        <div className='h-20 flex items-center justify-center'>
                            <p className='text-2xl'>
                                You are not following anyone
                            </p>
                        </div>
                        :
                        <div className='text-center'>
                            <h2 className='text-3xl font-bold mb-5'>
                                You are following
                            </h2>
                            <div className='mx-auto max-w-3xl flex flex-row flex-wrap items-center justify-center'>
                                {
                                    followedUsers.map((followAbleUser, index) => (
                                        <FollowUserCard
                                            key={index}
                                            followAbleUser={followAbleUser}
                                            isFollowed={true}
                                        />
                                    ))
                                }
                            </div>
                        </div>

            }
        </div>
    );
};

export default MyFollows;