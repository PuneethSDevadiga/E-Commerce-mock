import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const handleLogin=()=>{
        if(username=='puneeth' && password=='mdn@123'){
            navigate('/home');
            alert('login successfull');

    }
    else{
        alert('invalid username or password');
    }
    }
  return (
    <div>
        <div className="container-login">
            <h1>Welcome to Login Page</h1>
            <br/>
            <br/>
            <div className="align-center">
            <input type="text" placeholder="Enter your username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <br/>
            <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <br/>
            <button onClick={handleLogin}>Login</button>
            </div>
            
        </div>
    </div>
  )
}

export default Login