import {Routes, Route, NavLink} from 'react-router-dom';

import Hall from './auth/ComponentHall';
import Login from './auth/ComponentLogin';
import SignUp from './auth/ComponentSignUp';
import Home from './index/Componenthome';
import Admin from './index/ComponentAdmin';
import Logout from './ComponentLogout';

import '../asset/scss/app.scss';

const App = () => {

    return (
        <div className = 'app'>
            <div className = 'nav'>
                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} to = '/auth/signup'>Sign Up</NavLink>
                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} to = '/auth/login'>Login</NavLink>
                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} to = '/index/home'>Home</NavLink>
                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} to = '/index/admin'>Admin</NavLink>
                <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""} to = '/logout'>Logout</NavLink>
            </div>

            <Routes>
                <Route path = '/' element = {<Hall/>}/>
                <Route path = '/auth'>
                    <Route path = '/auth/signup' element = {<SignUp/>}/>
                    <Route path = '/auth/login' element = {<Login/>}/>
                </Route>
                <Route path = '/index'>
                    <Route path = '/index/home' element = {<Home/>}/>
                    <Route path = '/index/admin' element = {<Admin/>}/>
                </Route>
                <Route path = '/logout' element = {<Logout/>}/>
            </Routes>
        </div>
    )
}

export default App;