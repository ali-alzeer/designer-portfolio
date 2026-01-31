import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts various YouTube link formats to a valid YouTube embed URL.
 *
 * @param urlString The input YouTube URL string.
 * @returns The embed URL string, or null if the input is invalid or a non-YouTube URL.
 */
export function convertToEmbedUrl(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    let videoId: string | null = null;

    // Handle standard "watch" URL format (e.g., https://www.youtube.com)
    if (url.hostname.includes("youtube.com") && url.pathname === "/watch") {
      videoId = url.searchParams.get("v");
    }

    // Handle short URL format (e.g., https://youtu.be)
    if (url.hostname === "youtu.be") {
      videoId = url.pathname.substring(1); // Remove the leading '/'
    }

    // Handle embed URL format (e.g., if already an embed link)
    if (
      url.hostname.includes("youtube.com") &&
      url.pathname.startsWith("/embed/")
    ) {
      videoId = url.pathname.split("/")[2];
    }

    // Handle specific mobile/shorts URLs (less common but good to handle)
    if (
      url.hostname.includes("youtube.com") &&
      url.pathname.startsWith("/shorts/")
    ) {
      videoId = url.pathname.split("/")[2];
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (error) {
    // URL constructor throws an error for invalid URLs
    console.error("Invalid URL provided:", error);
  }

  return null; // Return null if unable to parse a valid video ID
}

// --- Example Usage ---

const standardUrl = "https://www.youtube.com";
const shortUrl = "https://youtu.be";
const alreadyEmbedUrl = "https://www.youtube.com";
const invalidUrl = "https://www.google.com";

console.log(`Standard URL: ${convertToEmbedUrl(standardUrl)}`);
console.log(`Short URL: ${convertToEmbedUrl(shortUrl)}`);
console.log(`Already Embed URL: ${convertToEmbedUrl(alreadyEmbedUrl)}`);
console.log(`Invalid URL: ${convertToEmbedUrl(invalidUrl)}`);
