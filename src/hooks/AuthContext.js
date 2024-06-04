// "use client"
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from 'axios';
// import jwtDecode from "jwt-decode";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(false);
//     console.log(user)
//     useEffect(() => {


//         if (typeof window !== 'undefined' && storedToken) {
//             const fetchUser = async () => {
//                 setLoading(true);
//                 try {
//                     // Decode the JWT token to access its payload
//                     const decodedToken = jwtDecode(storedToken);
//                     const userEmail = decodedToken.email;
//                     console.log(userEmail)

//                     const response = await axios.get(`/profile/${userEmail}`, {
//                         headers: {
//                             'Authorization': `Bearer ${storedToken}`
//                         }
//                     });
//                     setUser(response.data);
//                 } catch (error) {
//                     console.error('Error fetching user data:', error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchUser();
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{ user, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuthContext = () => {
//     return useContext(AuthContext);
// };
