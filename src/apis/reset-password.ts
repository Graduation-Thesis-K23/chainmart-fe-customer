import instance from "~/apis/axios-instance";

interface ResetPassword {
  statusCode: number;
  message?: string;
}

const resetPassword = async (account: string) => {
  return await instance.post<unknown, ResetPassword>(
    "/api/auth/reset-password",
    {
      account,
    }
  );
};

export default resetPassword;
