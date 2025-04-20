import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react'
import { db } from '../firebaseConfig';

const AddStudent = () => {

    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const studentRef = collection(db, 'students');
    const handleAdd = async (e) =>{
        e.preventDefault();
        try {
            const docRef = await addDoc(studentRef, {
                name: name,
                mobile: mobile,
            });
            
            console.log('Document written with ID: ', docRef.id);
            alert('Student added successfully!');
            setName('')
            setMobile('')
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    }


  return (
    <div>
    <form>
        <h3>Add Student</h3>
        <label>Enter Name : </label><input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} required />
        <label>Enter Mobile : </label><input type="text" placeholder="Mobile" onChange={(e)=> setMobile(e.target.value)} required />
        <button onClick={handleAdd}>Add Student</button>



    </form>
    </div>
  )
}

export default AddStudent
