'use client';
import { useSelector } from "react-redux";
import { RootState } from "@/app/AppWrappers";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const WithAuth =<P extends object>(WrappedComponent: React.ComponentType<P>):React.FC<P> => {
    const Wrapper: React.FC<P> = (props) =>{
    const router = useRouter();

    const { token } = useSelector((state: RootState) => state.auth) 
    useEffect(()=>{
        if(!token){
            router.replace('/signin');
        }
    },[router])

    return <WrappedComponent {...props} />
  }
  return Wrapper;
}

export default WithAuth
