import { User } from "@/types/User";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

interface UserContextProps {
    user: User | undefined
    setUser: Dispatch<SetStateAction<User | undefined>>
}


const userContext: UserContextProps = {
    setUser: () => undefined,
    user: undefined
}

export const UserContext = createContext(userContext);

export default function UserContextProvider(props: PropsWithChildren) {

    const [user, setUser] = useState<User>();

    return (
        <UserContext.Provider
            value={{
                setUser: setUser,
                user: user
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}