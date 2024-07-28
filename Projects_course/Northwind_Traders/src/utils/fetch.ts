import axios from 'axios';
import { ApiResponse } from '../types/api';


export async function fetchData<T>(endpoint: string) {
  try {
    const response = await axios.get<ApiResponse<T>>(
      `https://northwindtraders-sparkling-dawn-9488.fly.dev${endpoint}`
    );

    const data = response.data;

    // console.log('API Response:', data);


	return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data);
      throw new Error(error.response?.data?.message || error.message);
    }
    console.error('Unexpected error:', error);
    throw error;
  }
}
