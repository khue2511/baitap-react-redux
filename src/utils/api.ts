import axios from 'axios';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axios.post('https://dummyjson.com/auth/login', {
      username: email,
      password,
    });
    return response.data;  // Return the user data with tokens and details
  } catch (error: any) {
    throw error.response ? error.response.data : error.message;  // Handle errors
  }
};
