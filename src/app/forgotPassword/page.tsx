'use client'
import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { RootState, AppDispatch } from "../AppWrappers";

import { getPasswordResetToken } from "@/services/operations/authAPI"
import { Button, FormLabel, Input } from "@chakra-ui/react"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch: AppDispatch = useDispatch();
  const { loading } = useSelector((state:RootState) => state.auth)

  const handleOnSubmit = (e:any) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center ">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8 bg-white rounded-md">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="mt-4 mb-8 text-[1rem] leading-[1rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <FormLabel>
                  Email Address <sup className="text-pink-200">*</sup>
                </FormLabel>
                <Input type="email" name="email" borderColor={'black'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email address" />
                  
              </label>
            )}
            <Button
              type="submit"
              colorScheme="blue"
              className="mt-6 w-full rounded-[8px] py-[12px] px-[12px] font-medium "
            >
              {!emailSent ? "Sumbit" : "Resend Email"}
            </Button>
          </form>
          <div className="mt-6 flex items-center justify-between font-semibold text-blue-500">
            <Link href="/signin">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword