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
