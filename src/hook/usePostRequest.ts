import { useState } from 'react';
import axiosInstance from '../connections/axiosInstance';

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

  const postRequest = async (body: any): Promise<T | null> => {
    setState({ data: null, error: null, loading: true });
    try {
      const response = await axiosInstance.post<T>(endpoint, body);
      setState({ data: response.data, error: null, loading: false });
      return response.data;
    } catch (error: any) {
      setState({
        data: null,
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      return null;
    }
  };

  return {
    ...state,
    postRequest,
  };
};

export default usePostRequest;
