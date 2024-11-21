import { loginStart, loginSuccess, loginFailure } from './authSlice';
import { loginUser } from '../utils/api';
import { Dispatch } from 'redux';

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(loginStart());  // Dispatch the start action to show loading

  try {
    const data = await loginUser(email, password);  // Call the API to log in
    dispatch(loginSuccess(data));  // Dispatch success with the full user data, including tokens
  } catch (error: any) {
    dispatch(loginFailure(error));  // Dispatch failure with the error message
  }
};
