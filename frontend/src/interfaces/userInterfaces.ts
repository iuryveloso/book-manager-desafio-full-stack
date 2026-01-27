export interface User {
  name: string;
  email: string;
  avatar?: string;
}

export interface Credentials {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export interface UserState {
  user: User;
  credentials: Credentials;
  showPasswords: {
    current_password: boolean;
    password: boolean;
    password_confirmation: boolean;
  };
  showRegisterForm: boolean;
}

export interface UserAction extends UserState {
  type:
    | "setUser"
    | "setCredentials"
    | "setShowPasswords"
    | "setShowRegisterForm"
    | "resetPasswords"
    | "resetUser";
}

export interface Unauthenticated {
  message: string;
  error: string;
  statusCode: number;
}
