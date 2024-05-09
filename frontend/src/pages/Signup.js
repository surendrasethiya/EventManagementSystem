import React, { useState } from 'react';
import bgImg from './5starvenue.jpg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';


export default function Signup({handleLogin}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        email: '',
        mobile: '',
    });

    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);


    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        criteriaMode: 'all',
    });

    const onSubmit = async (data) => {
        // Check if password and confirm password match
        if (data.password !== data.confirmpwd) {
            setPasswordsMatch(false);
            return;
        }

        // Check if password meets the length requirement
        if (data.password.length < 8) {
            setError('password', {
                type: 'manual',
                message: 'Password must be at least 8 characters long',
            });
            return;
        }

        const dataToSend = { ...data };
        delete dataToSend.confirmpwd;

        // Reset the passwordsMatch state if they match during a subsequent submission
        setPasswordsMatch(true);

        try {
            await axios.post('http://localhost:3001/user/signup', data);
            setErrorMessage('register successfully');
            handleLogin()
            navigate('/home');
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setErrorMessage('user already exists please login')
            } else {
                setErrorMessage('Error occured');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className='section'>
            <div className="register">
                <div className="col-1">
                    <h2>Sign Up</h2>
                    <span>Register Now for PRAVIKASH EVENT</span>

                    <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="userName" {...register("userName")} value={formData.userName} onChange={handleChange} placeholder='userName' />
                        <input type="password" name="password" {...register("password")} value={formData.password} onChange={handleChange} placeholder='Password' />
                        {errors.password && <p className="error">{errors.password.message}</p>}
                        <input type="password" name="confirmpwd" {...register("confirmpwd")} value={formData.confirmpwd} onChange={handleChange} placeholder='Confirm Password' />
                        {!passwordsMatch && <p className="error">Passwords and confirm  should match do not match</p>}
                        <input type="email" name="email" {...register("email")} value={formData.email} onChange={handleChange} placeholder='Email' />
                        <input type="text" name="mobile" {...register("mobile", { required: true, maxLength: 10 })} value={formData.mobile} onChange={handleChange} placeholder='Mobile Number' />
                        {errors.mobile?.type === "required" && "Mobile Number is required"}
                        {errors.mobile?.type === "maxLength" && "Max Length Exceeded"}
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <button type="submit" className='btn'>Sign Up</button>
                    </form>
                </div>
                <div className="col-2">
                    <img src={bgImg} alt="" />
                </div>
            </div>
        </section>
    );
}
