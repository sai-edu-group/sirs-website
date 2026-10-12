// MODULES //
import axios from "axios";

const API_URL = import.meta.env.PUBLIC_API_URL;
const REQUEST_TIMEOUT = 8000;

export type StudentCouncilData = {
  id: string;
  admissionNumber: string;
  studentName: string;
  designation: string;
  className: string;
  studentProfilePic: string;
};

type StudentCouncilApiResponse = {
  status: boolean;
  statusCode: number;
  data: StudentCouncilData[];
};

/**
 * Fetches student council members for a given academic session.
 *
 * @param session - Academic session name (for example: "2024-2025")
 * @returns Promise resolving to an array of student council members
 */
export const fetchStudentsBySessionRequest = async (
  session: string,
): Promise<StudentCouncilData[]> => {
  if (!session || !API_URL) {
    return [];
  }

  const endpoint = `${API_URL}student-council/by-session?session=${encodeURIComponent(session)}`;

  try {
    const response = await axios.get<StudentCouncilApiResponse>(endpoint, {
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
