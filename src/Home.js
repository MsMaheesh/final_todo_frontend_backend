import React from 'react'
import './css/hone.css'
import Nav from './Nav'
function Home() {
  return (
    <div className='cl'>
      <div>
      <Nav/>
      </div>
      <div className='home'>
    <center>
        <h1>Welcome to Todo app</h1>
    </center>
    <div className='todo-info'>
        <h2>About Todo App</h2>
        <p>
            The Todo app is a simple yet powerful tool to help you organize your tasks and manage your daily activities more efficiently. With Todo app, you can create, edit, and delete tasks easily, ensuring that you stay on top of your commitments.
        </p>
        <h2>How to Get Started</h2>
        <p>
            Getting started with Todo app is easy! Simply sign up or log in to start creating your todo list. Once logged in, you can add new tasks, mark them as complete, or edit existing ones. Todo app makes it simple to stay organized and productive throughout your day.
        </p>
        <h2>Key Features</h2>
        <ul>
            <li>Create and manage multiple todo lists</li>
            <li>Add, edit, and delete tasks</li>
            <li>Mark tasks as complete</li>
            <li>User-friendly interface</li>
            <li>Responsive design for use on any device</li>
            <li>Multi-user support for collaborative task management</li> 
        </ul>
    </div>
</div>
    </div>
  )
}

export default Home