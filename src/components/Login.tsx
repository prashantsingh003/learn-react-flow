import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getLogin } from '../utils/api';
import { useDispatch } from 'react-redux';
import { setUser,User } from '../store/slices/authSlice/authSlice';
export const Login: React.FC = () => {
	const [message,setMessage]=useState<String|null>();
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
		axios.post(getLogin,formData)
		.then(({data}:{data:User})=>{
      dispatch(setUser(data))
      setMessage("success")
      navigate('/calculator')
		})
    .catch((err:AxiosError)=>{
      setMessage("invalid credentials")
    })
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <small className='d-block text-blue-500'>{message&&message}</small>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};