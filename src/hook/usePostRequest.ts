import { useState } from 'react';
import axiosInstance from '../connections/mainApi';

interface PostRequestState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

const usePostRequest = <T,>(endpoint: string) => {
  const [state, setState] = useState<PostRequestState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const postRequest = async (body: any): Promise<{ success: boolean; data?: T }> => {
    setState({ data: null, error: null, loading: true });
    try {
      const response = await axiosInstance.post<T>(endpoint, body);
      setState({ data: response.data, error: null, loading: false });
      return { success: true, data: response.data };
    } catch (error: any) {
      setState({
        data: null,
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      return { success: false };
    }
  };

  return {
    ...state,
    postRequest,
  };
};

export default usePostRequest;
