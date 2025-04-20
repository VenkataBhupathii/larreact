
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';

export function AuthDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser } = useAuth();
  
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = handleSubmit((data) => {
    if (isLogin) {
      login({ email: data.email, password: data.password });
    } else {
      registerUser(data);
    }
    setIsOpen(false);
    reset();
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Sign In' : 'Create Account'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4 mt-4">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <Input id="name" {...register('name', { required: !isLogin })} />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <Input id="email" type="email" {...register('email', { required: true })} />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <Input id="password" type="password" {...register('password', { required: true })} />
          </div>
          <div className="flex justify-between items-center">
            <Button type="button" variant="link" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account?' : 'Already have an account?'}
            </Button>
            <Button type="submit">{isLogin ? 'Sign In' : 'Create Account'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
