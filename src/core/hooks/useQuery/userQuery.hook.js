import { useEffect, useState } from 'react';

// Todo:  Need to install @react-testing-lib/react-hooks for testing customHooks
const useQuery = (url, fetchFunc) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (url && fetchFunc) {
            setIsLoading(true);
            fetch()
        }
    }, [url, fetchFunc])

    const fetch = async () => {
        try {
            const res = await fetchFunc(url);
            setData(res);
            setIsLoading(false);
        } catch (error) {
            setError(error)
            setIsLoading(false);
        }

    }
    return {
        isLoading,
        data,
        error
    }
}

export default useQuery;
