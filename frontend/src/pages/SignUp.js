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

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const watchPassword = watch("password");

    const registerUser = async (formData) => {
        try {
            setIsLoading(true);
            delete formData.repeatPassword;
            const { data: response } = await axiosInstance.post('/users/register', formData);
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
            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(registerUser)}>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="firstName"
                            value="Your First Name"
                            color={errors.firstName && 'failure'}
                        />
                    </div>
                    <TextInput
                        id="firstName"
                        placeholder="Enter your first name"
                        shadow
                        type="text"
                        autoComplete='nope'
                        {...register('firstName', { required: true })}
                        color={errors.firstName && 'failure'}
                        helperText={errors.firstName && 'First name is required'}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="lastName"
                            value="Your Last Name"
                            color={errors.lastName && 'failure'}
                        />
                    </div>
                    <TextInput
                        id="lastName"
                        placeholder="Enter your last name"
                        shadow
                        type="text"
                        autoComplete='nope'
                        {...register('lastName', { required: true })}
                        color={errors.lastName && 'failure'}
                        helperText={errors.lastName && 'Last name is required'}
                    />
                </div>
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
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="repeatPassword"
                            value="Repeat password"
                            color={errors.repeatPassword && 'failure'}
                        />
                    </div>
                    <TextInput
                        id="repeatPassword"
                        placeholder="Repeat your password"
                        shadow
                        type="password"
                        autoComplete='nope'
                        {...register('repeatPassword', { required: true, validate: value => value === watchPassword })}
                        color={errors.repeatPassword && 'failure'}
                        helperText={errors.repeatPassword && (errors.repeatPassword.type === 'required' ? 'Repeat Password is required' : 'Repeat Password does not match')}
                    />
                </div>
                <Button type="submit">
                    {isLoading ? <Spinner /> : " Register new account"}
                </Button>
            </form>
        </div>
    )
}


