export type ApiResponse<T> = {
  message: string;
  data: T;
  error: string;
  token: string;
};

export type Login = {
  email: string;
  password: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  role: string;
};
