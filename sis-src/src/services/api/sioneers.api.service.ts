// MODULES //
import axios from "axios";

const API_URL = import.meta.env.PUBLIC_API_URL;
const REQUEST_TIMEOUT = 8000;

export type SioneerItem = {
  id: number;
  admissionNumber: string;
  studentName: string;
  universityName: string;
  profilePicture: string;
  countryName: string;
};

type SioneersApiResponseData = {
  status: boolean;
  statusCode: number;
  data: SioneerItem[];
};

const buildEndpoint = (path: string): string => {
  if (!API_URL || typeof API_URL !== "string") {
    throw new Error("Missing PUBLIC_API_URL environment variable.");
  }

  const base = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${base}${normalizedPath}`;
};

/**
 * Fetches global sioneers for a given academic session.
 *
 * @param session - Academic session name (for example: "2024-2025")
 * @returns Promise resolving to an array of sioneer items
 */
export const fetchSioneersRequest = async (
  session: string,
): Promise<SioneerItem[]> => {
  if (!session) {
    return [];
  }

  let endpoint = "";

  try {
    endpoint = buildEndpoint(
      `sioneers/get-sioneers?session=${encodeURIComponent(session)}`,
    );
  } catch {
    return [];
  }

  try {
    const response = await axios.get<SioneersApiResponseData>(endpoint, {
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
