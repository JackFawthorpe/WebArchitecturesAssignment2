import {create} from "zustand";

interface AuthenticationState {
    currentUser: LoggedInUser | null;
    login: (user: LoggedInUser) => void;
    logout: () => void;
}


const getLocalStorage = (key: string): LoggedInUser | null => JSON.parse(window.localStorage.getItem(key) as string);
const setLocalStorage = (key: string, value: LoggedInUser | null) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create<AuthenticationState>((set) => ({
    currentUser: getLocalStorage('currentUser'),
    login: (user: LoggedInUser) => set(() => {
        setLocalStorage('currentUser', user)
        return {currentUser: user}
    }),
    logout: () => set(() => {
        setLocalStorage('currentUser', null)
        return {currentUser: null}
    })
}))

export const authStore = useStore;