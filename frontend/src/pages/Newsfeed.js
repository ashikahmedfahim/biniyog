import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import PostReview from '../components/PostReview';
import axiosInstance from '../axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { setIsNewReview, setIsReviewLoading, setReviews } from '../slices/reviewSlice';
import ReviewCard from '../components/ReviewCard';


const Newsfeed = () => {
    const [openModal, setOpenModal] = useState(false);
    const { reviews, isReviewLoading, isNewReview } = useSelector(state => state.review);
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

    useEffect(() => {
        if (!reviews.length || isNewReview)
            getAllReviews();
    }, [isNewReview]);

    return (
        <div className='flex flex-col items-center'>
            <div className="my-10">
                <Button onClick={() => setOpenModal(true)}>Post a new book review</Button>
            </div>
            <PostReview openModal={openModal} setOpenModal={setOpenModal} />
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
                                        <div>
                                            <ReviewCard key={index} review={review} />
                                        </div>
                                    ))
                                }
                            </div>

                }
            </div>
        </div >
    );
};

export default Newsfeed;