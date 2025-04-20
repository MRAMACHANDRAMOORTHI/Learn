// src/components/StudentList.js
import { SetStateAction, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import StudentProvider from "../context/StudentContext";
import DisplayStudents from "./DisplayStudents";

const StudentList = () => {
  // 🔸 States for students and input fields
  const [students, setStudents] = useState<
    { id: string; name?: string; mobile?: string }[]
  >([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [editId, setEditId] = useState(null);

  const studentRef = collection(db, "students");

  // 🔸 Get All Students from Firebase
  const getStds = async () => {
    const docSnap = await getDocs(studentRef);
    const studentList = docSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setStudents(studentList);
  };

  const getStdsFromSub = async (studentId: string) => {
    // 🔥 1. Dynamically get path to subcollection
    const studentCertRef = collection(db, "students", studentId, "cert");

    // 📥 2. Fetch all certificates of that student
    const docSnap = await getDocs(studentCertRef);

    // 📋 3. Convert to usable array
    const certList = docSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // 📦 4. Store in state
    setStudents(certList);
  };

  // 🔸 Add or Update Student
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!name || !mobile) {
      alert("Name and Mobile can't be empty!");
      return;
    }

    try {
      if (editId) {
        // 🔹 If editId exists, update the student
        await updateDoc(doc(db, "students", editId), { name, mobile });
        alert("Student updated!");
        setEditId(null);
      } else {
        // 🔹 Else add new student
        const newDoc = await addDoc(studentRef, { name, mobile });
        console.log("New student added with ID:", newDoc.id);
        alert("Student added!");
      }

      setName("");
      setMobile("");
      getStds();
    } catch (err) {
      console.error(err);
      alert("Error occurred!");
    }
  };

  // 🔸 Delete a student
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "students", id));
      alert("Student deleted!");
      getStds();
    } catch (err) {
      console.error(err);
      alert("Delete failed!");
    }
  };

  // 🔸 Pre-fill form for update
  const handleEdit = (student: {
    id: SetStateAction<null>;
    name: SetStateAction<string>;
    mobile: SetStateAction<string>;
  }) => {
    setEditId(student.id);
    setName(student.name);
    setMobile(student.mobile);
  };

  // Live update using onSnapshot
  // 🔸 Listen for real-time updates to the students collection
  onSnapshot(collection(db, "students"), (snapshot) => {
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("Live Update:", list);
  });

  // 🔸 On mount, fetch students
  useEffect(() => {
    getStds();
    getStdsFromSub("s1fCL4Jq8JtftwAVQhu3"); // Replace 'studentId' with the actual student ID you want to fetch certificates for
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

        {students.map((cert) => (
          <div key={cert.id}>
            <p>Title: {cert.title}</p>
            <p>Score: {cert.score}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>{editId ? "✏️ Update Student" : "➕ Add Student"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Student Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <br />
          <br />
          <button type="submit">{editId ? "Update" : "Add"} Student</button>
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
