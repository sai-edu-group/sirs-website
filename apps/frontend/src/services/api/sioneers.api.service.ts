// MODULES //
import axios from "axios";

const API_URL = import.meta.env.PUBLIC_API_URL;
const REQUEST_TIMEOUT = 8000;

/**
 * Represents one sioneer item returned by sioneers API.
 */
export type SioneerItem = {
  id: number;
  admissionNumber: string;
  studentName: string;
  universityName: string;
  profilePicture: string;
  countryName: string;
};

type SioneersApiResponse = {
  status: boolean;
  statusCode: number;
  data: SioneerItem[];
};

/**
 * Fetches sioneers for a given session (year).
 *
 * @param session - Session name used by sioneers API
 * @returns Promise resolving to sioneer list
 */
export const fetchSioneersRequest = async (
  session: string,
): Promise<SioneerItem[]> => {
  if (!session || !API_URL) {
    return [];
  }

  const endpoint = `${API_URL}sioneers/get-sioneers?session=${encodeURIComponent(session)}`;

  try {
    const response = await axios.get<SioneersApiResponse>(endpoint, {
      headers: { "Content-Type": "application/json" },
      timeout: REQUEST_TIMEOUT,
    });

    const responseData = response.data;
    if (responseData.status && Array.isArray(responseData.data)) {
      return responseData.data;
    }

    return [];
  } catch {
    return [];
  }
};
