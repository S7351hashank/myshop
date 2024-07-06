const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
// const BASE_URL = "http://localhost:4000/api/v1"

// console.log("baseUrl",BASE_URL);
// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const productEndpoints = {
  ADDONEPRODUCT : BASE_URL + "/product/addoneproduct",
  ADDMOREPRODUCT : BASE_URL + "/product/addallproduct",
  GETALLPRODUCT : BASE_URL + "/product/getallproduct",
  UPDATEPRODUCT : BASE_URL + "/product/updateproduct",
}