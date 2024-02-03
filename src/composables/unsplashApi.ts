const unsplashApiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

interface UnsplashApiResponse {
  urls: {
    regular: string;
  };
  // Add other properties if needed
}

const fetchUnsplashImage = async (query: string): Promise<string> => {
  try {
    const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashApiKey}`);
    const data: UnsplashApiResponse = await response.json() as any;

    return data.urls.regular;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return '';
  }
};

export { fetchUnsplashImage };
