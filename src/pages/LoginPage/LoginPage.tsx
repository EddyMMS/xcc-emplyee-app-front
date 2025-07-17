import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Paper, Typography, Divider } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';
import GitHubIcon from "@mui/icons-material/GitHub"
import { useDispatch } from 'react-redux';
import { redirectToGithub, getGithubOAuthUrl } from '../../services/OauthService'
import { loginSuccess } from '../../features/auth/authSlice';
import { loginWithCredentials } from '../../services/loginService';

const StyledPaper = styled(Paper)`
  padding: 2rem;
  max-width: 400px;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledGithubButton = styled(Button)`
   background-color: #24292e;
   color: white;
   text-transform: none;
   font-weight: 500;
   &:hover {
       background-color: #1b1f23;
       }
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  if (username && password) {
    try {
      const response = await loginWithCredentials({ username, password });

      dispatch(loginSuccess({
        token: response.token,
        username: response.username,
        roles: response.roles,
        departments: response.departments,
      }));

      navigate('/');

    } catch (err) {
      console.error('Login failed:', err);
    }
  }
};

  const githubOAuthUrl = getGithubOAuthUrl();

  const handleGithubOAuthButton = () => {
      window.location.href = githubOAuthUrl;
      }


  return (
    <Container>
      <StyledPaper elevation={3}>
        <Typography variant="h5" align="center">Login</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Login
        </Button>

        <Divider>or</Divider>

        <StyledGithubButton
        variant="contained"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={handleGithubOAuthButton}
        >
        Sign in with Github!
        </StyledGithubButton>
      </StyledPaper>
    </Container>
  );
};

export default LoginPage;