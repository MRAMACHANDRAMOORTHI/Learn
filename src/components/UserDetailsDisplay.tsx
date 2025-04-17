import React from 'react';

interface UserDetailsProps {
  name: string;
  mobile: string;
  desc: string;
  company: string;
  address: string;
  role: string;
}

const UserDetailsDisplay: React.FC<UserDetailsProps> = ({ name, mobile, desc, company, address, role }) => {
  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Mobile:</strong> {mobile}</p>
      <p><strong>Description:</strong> {desc}</p>
      <p><strong>Company:</strong> {company}</p>
      <p><strong>Address:</strong> {address}</p>
      <p><strong>Role:</strong> {role}</p>
    </div>
  );
};

export default UserDetailsDisplay;
