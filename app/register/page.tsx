import React from 'react';
import RegisterClient from '../components/auth/RegisterClient';

const Register = async () => {
  const currentUser = await getCurrentUser();
  
  return (
    <div>
      <RegisterClient currentUser={currentUser} />
    </div>
  );
};

export default Register;
