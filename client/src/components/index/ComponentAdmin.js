import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import axiosInstanceAdmin from '../../axiosInstance/axiosInstanceAdmin';

import '../../asset/scss/admin.scss';

function Admin() {

    let nav = useNavigate();
    let [allUserData, setAllUserData] = useState('');

    useEffect(() => {
        axiosInstanceAdmin.get('/admin', {
            headers: {'x-access-token': localStorage.getItem('accessToken')}
        }).then((response) => {
            console.log(response.data.message);
            if (!response.data.authorization) {
                nav('/');
            } else {
                setAllUserData(response.data.userAll);
            }
        })
    }, [])

    return (
        <div className = 'admin'>
            {allUserData && 
                <div>
                    <h1 className = 'title'>ADMIN</h1>
                    <div className = 'allUser'>
                        {allUserData.map((value, index) => {
                            return (
                                <div className = 'user' key = {index}>
                                    <div>
                                        <h1><strong>Username:</strong> {value.username}</h1>
                                        <h2><strong>Email: </strong>{value.email}</h2>
                                        <h2><strong>Introduction: </strong>{value.introduction}</h2>
                                    </div>
                                    <h1 className = 'index'>{index+1}</h1>
                                </div>
                            )
                        })}
                    </div>
                </div>
            }
        </div>
    )
}

export default Admin;