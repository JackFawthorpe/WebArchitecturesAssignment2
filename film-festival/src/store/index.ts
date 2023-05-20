import {create} from "zustand";

interface AuthenticationState {
    currentUser: LoggedInUser | null;
    login: (user: LoggedInUser) => void;
    logout: () => void;
}

export const authStore = create<AuthenticationState>((set) => ({
    currentUser: null,
    login: (user: LoggedInUser) => set(() => {
        return {currentUser: user}
    }),
    logout: () => set((state) => {
        return {currentUser: null}
    })
}))