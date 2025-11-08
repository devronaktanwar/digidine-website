'use client';
import Signup from '@/components/signup/Signup';
import Verify from '@/components/signup/Verify';
import { ISignUpFormProps } from '@/types/Customer';
import React, { useState } from 'react';

const page = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ISignUpFormProps>({
    first_name: '',
    last_name: '',
    country_code: 'IN',
    contact_no: '',
    email: '',
    password: '',
  });
  return (
    <div>
      {currentStep === 1 ? (
        <Signup
          setCurrentStep={setCurrentStep}
          formData={formData}
          setFormData={setFormData}
        />
      ) : (
        <Verify formData={formData} />
      )}
    </div>
  );
};

export default page;
