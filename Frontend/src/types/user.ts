export interface User {
  id: string;
<<<<<<< HEAD:src/types/user.ts
  userName: string;
=======
  fullName: string;
>>>>>>> origin/main:Frontend/src/types/user.ts
  email: string;
  dob: string; // date of birth
  phone: string;
  address?: string; // Dấu ? vì address có thể không bắt buộc
<<<<<<< HEAD:src/types/user.ts
  role: 'manager' | 'staff' | ''; 
}

export interface SignupFormData extends User {
=======
  //role: 'manager' | 'staff' | ''; 
}

export interface SignupFormData {
  fullName: string;
  email: string;
  dob: string; // date of birth
  phone: string;
  address?: string;
>>>>>>> origin/main:Frontend/src/types/user.ts
  password: string;
  confirmPassword: string;
}

export interface SignInFormData {
  email: string;
  password: string;
}
<<<<<<< HEAD:src/types/user.ts
=======

export interface forgotpasswordFormData {
  email: string;
}

export interface verifyOtpFormData {
  email: string | null;
  otp: string;
}

export interface resetPasswordFormData {
  resetPassToken: string| null;
  newPass: string;
  confirmNewPass: string ;
}

export interface refreshFormData {
  refreshToken: string;
  accessToken: string;
}
>>>>>>> origin/main:Frontend/src/types/user.ts
