import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import PostReview from '../components/PostReview';
import axiosInstance from '../axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewReview, setIsReviewLoading, setReviews } from '../slices/reviewSlice';
import ReviewCard from '../components/ReviewCard';
import { setFollowAbleUsers, setIsFollowerLoading, setIsUpdateNeeded } from '../slices/followerSlice';
import FollowUserCard from '../components/FollowUserCard';


const Newsfeed = () => {
    const [openModal, setOpenModal] = useState(false);
    const { reviews, isReviewLoading, isNewReview } = useSelector(state => state.review);
    const { followAbleUsers, isFollowerLoading, isUpdateNeeded } = useSelector(state => state.follower);
    const dispatch = useDispatch();

    const getAllReviews = async () => {
        try {
            dispatch(setIsReviewLoading(true));
            const { data: response } = await axiosInstance.get('/reviews');
            dispatch(setReviews(response.data));
            dispatch(setIsNewReview(false));
        } catch (error) {
            dispatch(setReviews([]));
        } finally {
            dispatch(setIsReviewLoading(false));
        }
    };

    const getFollowAbleUsers = async () => {
        try {
            dispatch(setIsFollowerLoading(true));
            const { data: response } = await axiosInstance.get('/followers/follow-able-users');
            dispatch(setFollowAbleUsers(response.data));
            dispatch(setIsUpdateNeeded(false));
        } catch (error) {
            dispatch(setFollowAbleUsers([]));
        } finally {
            dispatch(setIsFollowerLoading(false));
        }
    };

    useEffect(() => {
        if (!reviews.length || isNewReview)
            getAllReviews();
    }, [isNewReview]);

    useEffect(() => {
        if (!followAbleUsers.length || isUpdateNeeded)
            getFollowAbleUsers();
    }, [isUpdateNeeded]);

    return (
        <div className='flex flex-col items-center'>
            <div className="my-10">
                <Button onClick={() => setOpenModal(true)}>Post a new book review</Button>
            </div>
            <PostReview openModal={openModal} setOpenModal={setOpenModal} />
            <div className='my-5'>
                {
                    isFollowerLoading ?
                        <div className='h-20 flex items-center justify-center'>
                            <Spinner />
                        </div>
                        :
                        !followAbleUsers.length ?
                            <div className='h-20 flex items-center justify-center'>
                                <p className='text-2xl'>No one to Follow</p>
                            </div>
                            :
                            <div className='text-center'>
                                <h2 className='text-3xl font-bold mb-5'>
                                    People you may follow
                                </h2>
                                <div className='max-w-3xl flex flex-row flex-wrap items-center justify-center'>
                                    {
                                        followAbleUsers.map((followAbleUser, index) => (
                                            <FollowUserCard key={index} followAbleUser={followAbleUser} />
                                        ))
                                    }
                                </div>
                            </div>

                }
            </div>
            <div className='my-5'>
                {
                    isReviewLoading ?
                        <div className='h-40 flex items-center justify-center'>
                            <Spinner />
                        </div>
                        :
                        !reviews.length ?
                            <div className='h-40 flex items-center justify-center'>
                                <p className='text-2xl'>No reviews found</p>
                            </div>
                            :
                            <div>
                                {
                                    reviews.map((review, index) => (
                                        <ReviewCard key={index} review={review} />
                                    ))
                                }
                            </div>

                }
            </div>
        </div >
    );
};

export default Newsfeed;