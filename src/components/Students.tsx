// src/components/StudentList.js
import { SetStateAction, useEffect, useState } from 'react';
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import StudentProvider from '../context/StudentContext';
import DisplayStudents from './DisplayStudents';

const StudentList = () => {
  // 🔸 States for students and input fields
  const [students, setStudents] = useState<{ id: string; name?: string; mobile?: string }[]>([]);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [editId, setEditId] = useState(null);

  const studentRef = collection(db, 'students');

  // 🔸 Get All Students from Firebase
  const getStds = async () => {
    const docSnap = await getDocs(studentRef);
    const studentList = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setStudents(studentList);
  };

  // 🔸 Add or Update Student
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!name || !mobile) {
      alert("Name and Mobile can't be empty!");
      return;
    }

    try {
      if (editId) {
        // 🔹 If editId exists, update the student
        await updateDoc(doc(db, 'students', editId), { name, mobile });
        alert('Student updated!');
        setEditId(null);
      } else {
        // 🔹 Else add new student
        const newDoc = await addDoc(studentRef, { name, mobile });
        console.log('New student added with ID:', newDoc.id);
        alert('Student added!');
      }

      setName('');
      setMobile('');
      getStds();

    } catch (err) {
      console.error(err);
      alert('Error occurred!');
    }
  };

  // 🔸 Delete a student
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      alert('Student deleted!');
      getStds();
    } catch (err) {
      console.error(err);
      alert('Delete failed!');
    }
  };

  // 🔸 Pre-fill form for update
  const handleEdit = ((student: { id: SetStateAction<null>; name: SetStateAction<string>; mobile: SetStateAction<string>; }) => {
    setEditId(student.id);
    setName(student.name);
    setMobile(student.mobile);
  });

  // 🔸 On mount, fetch students
  useEffect(() => {
    getStds();
  }, []);

  return (
    <>
      <div>
        <h2>📚 Student List</h2>
        {students.map((student) => (
          <div key={student.id}>
            <h3>
              Name: {student.name} | Mobile: {student.mobile}
            </h3>
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
            <hr />
          </div>
        ))}
      </div>

      <div>
        <h2>{editId ? '✏️ Update Student' : '➕ Add Student'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Student Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          /><br />
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          /><br /><br />
          <button type="submit">{editId ? 'Update' : 'Add'} Student</button>
        </form>
      </div>

      <div>
        <StudentProvider>
          <DisplayStudents />
        </StudentProvider>

      </div>
    </>
  );
};

export default StudentList;