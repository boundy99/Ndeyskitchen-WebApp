import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used inside AuthContextProvider');
  }
  return context;
}
