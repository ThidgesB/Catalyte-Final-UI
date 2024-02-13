import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch data from a URL.
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} - The fetched data, loading state, and any error encountered.
 */
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch((fetchError) => {
        setError(fetchError.message);
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
