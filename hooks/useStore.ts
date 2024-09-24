import { useCallback, useEffect, useState } from "react";
import { Store, StoreKeys } from "../utils/Store";
import { User } from "@/types/User";

/**
 * @example
 * const [user, setUser] = useStore<User>("@User");
 */
export function useStore<T>(key: StoreKeys): [T | undefined | null, (value: T | undefined) => void] {

    const [value, setValue] = useState<T | undefined | null>(null);

    useEffect(() => {
        Store.get<T>(key).then(setValue);
    }, [])

    const set = useCallback((value: T | undefined) => {
        if (value) Store.set(key, value);
        else Store.clear(key);

        setValue(value);
    }, [])

    return [value, set];

}

const [user, setUser] = useStore<User>("@User");