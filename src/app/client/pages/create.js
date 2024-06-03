"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../axios';

const CreateBlogPage = () => {
    const user = true;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const mutation = useMutation((newBlog) => apiClient.post('/blogs', newBlog));

    const onSubmit = async (data) => {
        try {
            await mutation.mutateAsync(data);
            console.log('Blog published successfully');
        } catch (error) {
            console.error('Failed to publish blog:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <h1 className='text-center bg-red-500 text-red-500'>hello world</h1>
            {user ? (
                <div className="bg-white shadow-lg rounded-lg p-10 max-w-lg w-full">
                    <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Create Blog</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-1">Email:</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.email && <span className="text-red-500">Email is required</span>}
                        </div>
                        <div>
                            <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-1">Blog Title:</label>
                            <input
                                type="text"
                                id="title"
                                {...register('title', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.title && <span className="text-red-500">Title is required</span>}
                        </div>
                        <div>
                            <label htmlFor="writer" className="block text-gray-700 text-sm font-semibold mb-1">Writer Name:</label>
                            <input
                                type="text"
                                id="writer"
                                {...register('writer', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.writer && <span className="text-red-500">Writer name is required</span>}
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-1">Blog Content:</label>
                            <textarea
                                id="content"
                                {...register('content', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 h-40 resize-none"
                                required
                            />
                            {errors.content && <span className="text-red-500">Content is required</span>}
                        </div>
                        <div>
                            <label htmlFor="publicationDate" className="block text-gray-700 text-sm font-semibold mb-1">Publication Date:</label>
                            <input
                                type="date"
                                id="publicationDate"
                                {...register('publicationDate', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.publicationDate && <span className="text-red-500">Publication date is required</span>}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline">
                                Publish Blog
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="text-center text-red-500 font-bold text-lg">Not a Valid User</div>
            )}
        </div>
    );
};

export default CreateBlogPage;
