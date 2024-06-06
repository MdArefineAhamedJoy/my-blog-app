"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const getLinkClasses = (path) => {
        return router.pathname === path
            ? "text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-700"
            : "text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700";
    };

    return (
        <div>
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-xl font-bold">
                        <Link href="/">HomePage</Link>
                    </div>
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white text-2xl">
                            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
                        </button>
                    </div>
                    <div className={`md:flex md:items-center ${isOpen ? "block" : "hidden"}`}>
                        <Link href="/" className={getLinkClasses("/")}>
                            Home
                        </Link>
                        <Link href="/create" className={getLinkClasses("/create")}>
                            Create
                        </Link>
                        <Link href="/login" className={getLinkClasses("/login")}>
                            Login
                        </Link>
                        <Link href="/singup" className={getLinkClasses("/singup")}>
                            SignUp
                        </Link>
                        <Link href="/profile" className={getLinkClasses("/profile")}>
                            Profile
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default HomePage;
