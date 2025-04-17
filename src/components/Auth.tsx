import { SetStateAction, useState } from "react";

const Auth = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () =>{

    }


  return (
    <>
    <div>
        <h1>Auth Page</h1>
            <input type="text" placeholder="username" onChange={(event)=> setUsername(event.target.value)} />
            <label>Username:</label>
            <br/>
            <label>Password:</label>
            <input type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)} />
            <br/>
            <button onClick={signIn}>Login</button>
    </div>
    </>
  )
}

export default Auth