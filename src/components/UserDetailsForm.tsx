import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

interface UserDetailsFormProps {
  setUserDetails: React.Dispatch<React.SetStateAction<{
    name: string;
    mobile: string;
    desc: string;
    company: string;
    address: string;
    role: string;
  } | null>>;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({ setUserDetails }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [desc, setDesc] = useState('');
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('');


  const navigate = useNavigate();

  const userRef = collection(db, 'users');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(userRef, {
        name,
        mobile,
        desc,
        company,
        address,
        role,
      });
      console.log('Document written with ID: ', docRef.id);
      alert('User details saved successfully!');

      setUserDetails({ name, mobile, desc, company, address, role }); // Set user details
      
      navigate('/user-details-display'); // Navigate to display page after saving
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Details</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
      <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} required />
      <input type="text" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserDetailsForm;
