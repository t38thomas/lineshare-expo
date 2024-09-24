import { IconNames } from "@/Components/Generali/Icon";
import { useMemo } from "react";

export default function useTabName(onFocused: IconNames, notFocused: IconNames, focused?: boolean) {

    const out = useMemo(() => {
        if (focused) return onFocused;
        else return notFocused;
    }, [focused])

    return out;
}