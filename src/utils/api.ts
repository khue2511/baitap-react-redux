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
  } catch (error: unknown) {  // Use 'unknown' instead of 'any' for type safety
    if (error instanceof Error) {
      throw new Error(error.message);  // Handle generic error messages
    } else {
      throw new Error("An unknown error occurred during login.");
    }
  }
};
