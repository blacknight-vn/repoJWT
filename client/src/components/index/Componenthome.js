import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axiosInstanceHome from '../../axiosInstance/axiosInstanceHome';
import axios from 'axios';

import '../../asset/scss/home.scss';

function Home() {

    let nav = useNavigate();
    let [dataUser, setDataUser] = useState('');
    
    useEffect(() => {
        axiosInstanceHome.get('/home', {
            headers: {'x-access-token': localStorage.getItem('accessToken')}
        }).then((response) => {
            console.log(response.data.message);
            if (!response.data.authorization) {
                nav('/');
            } else {
                setDataUser(response.data.user);
            }
        })
    }, [])

    return (
        <div className = 'home'>
            {dataUser && 
            <div>
            <h1 className = 'title'>Home Page</h1>
                <div className = 'user'>
                    <h1 className = 'important'>Id: {dataUser.id}</h1>
                    <h1>Username: {dataUser.username}</h1>
                    <h1>Email: {dataUser.email}</h1>
                    <h1>Introduction: {dataUser.introduction}</h1>
                    <h1>Image: {dataUser.img ? dataUser.img : 'No Image'}</h1>
                    <h1 className = 'important'>Role: {dataUser.role}</h1>
                    <h1>Created At: {dataUser.createdAt}</h1>
                    <h1>Updated At: {dataUser.updatedAt}</h1>
                </div>
            </div>}
        </div>
    )
}

export default Home;