import axios from "axios";

const instant = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

instant.interceptors.response.use(
  (data) => {
    if (data.status === 201) {
      const response = data.data;
      document.cookie = `access_token=${response.access_token}`;

      return response;
    }
    return data.data;
  },
  (error) => {
    return error.response.data;
  }
);

export default instant;
