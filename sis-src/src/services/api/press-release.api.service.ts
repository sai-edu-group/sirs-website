// MODULES //
import axios from "axios";

//  Get default API URL from environment variables  //
const API_URL = import.meta.env.PUBLIC_API_URL;

export type PressReleaseItem = {
  id?: number | string;
  title: string;
  date: string;
  link?: string;
  thumbnail?: string;
  image?: string;
};

export type PressReleasesResponse = {
  totalCount: number;
  pressReleases: PressReleaseItem[];
};

/** Fetch Press Releases from API with optional year and page */
export const fetchPressReleasesRequest = async (
  year: string | number,
  page: number = 1,
): Promise<PressReleasesResponse> => {
  const params = new URLSearchParams();
  params.append("year", String(year));
  params.append("page", String(page));

  const config = {
    endpoint: `${API_URL}press-releases/get-press-releases?${params.toString()}`,
    method: "GET" as const,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 8000,
  };

  try {
    const response = await axios({
      url: config.endpoint,
      method: config.method,
      headers: config.headers,
      timeout: config.timeout,
    });

    const data = response.data;

    // Response shape (as provided): { status, statusCode, data: { totalCount, pressReleases }, message, error }
    const totalCount: number = Number(data?.data?.totalCount) || 0;
    const pressReleases: PressReleaseItem[] = Array.isArray(
      data?.data?.pressReleases,
    )
      ? data.data.pressReleases
      : Array.isArray(data?.pressReleases)
        ? data.pressReleases
        : [];

    return {
      totalCount,
      pressReleases,
    };
  } catch (error) {
    console.error("Failed to fetch press releases:", error);
    return {
      totalCount: 0,
      pressReleases: [],
    };
  }
};
