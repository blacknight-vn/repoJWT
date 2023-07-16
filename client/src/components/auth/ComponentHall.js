import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import './../../asset/scss/hall.scss';

function Hall() {

    let nav = useNavigate();
    let [check, setCheck] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/auth', {
            headers: {'x-access-token': localStorage.getItem('accessToken')}
        }).then((response) => {
            console.log(response.data.message);
            if (!response.data.authorization) {
                nav('/index/home');
            } else {
                setCheck(true)
            }
        })
    }, [])

    return (
        <div className = 'hall'>
            {check && 
                <div className = 'hall__below'>
                    <h1>Sign && Login</h1>
                    <Link to = '/auth/signup'>Sign Up</Link>
                    <Link to = '/auth/login'>Login</Link> 
                </div>}
        </div>
    )
}

export default Hall;