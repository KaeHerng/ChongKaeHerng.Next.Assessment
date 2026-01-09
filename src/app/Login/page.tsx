'use client';

import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess } from '@/store/authSlice';
import { useState } from 'react';
import { Login } from '../../api';
import './login.css';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (values: LoginValues) => {
    setIsSubmitting(true);

    try {
      const userLogin = await Login({
        username: 'emilys',
        password: 'emilyspass',
      });

      console.log('userLogin', userLogin)

      if (userLogin.success) {
        setTimeout(() => {
          dispatch(
            loginSuccess({
              user: {
                id: userLogin.data.id,
                username: userLogin.data.username,
                email: userLogin.data.email,
                firstName: userLogin.data.firstName,
                lastName: userLogin.data.lastName,
                gender: userLogin.data.gender,
                image: userLogin.data.image,
                role: 'admin',
              },
              token: userLogin.data.accessToken,
            })
          );
        
          router.replace('/Dashboard');
        }, 600);
      }

    } catch(error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1 className="title text-lg">Admin Panel</h1>
          <p className="subtitle text-base">Sign in to manage your store</p>
        </div>

        <form className="form">
          <TextField
            label="Email"
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type="password"
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 3 }} onClick={handleSubmit(handleLogin)}>
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
