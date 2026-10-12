// MODULES //
import axios from "axios";
import type { AxiosRequestConfig } from "axios";

/** LeadSquared Lead Capture API Call (proxied through /api/admission) */
export const admissionEnquiryRequest = async (leadData: any) => {
  try {
    const config: AxiosRequestConfig = {
      method: "post",
      url: `/api/admission`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(leadData), // must be array of { Attribute, Value }
    };

    const response = await axios.request(config);

    return response.data;
  } catch (error: any) {
    console.error("LeadSquared API Error:", error.response?.data || error);
    return { status: false, message: error.message };
  }
};

//  Get default API URL from environment variables  //
const API_URL = import.meta.env.PUBLIC_API_URL;

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
