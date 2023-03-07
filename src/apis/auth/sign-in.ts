import axios from "./auth-axios";

export interface SignInPayload {
  username: string;
  password: string;
}

const signIn = async (payload: SignInPayload): Promise<boolean> => {
  const response: { access_token: string } = await axios.post(
    "/api/auth/sign-in",
    payload
  );

  return response.access_token ? true : false;
};

export default signIn;
