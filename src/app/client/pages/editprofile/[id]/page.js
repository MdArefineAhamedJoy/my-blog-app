"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import apiClient from '../../../../../axios';

const EditProfile = () => {
    const router = useRouter();
    const { id: email } = useParams();

    const [userData, setUserData] = useState(null);
    const [isUserLoading, setIsUserLoading] = useState(true);
    const [updatedUserData, setUpdatedUserData] = useState({
        name: '',
        phoneNumber: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiClient.get(`/user/${email}`);
                setUserData(response.data);
                setIsUserLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsUserLoading(false);
            }
        };

        fetchUserData();
    }, [email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiClient.put(`/profile/${email}`, updatedUserData);
            toast.success('Profile updated successfully');
            router.push('/profile'); // Navigate to the profile page
        } catch (error) {
            console.error("Error updating user data:", error);
            toast.error('Error updating profile');
        }
    };

    if (isUserLoading) return <div>Loading...</div>;

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="w-7/12 bg-white shadow-md rounded px-8 py-6">
                <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
                <form onSubmit={handleSubmit} className="space-y-4 pb-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={updatedUserData.name}
                            onChange={handleInputChange}
                            className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 border-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedUserData.phoneNumber}
                            onChange={handleInputChange}
                            className="border-2 mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500 my-4 "
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
