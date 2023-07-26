import { Card, Rating } from 'flowbite-react';
import CommentCard from './CommentCard';

export default function ReviewCard({ review }) {
    return (
        <Card className='mb-5'>
            <h5 className="">
                <span className='text-2xl font-bold tracking-tight text-gray-900 mr-2'>
                    {review.User.first_name} {review.User.last_name}
                </span>
                has Reviewed
                <span className='font-semibold tracking-tight text-gray-900 mx-2'>
                    {review.Book.title}
                </span>
                by
                <span className='font-semibold tracking-tight text-gray-900 mx-2'>
                    {review.Book.author}
                </span>
                on
                <span className='ml-2'>
                    {review.created_at.slice(0, 10)}
                </span>
            </h5>
            <img height={500} src={review.Book.image_url} alt={review.title} className='w-full' />
            <Rating>
                {
                    [...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            review.rating >= ratingValue ?
                                <Rating.Star
                                    key={index}
                                />
                                :
                                <Rating.Star
                                    key={index}
                                    filled={false}
                                />
                        )
                    })
                }
            </Rating>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {review.title}
            </p>
            <CommentCard id={review.id} comments={review.review_comments} />
        </Card>
    )
}


