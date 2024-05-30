import React, { useContext, useState } from 'react';
import './css/login.css';
import { store } from './App';
import { Navigate } from 'react-router';
import axios from 'axios';
import Nav from './Nav';

axios.defaults.baseURL = "https://fina-todo-back.onrender.com";
// http://localhost:3030

function Login() {
    const [token, setToken] = useContext(store);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    
    const [loading, setLoading] = useState(false); // Loading state

    const loginHandle = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const loginSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (loginData.email !== '' && loginData.password !== '') {
            setLoading(true); // Start loading
            try {
                const res = await axios.post('/person/login', loginData);
                setLoginData({ email: '', password: '' });
                if (res.data.length > 20) {
                    alert("Login successfully");
                    setToken(res.data);
                } else {
                    alert(res.data);
                }
            } catch (error) {
                alert('Login failed. Please try again.');
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            window.alert('Please fill out the entire form.');
        }
    }

    if (token) {
        return <Navigate to='/Main'></Navigate>;
    }

    return (
        <>
            <Nav />
            <div className='loginsection'>
                <form className='loginitems' onSubmit={loginSubmit}>
                    <div className='logintitle'>Login</div>
                    <div className='loginitem'>
                        <input
                            className='logininputs'
                            placeholder='Email'
                            name='email'
                            value={loginData.email}
                            onChange={loginHandle}
                        />
                    </div>
                    <div className='loginitem'>
                        <input
                            className='logininputs'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={loginData.password}
                            onChange={loginHandle}
                        />
                    </div>
                    <div>
                        <button className='loginbutton' type='submit' disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;

// import React, {useContext, useState} from 'react'
// import './css/login.css'
// import { store } from './App'
// import { Navigate } from 'react-router'
// import axios from 'axios'
// import Nav from './Nav'

// axios.defaults.baseURL="http://localhost:3030" 

// function Login() {
//     const [token,setToken]=useContext(store)
    

//     const [loginData,setloginData]=useState({
//         email:'',
//         password:''    })
    
//     const loginhandle=(e)=>{
//        setloginData({...loginData,[e.target.name]:e.target.value})
//     } 
   
//     const loginsubmit =async ()=>{
//         if(loginData.email!=='' && loginData.password!==''){
//         const res= await axios.post('/person/login',loginData)
//         // console.log('login',res)
//         // console.log('##',res.data)
//         setloginData({email:'',password:''})
//         if(res.data.length > 20){
//             alert("login succeefully") 
//             setToken(res.data)
//         }
//         else{
//             alert(res.data)
//         }
//     }
//     else{
//         window.alert('fill the form')

//     }  
        
        
//     }    
//     // console.log('token',token)
//     if(token){
//         return <Navigate to='/Main'></Navigate>
//     }
//   return (
//     <>
//     <Nav/>
//     <div className='loginsection'>
        
//         <div className='loginitems'>
//            <div className='logintitle'>Login</div>
    
//             <div className='loginitem'> 
//                 <input className='logininputs' placeholder='email' name='email' value={loginData.email} onChange={loginhandle}></input>
//             </div>    
//             <div className='loginitem'>     
//                 <input  className='logininputs' placeholder='password' name='password'  value={loginData.password} onChange={loginhandle}></input>
//             </div>
//             <div >
//              <button className='loginbutton'onClick={loginsubmit}>submit</button>
//             </div>
//         </div> 
        

//     </div>
//     </>
//   )
// }

// export default Login