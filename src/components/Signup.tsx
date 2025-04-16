import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import {auth} from '../config/firebaseConfig';

const Signup = () => {

    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const signUp = async () =>{
        await createUserWithEmailAndPassword(auth,userName, password)
    }

  return (
    <div>
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="name" required/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="email" onChange={(e)=> setUserName(e.target.value)} required/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" onClick={signUp}>Sign Up</button>
        </form>
    </div>
  )
}

export default Signup