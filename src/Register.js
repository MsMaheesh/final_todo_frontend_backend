import React, { useState } from 'react';
import './css/register.css';
import axios from 'axios';
import Nav from './Nav';

axios.defaults.baseURL = "https://fina-todo-back.onrender.com";

function Register() {
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false); // Loading state

    const registerHandle = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }

    const registerSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (registerData.name !== '' && registerData.email !== '' && registerData.password !== '') {
            setLoading(true); // Start loading
            try {
                const res = await axios.post('/person/register', registerData);
                window.alert(res.data);
                setRegisterData({
                    name: '', email: '', password: ''
                });
            } catch (error) {
                window.alert('Registration failed. Please try again.');
            } finally {
                setLoading(false); // Stop loading
            }
        } else {
            window.alert('Please fill out the entire form.');
        }
    }

    return (
        <>
            <Nav />
            <div className='registersection'>
                <form className='registeritems' onSubmit={registerSubmit}>
                    <div className='registertitle'>Register</div>
                    <div className='registeritem'>
                        <input
                            className='registerinputs'
                            placeholder='Name'
                            name='name'
                            value={registerData.name}
                            onChange={registerHandle}
                        />
                    </div>
                    <div className='registeritem'>
                        <input
                            className='registerinputs'
                            placeholder='Email'
                            name='email'
                            value={registerData.email}
                            onChange={registerHandle}
                        />
                    </div>
                    <div className='registeritem'>
                        <input
                            className='registerinputs'
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={registerData.password}
                            onChange={registerHandle}
                        />
                    </div>
                    <div>
                        <button className='registerbutton' type='submit' disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;
// import React, { useState } from 'react'
// import './css/register.css'
// import axios from 'axios'
// import Nav from './Nav'

// axios.defaults.baseURL="http://localhost:3030"

// function Register() {
//     const [registerData,setregisterData]=useState({
//         name:'',
//         email:'',
//         password:''    })
    
//     const registerhandle=(e)=>{
//        setregisterData({...registerData,[e.target.name]:e.target.value})
//     } 
    
//     const registersubmit=async()=>{
//         if(registerData.username!=='' && registerData.email!=='' && registerData.password!=='' ){
//             const res=await axios.post('/person/register',registerData)
//             // console.log('data register',res)
//             window.alert(res.data)
//         setregisterData({
//             name:'',email:'', password:'', 
//         })
//         }
//         else{
//             window.alert('fill the form')

//         }    


//     }


//   return (
//     <>
//     <Nav/>
//     <div className='registersection'>
        
//         <div className='registeritems'>
//            <div className='registertitle'>Rgister</div>
//             <div className='registeritem'> 
//                 <input className='registerinputs' placeholder='name' name='name' value={registerData.name} onChange={registerhandle}></input>
//             </div>
//             <div className='registeritem'> 
//                 <input className='registerinputs' placeholder='email' name='email' value={registerData.email} onChange={registerhandle}></input>
//                 </div>    
//             <div className='registeritem'>     
//                 <input  className='registerinputs' placeholder='password' name='password'  value={registerData.password} onChange={registerhandle}></input>
//             </div>
//             <div >
//              <button className='registerbutton'onClick={registersubmit}>submit</button>
//             </div>
//         </div> 
        

//     </div>
//     </>
//   )
// }

// export default Register