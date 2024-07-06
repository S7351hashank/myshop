'use client'
import { Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react'
import { useForm } from "react-hook-form"
import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../AppWrappers";
import { setSignupData } from '@/slices/authSlice';
import { sendOtp } from '@/services/operations/authAPI';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Signup = () => {
    const { register, handleSubmit } = useForm<SignupData>();
    const dispatch: AppDispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const onSubmitHandler = (data: SignupData) => {
        if (data.password !== data.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return;
        }
        dispatch(setSignupData(data))
        dispatch(sendOtp(data.email, router))
    }
    return (
        <div className='flex flex-col items-center gap-6 px-6 py-10'>
            <Text className='font-bold text-2xl'>Signup to your Account</Text>
            {
                loading ? <div className='spinner'></div> :
                    <form className='w-full flex flex-col items-center' onSubmit={handleSubmit(onSubmitHandler)}>
                        <Flex className='flex-col gap-8 bg-white rounded-md lg:w-[50%] md:w-[70%] w-[95%] px-6 py-8'>
                            <Flex className='justify-between items-center gap-4'>
                                <Flex className='flex-col items-start w-full'>
                                    <FormLabel>Firstname</FormLabel>
                                    <Input focusBorderColor='blue.500' borderColor='black' {...register("firstName")} />
                                </Flex>
                                <Flex className='flex-col items-start w-full'>
                                    <FormLabel>Lastname</FormLabel>
                                    <Input focusBorderColor='blue.500' borderColor='black' {...register("lastName")} />
                                </Flex>
                            </Flex>
                            <Flex className='flex-col items-start'>
                                <FormLabel>Email Address</FormLabel>
                                <Input focusBorderColor='blue.500' borderColor='black' {...register("email")} />
                            </Flex>
                            <Flex className='justify-between items-center gap-4'>
                                <Flex className='flex-col items-start w-full'>
                                    <FormLabel>Password</FormLabel>
                                    <Input focusBorderColor='blue.500' borderColor='black' {...register("password")} />
                                </Flex>
                                <Flex className='flex-col items-start w-full'>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <Input focusBorderColor='blue.500' borderColor='black' {...register("confirmPassword")} />
                                </Flex>
                            </Flex>
                            <Flex width={'full'}><Button className=' w-full' colorScheme='blue' type='submit' >Signup</Button></Flex>
                            <Flex className='justify-center items-center'><Link href="/signin">Already have an account? <span className='text-blue-500'>Go to Login</span></Link>
                            </Flex>
                        </Flex>
                    </form>
            }

        </div>
    )
}

export default Signup


