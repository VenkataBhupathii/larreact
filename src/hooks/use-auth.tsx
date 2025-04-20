
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: user, isLoading: isUserLoading, error } = useQuery({
    queryKey: ['auth-user'],
    queryFn: async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) return null;
        
        const response = await authService.getUser();
        return response.data?.data || null;
      } catch (error) {
        localStorage.removeItem('auth_token');
        return null;
      }
    },
    retry: false,
  });

  useEffect(() => {
    setIsLoading(isUserLoading);
  }, [isUserLoading]);

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await authService.login(credentials.email, credentials.password);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.setQueryData(['auth-user'], data.user);
      toast({
        title: "Success",
        description: "Successfully logged in!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to login",
      });
      throw error;
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: { name: string; email: string; password: string }) => {
      const response = await authService.register(userData.name, userData.email, userData.password);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('auth_token', data.token);
      queryClient.setQueryData(['auth-user'], data.user);
      toast({
        title: "Success",
        description: "Successfully registered!",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to register",
      });
      throw error;
    }
  });

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('auth_token');
      queryClient.setQueryData(['auth-user'], null);
      queryClient.invalidateQueries({ queryKey: ['auth-user'] });
      toast({
        title: "Success",
        description: "Successfully logged out!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout",
      });
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
