
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const registerForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onLoginSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      await login(data);
      navigate('/projects');
    } finally {
      setIsLoading(false);
    }
  };

  const onRegisterSubmit = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      navigate('/projects');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">SyncSaga</CardTitle>
          <CardDescription>Project management and collaboration</CardDescription>
        </CardHeader>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <CardContent className="pt-4">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      {...loginForm.register('email', { required: true })} 
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="login-password" className="text-sm font-medium">Password</label>
                    <Input 
                      id="login-password" 
                      type="password" 
                      {...loginForm.register('password', { required: true })} 
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="register">
            <CardContent className="pt-4">
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="register-name" className="text-sm font-medium">Name</label>
                    <Input 
                      id="register-name" 
                      type="text" 
                      {...registerForm.register('name', { required: true })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="register-email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      {...registerForm.register('email', { required: true })}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="register-password" className="text-sm font-medium">Password</label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      {...registerForm.register('password', { required: true, minLength: 8 })}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create account'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
        <CardFooter className="flex justify-center pb-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SyncSaga. All rights reserved.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
