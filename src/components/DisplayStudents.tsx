import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';

const DisplayStudents = () => {
	const { students } = useContext(StudentContext);

	return (
		<div style={{ padding: '20px' , backgroundColor: '#f0f0f0', borderRadius: '8px'}}>
			<h2>Students List:</h2>
			{students.map((student) => (
				<div key={student.id}>
					<p>Name : {student.name}</p>
					<p>Mobile : {student.mobile}</p>
					<hr />
				</div>
			))}
		</div>
	);
};

export default DisplayStudents;
