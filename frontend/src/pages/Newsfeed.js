import { Button } from 'flowbite-react';
import { useState } from 'react';
import PostReview from '../components/PostReview';


const Newsfeed = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className='flex flex-col items-center'>
            <div className="my-10">
                <Button onClick={() => setOpenModal(true)}>Post a new book review</Button>
            </div>
            <PostReview openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    );
};

export default Newsfeed;