import React,{createContext,useState,useEffect,useContext} from "react";

const AuthContext = createContext();



export const useAuth=()=>{
    return useContext(AuthContext);
};

export const AuthProvider=({children})=>{
    const [currentUser, setCurrentUser]= useState(null);
}