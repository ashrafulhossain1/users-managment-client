import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email }
    console.log(user)

    fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)

        const newUsers = [...users, data]
        setUsers(newUsers)
        form.reset()

      })

  }

  return (
    <>
      <h1>Users management server</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <form onSubmit={handleSubmit}>
        <input name='name' type="name" />
        <input name='email' type="email" />
        <input type="submit" value="add value" />
      </form>
      <div>
        {

          users.map(user => <p key={user.id}>
            <span>name: {user.name} || </span>
            <span>email:{user.email}</span>
          </p>)
        }

      </div>
    </>
  )
}

export default App
