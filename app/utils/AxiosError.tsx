import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    console.error("Request:", error.request);
  } else {
    console.error("Message:", error.message);
  }
};
