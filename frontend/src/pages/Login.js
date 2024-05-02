import React, { useState } from 'react';
import styled from 'styled-components';
import bgImg from './5starvenue.jpg';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import the Cookies library



const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledRegisterDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCol1Div = styled.div`
  text-align: center;
`;

const StyledForm = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const StyledButton = styled.button`
  padding: 10px 30px;
  margin: 5px;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Login({handleLogin,handleUserType}) {
  const { register, handleSubmit } = useForm();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response=await axios.post('http://localhost:3001/user/login', {
        email: data.email,
        password: data.password,
      });

      const { token } = await response.data;
      Cookies.set('jwt', token); 
      console.log(response)
      handleUserType(response.data.user.userType)
     
      setErrorMessage('Login successful')
      handleLogin()
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.response.data.status)
    }
  };

  return (
    <StyledSection style={{ backgroundColor: '#6CA6CD' }}>
      <StyledRegisterDiv className="register">
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
        <StyledCol1Div className="col-1">
          <h2>Login</h2>

          <StyledForm id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
            <StyledInput type="text" {...register('email')} placeholder='Email' required />
            <StyledInput type="password" {...register('password')} placeholder='Password' required />
            <label>
              <input
                type="checkbox"
                style={{ marginRight: '10px' }}
                required ='true'
              />
              I agree to the terms and conditions
            </label>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <StyledButton type="submit" className='btn'>Login</StyledButton>
          </StyledForm>
        </StyledCol1Div>
      </StyledRegisterDiv>
    </StyledSection>
  );
}
