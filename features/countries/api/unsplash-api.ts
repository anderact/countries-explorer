import { useState, useEffect } from "react";

const cache: Record<string, string> = {};
let lastCallTime = 0;
const RATE_LIMIT_DELAY = 1500;

export async function getCountryImage(countryName: string): Promise<string> {
  if (cache[countryName]) {
    return cache[countryName];
  }

  const now = Date.now();
  if (now - lastCallTime < RATE_LIMIT_DELAY) {
    await new Promise((resolve) =>
      setTimeout(resolve, RATE_LIMIT_DELAY - (now - lastCallTime))
    );
  }
  lastCallTime = Date.now();

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${countryName}&orientation=landscape&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Rate limit exceeded");
      }
      throw new Error("Failed to fetch image");
    }

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const imageUrl = data.results[0].urls.regular;
      // Cache the result
      cache[countryName] = imageUrl;
      return imageUrl;
    }
    throw new Error("No images found");
  } catch (error) {
    console.error("Error fetching country image:", error);
    return "https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }
}

export function useCountryImage(countryName: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const url = await getCountryImage(countryName);
        if (isMounted) {
          setImageUrl(url);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("An error occurred"));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [countryName]);

  return { imageUrl, isLoading, error };
}
