import axios from "axios";

export type StudentResultData = {
  studentName: string;
  studentProfilePic: string;
  percentage: string;
  className: string;
};

type ApiResponseData = {
  status: boolean;
  statusCode: number;
  data: StudentResultData[];
};

/**
 * Fetches student result data for a given academic year and class.
 *
 * @param year - Academic year for which results are required
 * @param classId - Class identifier used to filter results
 * @returns Promise resolving to an array of student result items
 */
export const fetchResultsRequest = async (
  year: number | string,
  classId: string,
): Promise<StudentResultData[]> => {
  // Construct API endpoint using public base URL and query parameters
  const endpoint = `${import.meta.env.PUBLIC_API_URL}results/get-results?year=${year}&classId=${classId}`;

  try {
    // Perform GET request to fetch results data
    const response = await axios.get<ApiResponseData>(endpoint, {
      headers: { "Content-Type": "application/json" },
      timeout: 8000,
    });

    // Extract API response payload
    const resData = response.data;

    if (resData.status && Array.isArray(resData.data)) {
      return resData.data;
    }
    return [];
  } catch (error) {
    console.error(`Failed to fetch results: ${endpoint}`, error);
    return [];
  }
};
