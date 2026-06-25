import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    await register(email, password);
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <Input label="Email" value={email} onChange={setEmail} type="email" />
      <Input label="Password" value={password} onChange={setPassword} type="password" />
      <Button onClick={submit} variant="primary">Register</Button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default RegisterPage;