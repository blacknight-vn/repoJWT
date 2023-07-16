import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axiosInstanceLogin from '../../axiosInstance/axiosInstanceLogin';

import '../../asset/scss/login.scss';

function Login() {

    let nav = useNavigate();
    let [check, setCheck] = useState(false)

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');


    useEffect(() => {
        axiosInstanceLogin.get('/auth', {
            headers: {'x-access-token': localStorage.getItem('accessToken')}
        }).then((response) => {
            console.log(response.data.message);
            if (!response.data.authorization){
                nav('/index/home');
            } else {
                setCheck(true)
            }
        })
    }, []);


    const onChangeEmail = (e) => {
        setEmail(e);
    }

    const onChangePassword = (e) => {
        setPassword(e);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/login', {
            email: email,
            password: password,
        },{
            headers: {'x-access-token': localStorage.getItem('accessToken')}
        }).then((response) => {
            console.log(response.data.message);
            if (response.data.authorization) {
                localStorage.setItem('accessToken', response.data.accessToken);
                nav('/index/home');
            }
        })
    }


    return (
        <div className = 'login'>
            {check && 
                <div className = 'login__below'>
                    <form className = 'form' onSubmit = {(e) => onSubmit(e)}>
                        <h1>Login Form</h1>
                        <div>Email: <input type = 'text' name = 'email' placeholder = 'Enter Email ...' onChange = {(e) => onChangeEmail(e.target.value)}/></div>
                        <div>Password: <input type = 'password' name = 'password' placeholder = 'Enter Password ...' onChange = {(e) => onChangePassword(e.target.value)}/></div>
                        <input type = 'submit' className = 'input' value = 'SUBMIT'/>
                    </form>

                    <Link to = '/'>Back</Link>
                </div>}
        </div>
    )
}

export default Login;