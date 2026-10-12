// MODULES //
import axios from "axios";

// Get default API URL from environment variables
const API_URL = import.meta.env.PUBLIC_API_URL;

export type NewsByYearResponseData = {
  blogs: NewsItemData[];
  total_count: number;
};

export type NewsItemData = {
  id: number | string;
  title: string;
  details: string;
  thumbnail: string;
  banner: string;
  photo_path: string;
  photos: string[];
  created_on: string;
  category_name: string;
};

/** Fetch Blogs by Year with Pagination */
export const fetchBlogsByYearRequest = async (
  year: number,
  pageNumber: number = 1,
  limit: number = 10,
): Promise<NewsByYearResponseData> => {
  // Set up the API request configuration
  const config = {
    endpoint: `${API_URL}blogs/by-year?year=${year}&page=${pageNumber}&limit=${limit}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 8000, // 8 seconds timeout
  };

  // Make the API call
  try {
    const response = await axios({
      url: config.endpoint,
      method: config.method,
      headers: config.headers,
      timeout: config.timeout,
    });

    // Puck the Data from the response
    const data = response.data;
    // Ensure data is an array, handling possible variations
    let blogs: NewsItemData[] = [];
    let total_count = 0;
    if (data?.data) {
      if (Array.isArray(data.data.blogs)) {
        blogs = data.data.blogs;
      }
      if (typeof data.data.total_count === "number") {
        total_count = data.data.total_count;
      }
    }

    // Return Blogs
    return { blogs, total_count };
  } catch (error) {
    console.error("Failed to fetch news items by year: ", error);
    return { blogs: [], total_count: 0 };
  }
};

/** Fetch Blog by id */
export const fetchBlogByIdRequest = async (
  id: number | string,
): Promise<NewsItemData | null> => {
  // Set up the API request configuration
  const config = {
    endpoint: `${API_URL}blogs/by-id?id=${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 8000, // 8 seconds timeout
  };

  //   Make the API call
  try {
    const response = await axios({
      url: config.endpoint,
      method: config.method,
      headers: config.headers,
      timeout: config.timeout,
    });

    const blogItem = response.data?.data;

    if (!blogItem) return null;

    return blogItem;
  } catch (error) {
    console.error("Failed to fetch news by id: ", error);
    return null;
  }
};

/** Fetch Latest Blogs */
export const fetchlatestBlogsRequest = async (): Promise<
  NewsItemData[] | null
> => {
  // Set up the API request configuration
  const config = {
    endpoint: `${API_URL}blogs/get-latest`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 8000, // 8 seconds timeout
  };

  //   Make the API call
  try {
    const response = await axios({
      url: config.endpoint,
      method: config.method,
      headers: config.headers,
      timeout: config.timeout,
    });

    const blogItems = response.data?.data;

    if (!blogItems) return null;

    return [...blogItems];
  } catch (error) {
    console.error("Failed to fetch news by id: ", error);
    return null;
  }
};
