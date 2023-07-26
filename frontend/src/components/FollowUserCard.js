import React from 'react';
import { Card, Button, Spinner } from 'flowbite-react';
import axiosInstance from '../axiosInstance';
import { useDispatch } from 'react-redux';
import { addNotification } from '../slices/notificationSlice';
import { setIsUpdateNeeded } from '../slices/followerSlice';
import { setIsNewReview } from '../slices/reviewSlice';

const FollowUserCard = ({ followAbleUser }) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();

    const followUser = async () => {
        try {
            setIsLoading(true);
            const { data: response } = await axiosInstance.post(`/users/${followAbleUser.id}/follow`);
            dispatch(addNotification({ type: "success", message: response.message }));
            dispatch(setIsUpdateNeeded(true));
            dispatch(setIsNewReview(true));
        } catch (error) {
            dispatch(addNotification({ type: "error", message: error.response.data.message }));
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <Card className='bg-gradient-to-r from-green-400 to-blue-400 mx-2 mb-2'>
            <div className='flex items-center justify-between text-white'>
                <div className='flex items-center text-semibold text-2xl mr-5'>
                    {followAbleUser.first_name} {followAbleUser.last_name}
                </div>
                <div className='flex items-center'>
                    <Button
                        className='w-20'
                        onClick={followUser}
                    >
                        {
                            isLoading ?
                                <Spinner /> :
                                "Follow"
                        }
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default FollowUserCard;