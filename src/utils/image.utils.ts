// ENUMS //
import { IMAGE_TYPES } from "@/enums/image.enum";

const IMAGE_BASE_URL = "https://saicloudschool.in/myerp";

/**
 * Generates a full URL for an image based on its path, filename, and type.
 *
 * @param {string} path - The relative folder path of the image (e.g., "2025/12/22/2").
 * @param {string} imageName - The image filename (e.g., "UNWIND 2025 (5).jpg").
 * @param {string} [imageType] - Optional type of image to determine the base folder.
 *                               If not provided, the path is used as-is.
 * @returns {string} The full URL to the image.
 *
 * @example
 * generateImagePath("2025/12/22/2", "UNWIND 2025 (5).jpg", "gallery");
 * // "https://saicloudschool.in/myerp/uploads/gallery/2025/12/22/2/UNWIND%202025%20(5).jpg"
 */
export const generateImagePath = (
  imageName: string,
  imageType: IMAGE_TYPES, // "gallery", "result", "student", etc.
  path?: string,
): string => {
  // If Image Name not available then return empty string
  if (!imageName) return "";

  let finalPath = "";

  // Handling different image types dynamically
  switch (imageType.toLowerCase()) {
    // CAREER RESULT
    case IMAGE_TYPES.CAREER_RESULT:
      finalPath = `uploads/sis_careerresult/${imageName}`;
      break;
    // RESULT
    case IMAGE_TYPES.RESULT:
      finalPath = `uploads/sis_cbseresult/${imageName}`;
      break;
    // STUDENT COUNCIL
    case IMAGE_TYPES.STUDENT_COUNCIL:
      finalPath = `uploads/sis_studentcouncil/${imageName}`;
      break;
    // NEWS (BLOGS)
    case IMAGE_TYPES.BLOG:
      finalPath = `${path}${imageName}`;
      break;
    // AWARDS
    case IMAGE_TYPES.AWARDS:
      finalPath = `uploads/sis_awards/${imageName}`;
      break;
    // GLOBAL SIONEERS
    case IMAGE_TYPES.GLOBAL_SIONEERS:
      finalPath = `uploads/sis_globalambassador/${imageName}`;
      break;
    // PRESS RELEASE
    case IMAGE_TYPES.PRESS_RELEASE:
      finalPath = `uploads/sis_press/${imageName}`;
      break;
    // PRESS RELEASE
    case IMAGE_TYPES.GALLERY:
      finalPath = `${path}${imageName}`;
      break;
    // Add more cases as needed
    default:
      break;
  }

  // Returning full URL
  return `${IMAGE_BASE_URL}/${finalPath}`;
};
