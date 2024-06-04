"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import apiClient from '../../../axios';
import { useRouter } from 'next/navigation';


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const router = useRouter();

    const onSubmit = async (data) => {

        try {
            const response = await apiClient.post('/register', data);

            if (response.status === 201 || response.status === 200) {
                toast.success('Successfully signed up!');
                router.push('/login');
            }
            reset()
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Error signing up, please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Toaster />
            <div className="bg-white p-6 rounded-lg shadow-lg w-7/12">
                <h2 className="text-2xl font-bold mb-6 text-center">SignUp Page</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>



                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: 'Email is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            {...register('phoneNumber', { required: 'Phone Number is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Sign Up
                    </button>


                </form>
            </div>
        </div>
    );
};

export default SignUp;
