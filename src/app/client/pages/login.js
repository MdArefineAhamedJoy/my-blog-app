"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import apiClient from '../../../axios';
import { useRouter } from 'next/navigation';

const Login = () => {
    const { register, handleSubmit, reset } = useForm();
    const router = useRouter();
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            const response = await apiClient.post('/login', data);
            if (response.status === 201 || response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(data));

                toast.success('Login successful');
                reset();
                router.push('/profile');
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-md shadow-lg w-5/12 ">
                <h2 className="text-2xl font-bold mb-6 text-center">Login Page</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', { required: true })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
