import axios from "axios";
import { toast } from "react-hot-toast"; // Importing toast

export const handleApiError = (error: unknown): void => {
  console.log("error", error);
  if (axios.isAxiosError(error)) {
    // Axios-specific error handling
    const errorName = error.response?.data?.name;
    const message = error.response?.data?.message || error.message;

    if (errorName === "ValidationError") {
      error.response?.data?.errors.forEach((error: any) => {
        toast.error(error.message);
      });
    } else {
      // Show error message using React Hot Toast
      toast.error(message); // Show the error message in the toast
    }
  } else {
    // Unexpected error handling
    console.error("Unexpected Error:", error);
    toast.error("An unexpected error occurred. Please try again.");
  }
};
