import React, { useContext, useEffect, useState } from 'react'
import { store } from './App'
import { Navigate } from 'react-router'
import axios from 'axios'
import './css/main.css'

axios.defaults.baseURL="https://fina-todo-back.onrender.com"
function Main() {

    const [Person,setPerson]=useState({
      name:'',
      items:[]
    });
    const [status,setStatus]=useState(true);
    const [loading,setLoading]=useState(false);
    const [token,setToken]=useContext(store);
    const [personId,setpersonId] = useState(null);
    const [oldtodo,setoldtodo] = useState(null);
    const [message,setMessage]= useState({
      todo:"",   
  });
  
    // console.log("to",token)
    // console.log("preson",personId)

    const messageHandle=(e)=>{
      setMessage({
          ...message,
          todo:e.target.value
  });
  };

    const getData = async()=>{
      // console.log(`/person/${personId}`) 
    //   setLoading(true)
    //  const res = await axios.get(`/person/${personId}`)
    //  setPerson({...Person,name:res.data.name,items:res.data.item})
    //  setLoading(false)   
    if (personId) {
      try {
          setLoading(true);
          const res = await axios.get(`/person/${personId}`);
          setPerson({ name: res.data.name, items: res.data.item });
      } catch (error) {
          console.error("Failed to fetch data", error);
      } finally {
          setLoading(false);
      }
  } 
  
    }
    useEffect(()=>{
      if (token) {
        axios.get('/person/todo', {
            headers: { 'token': token }
        })
        .then((res) => setpersonId(res.data))
        .catch((err) => console.log(err));
    }
     },[token])
     
     useEffect(() => {
      getData()
  },[personId]); 

  if(!token){
    return <Navigate to='/'></Navigate>
  }
  

  const deletebtn =async(obj)=>{
    // setLoading(true)
    // await axios.delete(`/person/${personId}`, { data: { todo: obj } })
    // await getdata();
    // setLoading(false)
    // alert("deleted successfully")
    try {
      setLoading(true);
      await axios.delete(`/person/${personId}`, { data: { todo: obj } });
      // await getData();
      setPerson(prevState => ({
        ...prevState,
        items: prevState.items.filter(item => item !== obj)
    }));
      alert("Deleted successfully");
  } catch (error) {
      console.error("Failed to delete item", error);
  } finally {
      setLoading(false);
  }    

  }
  const addbtn = async(obj)=>{
    // console.log(obj)
    // setLoading(true)
    // 
    try {
      setLoading(true);
      await axios.post(`/person/${personId}`, obj);
      // await getData();
      setPerson(prevState => ({
        ...prevState,
        items: [...prevState.items, obj.todo]
    }));
      alert("Todo added");
      setMessage({ todo: "" });
  } catch (error) {
      console.error("Failed to add item", error);
  } finally {
      setLoading(false);
  }
  }
    // console.log(Person,"all") 

    const edit = async(obj)=>{
      setStatus(false)
      setMessage({todo:obj})
      setoldtodo(obj)
      
  }

  const editbtn = async()=>{
    // setLoading(true)
    // await axios.put(`/person/${personId}`, {oldTodo:oldtodo, newTodo:message.todo})
    // getdata()
    // setLoading(false)
    // setMessage({todo:''})
    // alert("data updated successfully")
    // setStatus(true)
    try {
      setLoading(true);
      await axios.put(`/person/${personId}`, { oldTodo: oldtodo, newTodo: message.todo });
      // await getData();
      setPerson(prevState => ({
        ...prevState,
        items: prevState.items.map(item => item === oldtodo ? message.todo : item)
    }));
      alert("Data updated successfully");
      setMessage({ todo: '' });
      setStatus(true);
  } catch (error) {
      console.error("Failed to update item", error);
  } finally {
      setLoading(false);
  }
}
   
  return (
    <>
    <div className='header'>
      <div  >
            {Person.name &&
            <h3>user :- {Person.name}</h3>}
        </div>
        <div>
        <button className='lobtn' onClick={()=>setToken(null)}>Logout</button>

        </div>
        
        
    </div>

    <div className='box'>
    
    <div className='container'>
    <h2 >TODO'S</h2>
        <div className='form'>
            <input className='input'  
            placeholder='enter the message' 
            value={message.todo} 
            onChange={messageHandle}
            />
            <div className='button'>
            {status ?<button className='btn' type="submit" onClick={()=>addbtn(message)} >Add</button> :<button className='btn' onClick={editbtn} >Edit</button>}
            </div>
        </div>
        <div className='todo_container'>
        {/* {loading && <h1>loading...</h1>} */}
        {loading && <div className="loading-container"><div className="spinner"></div></div>}
        {!loading && Person.items.length===0 && <h2>no Todo</h2>}
            {   
                !loading && Person.items.map((eachobj,id)=>{
                    
                    return (
                        <div className='todo_items' key={id}>
                            <span >
                                {eachobj}
                            </span>
                            <div className='todo_btn'>
                            <button className="btn" onClick={()=>deletebtn(eachobj)} >delete</button>
                            <button className="btn" onClick={()=>edit(eachobj)}>edit</button>
                            </div>
                        </div>
                    )
                }
                )
            }
        </div>
    </div>
</div>
</>
    
    
  )
}

export default Main