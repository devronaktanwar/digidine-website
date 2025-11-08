'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CustomerApis } from '@/apis/Customer';
import { useSessionStore } from '@/store/customerStore';

export default function Login() {
  const { session, fetchSession } = useSessionStore();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await CustomerApis.loginUser(
      formData.email,
      formData.password
    );
    if (response.isSuccess) {
      toast.success('Login successful', {
        description: 'You’ve been logged in successfully',
      });
      await fetchSession();
    } else {
      toast.error(response.err, {
        description: 'The email or password you entered is incorrect.',
      });
    }
    setLoading(false);
  };

  console.log({ session });
  return (
    <div className="flex min-h-screen items-center justify-center bg-default px-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Signing...' : 'Sign In'}
            </Button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-gray-600 font-medium hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-4 border-t">
            <p className="font-medium text-sm text-gray-600">
              Not a user?{' '}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Create an account
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
interface LoginFormData {
  email: string;
  password: string;
}
