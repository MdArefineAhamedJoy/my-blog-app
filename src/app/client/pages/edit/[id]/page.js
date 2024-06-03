"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import apiClient from "../../../../../axios";

const EditBlog = () => {

    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await apiClient.get(`/blogs/${id}`);
                setBlogData(response.data);
            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        if (id) {
            fetchBlogData();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await apiClient.put(`/blogs/${id}`, blogData);
            if (response.status === 200) {
                router.push("/profile");
            } else {
                console.error("Error saving blog:", response.statusText);
            }
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    };

    if (!blogData) return <div>Loading...</div>;

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12">
                <h1 className="text-3xl font-bold mb-6 text-center">Edit Blog</h1>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blogData.title}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                    <textarea
                        name="content"
                        value={blogData.content}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;
