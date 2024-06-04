"use client"
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../axios';

const CreateBlogPage = () => {
    const user = true;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const mutation = useMutation((newBlog) => apiClient.post('/blogs', newBlog));

    const onSubmit = async (data) => {
        if (!user) {
            console.error('Not a Valid User');
            return;
        }

        data.email = user.email;
        try {
            await mutation.mutateAsync(data);
            console.log('Blog published successfully');
        } catch (error) {
            console.error('Failed to publish blog:', error);
        }
    };

    return (
        <div className=" bg-gray-100  ">
            {user ? (
                <div className="bg-white shadow-lg rounded p-10  w-10/12 mx-auto">
                    <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Create Blog</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <input
                            type="email"
                            id="email"
                            {...register('email', { required: true })}
                            defaultValue={user?.email}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                            required
                        />

                        <div className='flex w-full gap-10'>
                            <div className='w-full'>
                                <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-1">Blog Title:</label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register('title', { required: true })}
                                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                                    required
                                />
                                {errors.title && <span className="text-red-500">Title is required</span>}
                            </div>
                            <div className='w-full'>
                                <label htmlFor="writer" className="block text-gray-700 text-sm font-semibold mb-1">Writer Name:</label>
                                <input
                                    type="text"
                                    id="writer"
                                    {...register('writer', { required: true })}
                                    className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                                    required
                                />
                                {errors.writer && <span className="text-red-500">Writer name is required</span>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="content" className="block text-gray-700 text-sm font-semibold mb-1">Blog Content:</label>
                            <textarea
                                id="content"
                                {...register('content', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500 h-40 resize-none"
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
                                className="w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.publicationDate && <span className="text-red-500">Publication date is required</span>}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm focus:outline-none focus:shadow-outline">
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
