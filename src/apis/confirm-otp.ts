import instance from "~/services/axios-instance";

interface ConfirmOtp {
  statusCode: number;
  message?: string;
}

const confirmOtp = async (account: string, otp: string) => {
  return await instance.post<unknown, ConfirmOtp>("/api/auth/confirm-otp", {
    account,
    otp,
  });
};

export default confirmOtp;
