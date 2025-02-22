import React, { useContext, useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import { Button, Link } from '@mui/material';
import validate2 from '../utils/loginValidation';
import axios from 'axios'
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'http://localhost:8989/api';
const data = {
  email: '',
  password: ''
}

const Login = () => {

  const paperStyle = { padding: 20, height: '75vh', width: 320, margin: '0' }
  const avtstyle = { backgroundColor: 'rgb(15 155 66)' }
  const btstyle = { margin: '10px 0', backgroundColor: '#39c06b' }
  const psstyle = { margin: '15px auto' }

  const [user, setUser] = React.useState(data);
  const navigate = useNavigate();


  const handleChange = (event) => {
    const { name, value } = event.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const handleSubmit = () => {
    // validate2();
    console.log(user);
    axios.post(`${baseUrl}/v2/loginUser`, user).then((response) => {
      console.log("Response", response)
      localStorage.setItem('userId', JSON.stringify(response.data.userId));
      localStorage.setItem('cartId', JSON.stringify(response.data.cartId));

      console.log(JSON.parse(localStorage.getItem('userId')));
      console.log(JSON.parse(localStorage.getItem('cartId')));
      alert('Logged in successfully!!');
      navigate('/');
    }).catch(error => {
      if (!error.response) {
        console.log('Error: Network Error');
      } else {
        console.log(error.response);
      }
    })

  }

  return (
    <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avtstyle}><LockIcon /></Avatar>
          <h2>Log In</h2>
        </Grid>

        <TextField
          required
          id="email"
          label="Email id"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
        />
        <small id="email_error" color='red'></small>
        <TextField
          required id="password"
          label="Password"
          type='password'
          name="password"
          value={user.password}
          onChange={handleChange}
          style={psstyle} fullWidth />
        <small id="password_error" color='red'></small>
        <Button variant="contained" type='submit' onClick={handleSubmit} style={btstyle} fullWidth>Log In</Button>
        <Typography> Don't have an account?
          <Link href="/signup">Sign Up</Link>
        </Typography>


      </Paper>
    </Grid>
  )
}
export default Login;