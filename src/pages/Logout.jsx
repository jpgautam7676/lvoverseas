import React from "react";
import { useNavigate } from 'react-router-dom';
import Menu from './Menu'


const Logout = () =>{
    const navigate = useNavigate();

    localStorage.clear();
    return navigate('/');
     
}

export default Logout;