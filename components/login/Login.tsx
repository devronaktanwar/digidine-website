"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: mobile input, 2: OTP
  const [formData, setFormData] = useState({ mobileNo: "" });
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (step === 1) {
        // Call your backend to send OTP here
        // const response = await apiClient.post("/send-otp", { mobileNo: formData.mobileNo });
        const response = { data: { isSuccess: true } }; // mock

        if (response.data.isSuccess) {
          toast.success("OTP sent successfully", {
            position: "top-right",
            description: "Please enter the OTP to continue",
          });
          setStep(2);
        } else {
          toast.error("Failed to send OTP", {
            position: "top-right",
          });
        }
      } else {
        // Submit OTP verification here
        // const verifyRes = await apiClient.post("/verify-otp", { mobileNo: formData.mobileNo, otp });
        const verifyRes = { data: { isSuccess: true } }; // mock

        if (verifyRes.data.isSuccess) {
          toast.success("Signed in successfully", {
            position: "top-right",
            description: "Redirecting to home page...",
          });
          setTimeout(() => {
            router.push("/scan");
          }, 4000);
        } else {
          toast.error("Invalid OTP", {
            position: "top-right",
          });
        }
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg w-full h-fit !pt-0 overflow-hidden rounded-none sm:rounded-xl border-0 shadow-none sm:border sm:shadow">
      <Image
        src="/login-banner.webp"
        alt="login-banner"
        width={500}
        height={500}
        className="w-full"
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {step === 1 && (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {`India's #1 Dining App`}
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Label className="text-sm">Enter phone number</Label>
                <Input
                  type="text"
                  className="text-sm font-medium"
                  onChange={(e) =>
                    setFormData({ ...formData, mobileNo: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                {`India's #1 Dining App`}
              </CardTitle>
              <CardDescription className="text-center">
                Enter the OTP sent to your mobile number
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={otp}
                onChange={setOtp}
                size={24}
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </CardContent>
          </>
        )}

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full p-6" disabled={loading}>
            {loading ? "Please wait..." : "Continue"}
          </Button>
          <p className="text-xs text-center font-medium text-gray-500">
            By continuing you agree to our terms and conditions
          </p>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
