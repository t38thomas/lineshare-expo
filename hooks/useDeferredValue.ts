import { useEffect, useState } from "react";

export default function useDeferredValue<T>(value: T, delay:number = 500){

    const [timeoutedValue, setTimeoutedValue] = useState<T>();

    useEffect(() => {
        const timeout = setTimeout(() => setTimeoutedValue(value), delay);
        return () => clearTimeout(timeout);
    }, [value, delay])
    
    return timeoutedValue;
}