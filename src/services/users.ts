import axios from "axios";

interface LoginResponse {
  token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await axios.post<LoginResponse>(
    "https://reqres.in/api/login",
    { email, password },
    {
      headers: { "x-api-key": "reqres-free-v1" },
      withCredentials: false,
    }
  );

  return data;
}