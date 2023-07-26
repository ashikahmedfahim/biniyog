import { Button, Textarea, Label, Select, Modal, Spinner, Rating } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setBooks, setIsBookLoading } from '../slices/bookSlice';
import axiosInstance from '../axiosInstance';
import { addNotification } from '../slices/notificationSlice';
import { setIsNewReview } from '../slices/reviewSlice';


export default function PostReview({ openModal, setOpenModal }) {
    const [rating, setRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const { books, isBookLoading } = useSelector(state => state.book);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getAllBooks = async () => {
        try {
            dispatch(setIsBookLoading(true));
            const { data: response } = await axiosInstance.get('/books');
            dispatch(setBooks(response.data));
        } catch (error) {
            dispatch(setBooks([]));
        } finally {
            dispatch(setIsBookLoading(false));
        }
    };

    const saveReview = async (formData) => {
        try {
            const { bookId } = formData;
            delete formData.bookId;
            setIsLoading(true);
            formData.rating = rating;
            const { data: response } = await axiosInstance.post(`/books/${bookId}/reviews`, formData);
            dispatch(addNotification({ type: "success", message: response.message }));
            dispatch(setIsNewReview(true));
        } catch (error) {
            dispatch(addNotification({ type: "error", message: error.response.data.message }));
        } finally {
            setIsLoading(false);
            setOpenModal(false);
        }
    };

    useEffect(() => {
        if (!books.length) {
            getAllBooks();
        }
    }, []);

    return (
        <>
            <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    {
                        isBookLoading ?
                            <div className='flex items-center justify-center'>
                                <Spinner />
                            </div>
                            :
                            <form className="space-y-6" onSubmit={handleSubmit(saveReview)}>
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Review a new book!</h3>
                                <div>
                                    <div
                                        className="max-w-md"
                                        id="select"
                                    >
                                        <div className="mb-2 block">
                                            <Label
                                                htmlFor="books"
                                                value="Select book to review"
                                            />
                                        </div>
                                        <Select
                                            id="books"
                                            {...register('bookId', { required: true })}
                                        >
                                            {
                                                books.map(book => (
                                                    <option key={book.id} value={book.id}>{book.title} by {book.author}</option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="title" value="Your thoughts" />
                                    </div>
                                    <Textarea
                                        id="title"
                                        placeholder="Write your thoughts here..."
                                        rows={4}
                                        {...register('title', { required: true })}
                                        color={errors.title && 'failure'}
                                        helperText={errors.title && 'Your thoughts is required'}
                                    />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="rating" value="Your rating" />
                                    </div>
                                    <Rating>
                                        {
                                            [...Array(5)].map((star, index) => {
                                                const ratingValue = index + 1;
                                                return (
                                                    rating >= ratingValue ?
                                                        <Rating.Star
                                                            key={index}
                                                            onMouseEnter={() => setRating(ratingValue)}
                                                        />
                                                        :
                                                        <Rating.Star
                                                            key={index}
                                                            onMouseEnter={() => setRating(ratingValue)}
                                                            filled={false}
                                                        />
                                                )
                                            })
                                        }
                                    </Rating>
                                </div>
                                <div className="w-full">
                                    <Button type="submit" className='w-32'>
                                        {
                                            isLoading ?
                                                <Spinner />
                                                :
                                                "Post Review"
                                        }
                                    </Button>
                                </div>
                            </form>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}


