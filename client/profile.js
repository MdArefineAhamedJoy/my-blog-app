"use client"
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import apiClient from '../src/axios';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [userBlogs, setUserBlogs] = useState([]);
    const storedData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const userEmail = storedData ? JSON.parse(storedData).email : null;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (!userEmail) return;
                const response = await apiClient.get(`/api/profile?email=${userEmail}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const fetchUserBlogs = async () => {
            try {
                if (!userEmail) return;
                const response = await apiClient.get(`/api/blogs?email=${userEmail}`);
                setUserBlogs(response.data);
            } catch (error) {
                console.error("Error fetching user blogs:", error);
            }
        };

        fetchUserData();
        fetchUserBlogs();
    }, [userEmail]);

    const handleDelete = async (id) => {
        try {
            await apiClient.delete(`/api/blogs/${id}`);
            setUserBlogs(userBlogs.filter((blog) => blog.id !== id));
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };



    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12">
                <h1 className="text-3xl font-bold mb-6 text-center">User Profile Page</h1>
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-center">{userData?.name}</h2>
                    <p className="text-center text-gray-700 mb-2">Phone: {userData?.phoneNumber}</p>
                    <p className="text-center text-gray-700 mb-4">Email: {userData?.email}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-4">User Blogs</h3>
                    <div>
                        {userBlogs?.length > 0 ? (
                            <ul className="border p-4">
                                {userBlogs.map((blog) => (
                                    <li key={blog?.id} className="mb-4 border-b-2 pb-2">
                                        <h4 className="text-lg font-semibold mb-1 text-center">{blog?.title}</h4>
                                        <p className="text-gray-700 mb-2">{blog?.content}</p>
                                        <div className="flex items-center justify-between w-full">
                                            <div className="text-sm text-gray-500">
                                                <p>Published on:</p> {new Date(blog?.publicationDate).toLocaleDateString()}
                                            </div>
                                            <button onClick={() => handleDelete(blog.id)}>
                                                <MdOutlineDeleteOutline />
                                            </button>
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
