'use client';
import React, { FC, useState, ChangeEvent, FormEvent } from 'react';
import countries from '../../lib/countries.json';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomerApis } from '@/apis/Customer';
import { toast } from 'sonner';
import { ISignUpFormProps } from '@/types/Customer';

interface ISignUpProps {
  setCurrentStep: (val: number) => void;
  setFormData: React.Dispatch<React.SetStateAction<ISignUpFormProps>>;
  formData: ISignUpFormProps;
}

const Signup: FC<ISignUpProps> = ({
  setCurrentStep,
  setFormData,
  formData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (field: keyof ISignUpFormProps, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await CustomerApis.registerUser(formData);
      if (response.isSuccess) {
        toast.success('OTP sent successfully', {
          description: 'Please check your email to proceed.',
        });
        setCurrentStep(2);
      } else {
        toast.error('Unexpected Error', {
          description:
            'Something went wrong on our end. Please try again shortly.',
        });
      }
    } catch (err) {
      console.log('Error:', err);
      toast.error('Unexpected Error', {
        description:
          'Something went wrong on our end. Please try again shortly.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-default px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('first_name', e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('last_name', e.target.value)
                  }
                  required
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <div className="flex gap-2">
                <Select
                  value={formData.country_code}
                  onValueChange={(value: string) =>
                    handleInputChange('country_code', value)
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Code" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Mobile number"
                  value={formData.contact_no}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('contact_no', e.target.value)
                  }
                  className="flex-1"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('email', e.target.value)
                }
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange('password', e.target.value)
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600 font-medium">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
