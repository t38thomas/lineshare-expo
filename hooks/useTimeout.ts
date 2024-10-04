import { useEffect } from "react";

export default function useTimeout(callback: () => void, delay: number = 500, deps: React.DependencyList) {

    useEffect(() => {
        const timeout = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(timeout);
    }, deps)

}