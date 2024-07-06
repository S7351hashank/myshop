'use client'
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "@/services/operations/authAPI";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "../AppWrappers";
import { Button } from "@chakra-ui/react";


function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state:RootState) => state.auth);
  const dispatch : AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      router.push("/signup");
    }
  }, []);

  const handleVerifyAndSignup = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (signupData) {
        dispatch(
          signUp(
            signupData.firstName,
            signupData.lastName,
            signupData.email,
            signupData.password,
            signupData.confirmPassword,
            otp,
            router
          )
        );
      }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 bg-white">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleVerifyAndSignup}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-2 border-black rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-blue-500"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <Button
              type="submit"
              colorScheme="blue"
              className="w-full py-[12px] px-[12px] rounded-[8px] mt-6 font-medium "
            >
              Verify Email
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link href="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </Link>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData?.email ?? '',router))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;