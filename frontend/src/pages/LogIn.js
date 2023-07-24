import { Button, Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import isValidEmail from '../utilities/isValidEmail';
import axiosInstance from '../axiosInstance';
import { addNotification } from '../slices/notificationSlice';
import { saveAccessToken, saveUser } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useState } from 'react';
import { Spinner } from 'flowbite-react';

export default function LogIn() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const loginUser = async (formData) => {
        try {
            setIsLoading(true);
            const { data: response } = await axiosInstance.post('/users/login', formData);
            dispatch(addNotification({ type: "success", message: response.message }));
            dispatch(saveAccessToken(response.data.accessToken));
            const user = jwt_decode(response.data.accessToken);
            dispatch(saveUser(user));
            navigate('/');
        } catch (error) {
            dispatch(addNotification({ type: "error", message: error.response.data.message }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='max-w-md mx-auto lg:my-10'>
            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(loginUser)}>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="email2"
                            value="Your email"
                            color={errors.email && 'failure'}
                        />
                    </div>
                    <TextInput
                        id="email2"
                        placeholder="name@abc.com"
                        shadow
                        type="email"
                        autoComplete='nope'
                        {...register('email', { required: true, validate: value => isValidEmail(value) })}
                        color={errors.email && 'failure'}
                        helperText={errors.email && (errors.email.type === 'required' ? 'Email is required' : 'Email is not valid')}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password2"
                            value="Your password"
                            color={errors.password && 'failure'}
                        />
                    </div>
                    <TextInput
                        id="password2"
                        placeholder="Enter your password"
                        shadow
                        type="password"
                        autoComplete="current-password"
                        {...register('password', { required: true })}
                        color={errors.password && 'failure'}
                        helperText={errors.password && 'Password is required'}
                    />
                </div>
                <Button type="submit">
                    {isLoading ? <Spinner /> : "Log In"}
                </Button>
            </form>
        </div>
    )
}


