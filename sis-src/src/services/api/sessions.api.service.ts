// MODULES //
import axios from "axios";

const API_URL = import.meta.env.PUBLIC_API_URL;
const REQUEST_TIMEOUT = 8000;

/**
 * Represents one session item returned by sessions API.
 */
export type SessionData = {
  sessionId: number;
  sessionName: string;
  sessionEndDate: string;
};

type SessionsApiResponse = {
  status: boolean;
  statusCode: number;
  data: SessionData[];
};

/**
 * Fetches sessions for a given scope (for example: awards, results).
 *
 * @param scope - Scope name used by sessions API
 * @returns Promise resolving to scope-specific session list
 */
export const fetchSessionsRequest = async (
  scope: string,
): Promise<SessionData[]> => {
  if (!scope || !API_URL) {
    return [];
  }

  const endpoint = `${API_URL}sessions?scope=${encodeURIComponent(scope)}`;

  try {
    const response = await axios.get<SessionsApiResponse>(endpoint, {
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
