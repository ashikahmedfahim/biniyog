import React from 'react';

const NotFound = () => {
    return (
        <div className='flex items-center justify-center'>
            <div className='text-primary text-5xl my-20 py-20 text-center'>
                <p className='my-2'>
                    404 <br className='block md:hidden' /> Not Found
                </p>
            </div>
        </div>
    );
};

export default NotFound;