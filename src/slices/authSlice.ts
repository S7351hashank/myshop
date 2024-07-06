import { createSlice ,PayloadAction} from "@reduxjs/toolkit";

interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthState {
    signupData: SignupData | null;
    loading: boolean;
    token:string | null;
}

const getInitialToken = (): string | null => {
    if (typeof window !== "undefined" && window.localStorage) {
        return localStorage.getItem("token");
    }
    return null;
};
const initialState: AuthState = {
    signupData: null,
    loading: false,// for delay changing and signin,signup,sendotp,login... on the page of auth
    token: getInitialToken(),
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setSignupData(state, action: PayloadAction<SignupData>) {
            state.signupData = action.payload;
        },
        setLoading(state, action:PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.setItem("token", state.token ?? '');
            }
        },
    }
})

export const { setLoading, setSignupData, setToken } = authSlice.actions;
export default authSlice.reducer;