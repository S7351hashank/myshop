'use client'
import { login } from '@/services/operations/authAPI';
import { Button, Flex, FormLabel, Input, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../AppWrappers";
import Link from 'next/link';

interface LoginFormData {
    email: string;
    password: string;
}

const Signin = () => {
    const { register, handleSubmit } = useForm<LoginFormData>();
    const dispatch: AppDispatch = useDispatch();
    const { loading } = useSelector((state: RootState) => state.auth);
    const router = useRouter();
    const SubmitHandler = (data: LoginFormData) => {
        dispatch(login(data.email, data.password, router))
    }
    return (
        <div className='flex flex-col items-center gap-6 px-6 py-10 '>
            <Text className='font-bold text-2xl'>Signin to your Account</Text>
            {loading ? <div className='spinner'></div> :
                <form className='w-full flex flex-col items-center' onSubmit={handleSubmit(SubmitHandler)}>
                    <Flex className='flex-col gap-8 bg-white rounded-md lg:w-[50%] md:w-[70%] w-[95%] px-6 py-8'>
                        <Flex className='flex-col items-start'>
                            <FormLabel>Email Address</FormLabel>
                            <Input focusBorderColor='blue.500' borderColor='black' {...register("email")} />
                        </Flex>
                        <Flex className='flex-col items-start'>
                            <FormLabel>Password</FormLabel>
                            <Input focusBorderColor='blue.500' borderColor='black' {...register("password")} />
                        </Flex>
                        <Flex className='items-end justify-end'>
                            <Link href="/forgotPassword">
                                <Text className='text-blue-500 font-semibold cursor-pointer'>Forgot Password?</Text>
                            </Link>
                        </Flex>
                        <Flex width={'full'}><Button className=' w-full' colorScheme='blue' type="submit">Login</Button></Flex>
                        <Flex className='justify-center items-center'><Link href="/signup">Not have an account? <span className='text-blue-500'>Go to signup</span></Link>
                        </Flex>
                    </Flex>
                </form>}
        </div>
    )
}

export default Signin
