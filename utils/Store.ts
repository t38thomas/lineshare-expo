
import { User } from "@/types/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type StoreKeys = "@User"

class StoreUser {
    public async set(value: User) {
        await Store.set<User>("@User", value);
    }

    public async get() {
        return await Store.get<User>("@User");
    }

    public async clear() {
        await Store.clear("@User");
    }
}

export class Store {

    public static User = new StoreUser();

    public static async set<T>(key: StoreKeys, value: T) {
        console.log("sto scrivendo nello storage")
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }

    public static async get<T>(key: StoreKeys): Promise<T | undefined> {
        const response = await AsyncStorage.getItem(key);
        if (response !== null) {
            return JSON.parse(response) as T;
        }
        return undefined;
    }

    public static async clear(key: StoreKeys) {
        await AsyncStorage.removeItem(key);
    }

}

