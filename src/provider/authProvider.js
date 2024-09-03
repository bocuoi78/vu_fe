import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api";

const AuthContext = createContext();
// const ProfileContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const setToken = (newToken) => {
        setToken_(newToken);
    };
    // const [profile, setProfile_] = useState({});
    // const setProfile = (newProfile) => {
    //     setProfile_(newProfile);
    // };
    // const requestUserInfo = async () => {
    //     try {
    //         const response = await api.getUserInfo();
    //         if (response?.data?.data) {
    //             setProfile(response.data.data.profile);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
            // requestUserInfo();

        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    const authContextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    // const profileContextValue = useMemo(
    //     () => ({
    //         profile,
    //         setProfile,
    //     }),
    //     [profile]
    // );
    //
    // const roleListContextValue = useMemo(
    //     () => ({
    //         roleList,
    //         setRoleList,
    //     }),
    //     [roleList]
    // );
    //
    // const roleContextValue = useMemo(
    //     () => ({
    //         role,
    //         setRole,
    //     }),
    //     [role]
    // );

    return (
        <AuthContext.Provider value={authContextValue}>
            {/*<ProfileContext.Provider value={profileContextValue}>*/}
                {/*<RoleListContext.Provider value={roleListContextValue}>*/}
                {/*    <RoleContext.Provider value={roleContextValue}>*/}
                        {children}
                {/*    </RoleContext.Provider>*/}
                {/*</RoleListContext.Provider>*/}
            {/*</ProfileContext.Provider>*/}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

// export const useProfile = () => {
//     return useContext(ProfileContext);
// };
//
// export const useRoleList = () => {
//     return useContext(RoleListContext);
// };
//
// export const useRole = () => {
//     return useContext(RoleContext);
// };

export default AuthProvider;