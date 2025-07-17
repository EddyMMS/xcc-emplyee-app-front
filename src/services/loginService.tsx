interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  username: string;
  roles: string[];
  departments: string[];
}

export const loginWithCredentials = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || 'Login failed');
  }

  return response.json();
};
