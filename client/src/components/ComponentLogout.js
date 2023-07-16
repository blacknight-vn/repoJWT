import {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstanceLogout from '../axiosInstance/axiosInstanceLogout';

function Logout() {

    axios.defaults.withCredentials = true;
    let nav = useNavigate();

    useEffect(() => {
        axiosInstanceLogout.get('/logout', {
            headers: {'x-access-token': localStorage.getItem('accessToken')}
        }).then((response) => {
            console.log(response.data.message);
            if (response.data.authorization){
                localStorage.removeItem('accessToken');
            };
            nav('/');
        })
    }, [])

    return (
        <></>
    )
}

export default Logout;