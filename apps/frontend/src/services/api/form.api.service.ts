// MODULES //
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

//  Get default API URL from environment variables  //
const API_URL = import.meta.env.PUBLIC_API_URL;

/** Newsletter Subscription Request */
export const subscribeNewsLetterRequest = async (data: { email: string }) => {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${API_URL}newsletter/subscribe`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.error("Newsletter API error:", error);
    return { status: false, message: error.message };
  }
};

/** Contact Enquiry Request */
export const contactEnquiryRequest = async (data: any) => {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${API_URL}contacts`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.error("API error:", error);
    return { status: false, message: error.message };
  }
};

/** Admission Enquiry Request */
export const admissionEnquiryRequest = async (data: any) => {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `${API_URL}admission-enquiry`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    const response = await axios.request(config);
    return response.data;
  } catch (error: any) {
    console.error("Admission API error:", error);
    return {
      Status: "Error",
      ExceptionMessage: error.message,
    };
  }
};
