import React, { useState } from 'react';
import axios,{AxiosError} from 'axios';
import { useNavigate } from "react-router-dom";
import { createUserApi } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { setUser,User } from '../../store/slices/authSlice/authSlice';
// import userLog
const initialFormData={
  email: '',
  password: '',
  confirmPassword: '',
  name: ''
}
export const Signup: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
	const [message,setMessage]=useState<String|null>();
  const navigate=useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle form submission here, for example, send data to backend
    axios.post(createUserApi,formData)
		.then(({data}:{data:User})=>{
      dispatch(setUser(data))
      setFormData(initialFormData)
      navigate('/')
		})
    .catch((err:AxiosError)=>{
      setMessage('Invalid data')
      setFormData({...formData,password:'',confirmPassword:''})
    })
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
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
          <label htmlFor="confirmPassword" className="block">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <small className='d-block text-red-500'>{formData.confirmPassword!=formData.password?"passwords doesn't match":""}</small>
          <small className='d-block text-red-500'>{message&&message}</small>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</button>
      </form>
    </div>
  );
};
