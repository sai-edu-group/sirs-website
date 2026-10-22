// MODULES //
import axios from "axios";

/**
 * Represents one career result row returned by API.
 */
export type CareerResultItemData = {
  id?: number;
  studentName: string;
  studentProfilePic: string;
  percentage: string;
  className?: string;
};

export type CareerSessionData = {
  sessionId: number;
  sessionName: string;
  sessionEndDate: string;
};

export type CareerExamData = {
  name: string;
  slug: string;
  cardImage: string;
};

type CareerResultApiResponse = {
  status: boolean;
  statusCode: number;
  data?:
    | CareerResultItemData[]
    | {
        results?: CareerResultItemData[];
        exam?: {
          sessions?: Array<{
            sessionName: string;
            results?: CareerResultItemData[];
          }>;
        };
      };
};

type CareerSessionsApiResponse = {
  status: boolean;
  statusCode: number;
  data: CareerSessionData[];
};

type CareerExamsApiResponse = {
  status: boolean;
  statusCode: number;
  data:
    | CareerExamData[]
    | {
        exams?: CareerExamData[];
      };
};

const API_URL = import.meta.env.PUBLIC_API_URL;
const REQUEST_TIMEOUT = 8000;

/**
 * Builds a safe API endpoint for career-results routes.
 */
const buildCareerResultsEndpoint = (path: string): string => {
  if (!API_URL || typeof API_URL !== "string") {
    throw new Error("Missing PUBLIC_API_URL environment variable.");
  }

  const normalizedBaseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return `${normalizedBaseUrl}${normalizedPath}`;
};

/**
 * Fetches available career-result sessions for filter options.
 */
export const fetchCareerSessionsRequest = async (): Promise<
  CareerSessionData[]
> => {
  let endpoint = "";

  try {
    endpoint = buildCareerResultsEndpoint("career-results/get-sessions");
  } catch {
    return [];
  }

  try {
    const response = await axios.get<CareerSessionsApiResponse>(endpoint, {
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

/**
 * Fetches available career-result exams (for example: JEE, NEET).
 */
export const fetchCareerExamsRequest = async (): Promise<CareerExamData[]> => {
  let endpoint = "";

  try {
    endpoint = buildCareerResultsEndpoint("career-results/exams");
  } catch {
    return [];
  }

  try {
    const response = await axios.get<CareerExamsApiResponse>(endpoint, {
      headers: { "Content-Type": "application/json" },
      timeout: REQUEST_TIMEOUT,
    });

    const responseData = response.data;
    if (!responseData.status) {
      return [];
    }

    if (Array.isArray(responseData.data)) {
      return responseData.data;
    }

    if (Array.isArray(responseData.data?.exams)) {
      return responseData.data.exams;
    }

    return [];
  } catch {
    return [];
  }
};

/**
 * Fetches career results for a given exam slug (jee/neet) and session.
 *
 * @param exam - Exam slug from route params (for example: "jee", "neet")
 * @param session - Session selected in the filter (for example: "2024-2025")
 * @returns Promise resolving to an array of career result items
 */
export const fetchCareerResultsRequest = async (
  exam: string,
  session: string,
): Promise<CareerResultItemData[]> => {
  const normalizedExam = exam.trim().toLowerCase();
  if (!normalizedExam || !session) {
    return [];
  }

  let endpoint = "";

  try {
    endpoint = buildCareerResultsEndpoint(
      `career-results/${normalizedExam}?session=${encodeURIComponent(session)}`,
    );
  } catch {
    return [];
  }

  try {
    const response = await axios.get<CareerResultApiResponse>(endpoint, {
      headers: { "Content-Type": "application/json" },
      timeout: REQUEST_TIMEOUT,
    });

    const responseData = response.data;

    if (!responseData.status) {
      return [];
    }

    if (Array.isArray(responseData.data)) {
      return responseData.data;
    }

    if (Array.isArray(responseData.data?.results)) {
      return responseData.data.results;
    }

    const allSessionResults = responseData.data?.exam?.sessions;
    if (!Array.isArray(allSessionResults)) {
      return [];
    }

    const selectedSessionResults = allSessionResults.find(
      (sessionItem) => sessionItem.sessionName === session,
    );
    if (Array.isArray(selectedSessionResults?.results)) {
      return selectedSessionResults.results;
    }

    return [];
  } catch {
    return [];
  }
};
