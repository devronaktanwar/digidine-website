export interface ISignUpFormProps {
  first_name: string;
  last_name: string;
  country_code: string;
  contact_no: string;
  profile_url?: string;
  email: string;
  password: string;
}
export interface IVerifyOtpProps extends ISignUpFormProps {
  user_otp: number;
}
