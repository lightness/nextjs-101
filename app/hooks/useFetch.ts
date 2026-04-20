import { useEffect, useState } from 'react';

export function useFetch<T>(url: string, options: RequestInit = {}): { data: T | null; error: string | null; isLoading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {

      try {
        const res = await fetch(url, { ...options, signal: abortController.signal });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const jsonData: T = await res.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => abortController.abort(); 
  }, [url, JSON.stringify(options)]);

  return { data, error, isLoading };
}