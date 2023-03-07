import axios from "./auth-axios";

export interface SignUpPayload {
  username: string;
  password: string;
  name: string;
  email: string;
}

const signUp = async (payload: SignUpPayload): Promise<boolean> => {
  const response: { access_token: string } = await axios.post(
    "/api/auth/sign-up",
    payload
  );

  return response.access_token ? true : false;
};

export default signUp;
