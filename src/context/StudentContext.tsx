/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs } from 'firebase/firestore';
import { createContext, useState, useEffect } from 'react';
import { db } from '../firebaseConfig';

// 🔸 Create a context for students
export const StudentContext = createContext<{ students: Student[] }>({ students: [] });

// Define type properly (optional)
interface Student {
	id: string;
	name?: string;
	mobile?: string;
}
// Define the context provider
const StudentProvider = ({ children }: any) => {
    // 🔸 State to hold students
	const [students, setStudents] = useState<Student[]>([]);

    // 🔸 Fetch students from Firebase

    const fetchStudents = async () => {
        try {
            const studentRef = collection(db, 'students');
            const docSnap = await getDocs(studentRef);
            const studentList = docSnap.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })) as Student[];
            setStudents(studentList);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    // 🔸 Fetch students when the component mounts
	useEffect(() => {
		fetchStudents();
	}, []);

	return (
        // 🔸 Provide the students state to children components
		<StudentContext.Provider value={{ students }}>
			{children}
		</StudentContext.Provider>
	);
};

export default StudentProvider;
