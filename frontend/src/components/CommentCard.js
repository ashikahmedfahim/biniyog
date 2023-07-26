import React from 'react';
import { Label, TextInput, Button, Spinner } from 'flowbite-react';
import axiosInstance from '../axiosInstance';
import { addNotification } from '../slices/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setComments, setReviews } from '../slices/reviewSlice';

const CommentCard = ({ id, comments }) => {
    const { reviews } = useSelector(state => state.review);
    const [title, setTitle] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isCommentsLoading, setIsCommentsLoading] = React.useState(false);
    const dispatch = useDispatch();

    const getComments = async () => {
        try {
            setIsCommentsLoading(true);
            const { data: response } = await axiosInstance.get(`/reviews/${id}/comments`);
            const dataToUpdate = {
                reviewId: id,
                comments: response.data
            }
            dispatch(setComments(dataToUpdate));
        } catch (error) {
            console.log(error);
            dispatch(addNotification({ type: "error", message: error.response.data.message }));
        } finally {
            setIsCommentsLoading(false);
        }
    };

    const addComment = async (formData) => {
        try {
            setIsLoading(true);
            const { data: response } = await axiosInstance.post(`/reviews/${id}/comments`, { title });
            dispatch(addNotification({ type: "success", message: response.message }));
            getComments();
        } catch (error) {
            dispatch(addNotification({ type: "error", message: error.response.data.message }));
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className='border-2 rounded p-2'>
            <div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="lastName"
                            value="Add a comment"
                        />
                    </div>
                    <TextInput
                        id="lastName"
                        placeholder="Write your comment here..."
                        shadow
                        type="text"
                        autoComplete='nope'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <Button
                    className='mt-2 w-32'
                    onClick={title.length ? addComment : null}
                >
                    {
                        isLoading ? <Spinner /> : 'Add comment'
                    }
                </Button>
            </div>
            <div className='mt-5'>
                {
                    !comments.length ?
                        <p className='text-gray-700 dark:text-gray-400'>
                            No comments yet
                        </p>
                        :
                        isCommentsLoading ?
                            <Spinner />
                            :
                            comments.map(comment => (
                                <div key={comment.id} className='p-2 mt-2'>
                                    <p className='text-gray-500 dark:text-gray-400'>
                                        {comment.User.first_name} {comment.User.last_name} on {comment.created_at.slice(0, 10)}
                                    </p>
                                    <p className='text-black text-xl'>
                                        {comment.title}
                                    </p>
                                </div>
                            ))
                }
            </div>
        </div>
    );
};

export default CommentCard;