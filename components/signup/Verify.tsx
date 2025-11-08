'use client';

import React, { FC, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CustomerApis } from '@/apis/Customer';
import { toast } from 'sonner';
import { ISignUpFormProps } from '@/types/Customer';
import { useRouter } from 'next/navigation';

const OTP_LENGTH = 5;

const Verify: FC<IVerifyProps> = ({ formData }) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('Text').slice(0, OTP_LENGTH);
    const newOtp = pasteData.split('').filter((_, idx) => idx < OTP_LENGTH);
    setOtp((prev) => {
      const filled = [...prev];
      newOtp.forEach((char, idx) => (filled[idx] = char));
      return filled;
    });
    inputRefs.current[newOtp.length - 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await CustomerApis.verifyOtp({
        ...formData,
        user_otp: parseInt(otp.join(''), 10),
      });
      if (response.isSuccess) {
        toast.success('Signed up successfully', {
          description: 'Redirecting to dashboard ....',
        });
        setTimeout(() => {
          router.push('/dashboard/analytics');
        }, 2000);
      } else {
        toast.error('Invalid OTP', {
          description: 'The one-time password you entered is incorrect.',
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
            Verify OTP
          </CardTitle>
          <CardDescription className="text-center">
            Enter the OTP sent to your number
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el!;
                }}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength={1}
                className="w-12 h-12 text-center text-xl"
                type="text"
              />
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </Button>
            <div className="text-center text-sm font-medium hover:text-primary cursor-pointer">
              Resend OTP
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
interface IVerifyProps {
  formData: ISignUpFormProps;
}
