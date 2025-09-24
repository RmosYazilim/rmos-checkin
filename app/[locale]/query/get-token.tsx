import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export function useGetToken() {
  return useQuery({
    queryKey: ['getToken'],
    queryFn: async () => {
      const response = await axios.get('/api/createJwt');
      return response.data;
    },
    enabled: true,
  });
}
