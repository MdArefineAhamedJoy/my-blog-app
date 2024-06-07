"use client"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MdOutlineDeleteOutline, MdEdit } from "react-icons/md";
import apiClient from '../../../axios';
import Link from 'next/link';

const Profile = () => {
    const storedData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const userEmail = storedData ? JSON.parse(storedData).email : null;
    const queryClient = useQueryClient();

    const fetchUserData = async (email) => {
        const response = await apiClient.get(`/profile?email=${email}`);
        return response.data;
    };

    const fetchUserBlogs = async (email) => {
        const response = await apiClient.get(`/blogs?email=${email}`);
        return response.data;
    };

    const deleteBlog = async (id) => {
        await apiClient.delete(`/blogs/${id}`);
    };

    const { data: userData, isLoading: isUserLoading, error: userError } = useQuery({
        queryKey: ['userData', userEmail],
        queryFn: () => fetchUserData(userEmail),
        enabled: !!userEmail,
    });

    const { data: userBlogs, isLoading: isBlogsLoading, error: blogsError } = useQuery({
        queryKey: ['userBlogs', userEmail],
        queryFn: () => fetchUserBlogs(userEmail),
        enabled: !!userEmail,
    });

    const mutation = useMutation({
        mutationFn: deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries(['userBlogs', userEmail]);
        }
    });

    const handleDelete = (id) => {
        mutation.mutate(id);
    };

    // if (isUserLoading || isBlogsLoading) return <div>Loading...</div>;
    // if (userError) return <div>Error loading user data: {userError.message}</div>;
    // if (blogsError) return <div>Error loading blogs: {blogsError.message}</div>;

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12">
                <h1 className="text-3xl font-bold mb-6 text-center">User Profile Page</h1>
                <div className='w-7/12 mx-auto'>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-2 text-center">{userData?.name}</h2>
                        <p className="text-center text-gray-700 mb-2">Phone: {userData?.phoneNumber}</p>
                        <p className="text-center text-gray-700 mb-4">Email: {userData?.email}</p>
                        <Link href={`/client/pages/editprofile/${userEmail}`} className='text-center text-green-800 w-full block hover:underline hover:text-blue-500  focus:text-blue-500  active:text-red-500 visited:text-purple-500'>
                            Edit Profile
                        </Link>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">User Blogs</h3>
                    <div>
                        {userBlogs?.length > 0 ? (
                            <ul className="border p-4">
                                {userBlogs.map((blog) => (
                                    <li key={blog?._id} className="mb-4 border-b-2 pb-2">
                                        <h4 className="text-lg font-semibold mb-1 text-center">{blog.title}</h4>
                                        <p className="text-gray-700 mb-2">{blog.content}</p>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-sm text-gray-500">
                                                <p>Published on:</p> {new Date(blog.publicationDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center">
                                                <button onClick={() => handleDelete(blog?._id)} className="mr-4">
                                                    <MdOutlineDeleteOutline />
                                                </button>
                                                <Link href={`/client/pages/edit/${blog._id}`} className="flex items-center">
                                                    <MdEdit />
                                                    <span className="ml-1">Edit</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-700">No blogs found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
