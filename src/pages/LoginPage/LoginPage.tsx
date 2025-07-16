import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Paper, Typography, Divider } from '@mui/material';
import styled from 'styled-components';
import { useState } from 'react';
import GitHubIcon from "@mui/icons-material/GitHub"
import { redirectToGithub, getGithubOAuthUrl } from '../../services/authService'

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      navigate('/');
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
          label="E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleLogin}
          disabled={!email || !password}
        >
          Login
        </Button>

        <Divider>oder</Divider>

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