import { toast } from "react-hot-toast"

import { setLoading, setToken } from "@/slices/authSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../apis"
import Cookies from "js-cookie"

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints

export function sendOtp(email: any, router: any) {
  return async (dispatch:any) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      },null,null)
      // console.log("SENDOTP API RESPONSE............", response)

      // console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      router.push("/verifyemail")
    } catch (error) {
      // console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function signUp(
  firstName: any,
  lastName: any,
  email: any,
  password: any,
  confirmPassword: any,
  otp: any,
  router: any
) {
  return async (dispatch: any) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
      },null,null)

      // console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      router.push("/signin")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      router.push("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function login(email: any, password: any, router: any) {
  return async (dispatch: any) => {
    const toastId = toast.loading("Loading...")
    // const cookies = new Cookies();
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      },null,null)
      
      console.log("LOGIN API RESPONSE............", response)
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const data = await Cookies.set("token",response.data.token,{
        // expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        expires: 7,
      });

      console.log("data cookie ",data);
      toast.success("Login Successful")
      router.push("/");
      dispatch(setToken(response.data.token))
      localStorage.setItem("token", response.data.token)
    } 
    catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(router: any) {
  return (dispatch: any) => {
    dispatch(setToken(null))
    localStorage.removeItem("token")
    toast.success("Logged Out")
    router.push("/")
  }
}



export function getPasswordResetToken(email: any, setEmailSent: (arg0: boolean) => void) {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email, },null,null)

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch (error) {
      // console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Failed to send email for resetting password");
    }
    dispatch(setLoading(false));
  }
}

export function resetPassword(password: any, confirmPassword: any, token: any) {
  return async (dispatch: any) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token },null,null);

      // console.log("RESET Password RESPONSE ... ", response);


      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
    }
    catch (error) {
      // console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable to reset password");
    }
    dispatch(setLoading(false));
  }
}