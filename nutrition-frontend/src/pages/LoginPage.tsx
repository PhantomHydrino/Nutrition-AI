
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
// import { useNavigate } from 'react-router-dom';
// import { login as loginApi } from '../api/auth';
// import { setAuthToken } from '../api';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();


  const submit = async () => {
    setLoading(true);
    await login(email, password);
  };

  return (
    <div className="auth-page">
      <h2>Login</h2>
      <Input label="Email" value={email} onChange={setEmail} type="email" />
      <Input label="Password" value={password} onChange={setPassword} type="password" />
      <Button onClick={submit} variant="primary">{loading ? 'Logging in...' : 'Login'}</Button>
      <p>Need an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default LoginPage;