import {create} from "zustand";

interface AuthenticationState {
    currentUser: User | null;
    login: (user: User) => void;
    logout: () => void;
}

export const authStore = create<AuthenticationState>((set) => ({
    currentUser: null,
    login: (user: User) => set(() => {
        return {currentUser: user}
    }),
    logout: () => set((state) => {
        return {currentUser: null}
    })
}))