import { useEffect, useState } from "react";

interface StrapiDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useStrapiData<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [state, setState] = useState<StrapiDataState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch((error: Error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
