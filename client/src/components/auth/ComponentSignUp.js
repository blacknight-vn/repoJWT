import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axiosInstanceSignUp from '../../axiosInstance/axiosInstanceSignUp';

import '../../asset/scss/signup.scss';

function SignUp() {

    let nav = useNavigate();
    let [check, setCheck] = useState(false);

    let [username, setUsername] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [introduction, setIntroduction] = useState('');

    useEffect(() => {
        axiosInstanceSignUp.get('/auth', {
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

    const onChangeName = (e) => {
        setUsername(e);
    };

    const onChangeEmail = (e) => {
        setEmail(e);
    }

    const onChangePassword = (e) => {
        setPassword(e);
    }

    const onChangeIntroduction = (e) => {
        setIntroduction(e);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/signup', {
            username: username,
            email: email,
            password: password,
            introduction: introduction,
        }).then((response) => {
            console.log(response.data.message);
            if (response.data.authorization) {
                nav('/auth/login');
            }
        })
    }

    return (
        <div className = 'signup'>
            {check && 
                <div className = 'signup__below'>
                    <form className = 'form' onSubmit = {(e) => onSubmit(e)}>
                        <h1>Sign Up Form</h1>
                        <div>Name: <input type = 'text' name = 'username' placeholder = 'Enter Username ...' onChange = {(e) => onChangeName(e.target.value)}/></div>
                        <div>Email: <input type = 'text' name = 'email' placeholder = 'Enter Email ...' onChange = {(e) => onChangeEmail(e.target.value)}/></div>
                        <div>Password: <input type = 'password' name = 'password' placeholder = 'Enter Password ...' onChange = {(e) => onChangePassword(e.target.value)}/></div>
                        <div>Introduction: <input type = 'text' name = 'introduction' placeholder = 'Enter Introduction ...' onChange = {(e) => onChangeIntroduction(e.target.value)}/></div>
                        <input type = 'submit' className = 'input' value = 'SUBMIT'/>
                    </form>

                    <Link to = '/'>BACK</Link>
                </div>}
        </div>
    )
}

export default SignUp;