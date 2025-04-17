import React, { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { collection, getDoc, getDocs } from 'firebase/firestore'

const Home = () => {
  const navigate = useNavigate();

  interface User {
    id: string;
    [key: string]: any;
  }

  const [user, setUser] = useState<User[]>([])

  const userRef = collection(db, 'users')
  

  const fetchData = async () => {
    const data = await getDocs(userRef);

    const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUser(filteredData);

  };


  useEffect(() => {
    fetchData();
  }, []);


  const logout = () =>{
    signOut(auth)
    .then(() => {
      console.log('logged out')
      alert("Logged Out Successfully!")
      navigate('/login')
      })
  }

  return (
    <>
    <div>Home</div>
    <div>
      {user.map((user) => {
        return (
          <div>
          <h3>Welcome {user.name} !</h3>
          <p>Company : {user.company}</p>
          <p>Qualification : {user.desc}</p>
          <p>Role : {user.role}</p>
          <p>Age : {user.age}</p>
          

          </div>
        )
      })}
    </div>

    <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home