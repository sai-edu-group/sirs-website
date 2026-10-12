// MODULES //
import axios from "axios";

// Get default API URL from environment variables
const API_URL = import.meta.env.PUBLIC_API_URL;


// TYPES //
export type AlbumItem = {
  id: number | string;
  title: string;
  thumbnail: string;
  photo_path: string;
};

export type AlbumPhotosItem = {
  id: number | string;
  title: string;
  photo_path: string;
  images: string[];
};

/** Fetch Albums by Year */
export const fetchAlbumsByYearRequest = async (
  year: number,
): Promise<AlbumItem[]> => {
  // Set up the API request configuration
  const config = {
    endpoint: `${API_URL}albums/get-albums?year=${year}`,
    method: "GET" as const,
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
    let albums: AlbumItem[] = [];
    if (Array.isArray(data?.data)) {
      albums = data.data;
    } else if (Array.isArray(data)) {
      albums = data;
    }

    // Return Albums
    return albums;
  } catch (error) {
    console.error("Failed to fetch albums: ", error);
    return [];
  }
};

/** Fetch Album Photos */
export const fetchAlbumPhotosRequest = async (
  albumId: string | number,
): Promise<AlbumPhotosItem | null> => {
  // Set up the API request configuration
  const config = {
    endpoint: `${API_URL}albums/album-photos?album_id=${albumId}`,
    method: "GET" as const,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 8000,
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
    const album = data?.data;

    // Split gallery_photo string into array
    album.images =
      typeof album?.gallery_photo === "string"
        ? album.gallery_photo.split(",")
        : [];

    // Returning AlbumPhotosItem object
    return album;
  } catch (error) {
    console.error("Failed to fetch album photos: ", error);
    return null;
  }
};
