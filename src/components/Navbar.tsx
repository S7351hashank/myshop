'use client'
import React, { useEffect } from "react";
import { useState } from "react";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { IoReorderThreeSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";
const Navbar = ({active, setactive}:{active:string, setactive:any}) => {
    const pathname = usePathname()
    const [toggle, settoggle] = useState(true);
    
    useEffect(()=>{
        setactive(pathname.substring(1,));
    })
    return (
        <div className="flex flex-row justify-between w-full lg:px-20 lg:py-7 p-5 items-center relative text-2xl md:text-xl bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] z-1000">
            <Link href={"/"} className="flex lg:flex-row flex-col items-center justify-center gap-1" onClick={
                        () => {
                            setactive("");
                        }
                    }>
                <div className="flex items-center justify-center gap-2">
                    Hii!
                </div>
            </Link>
            <div className="md:flex gap-4 hidden">
                <Link href={"/"}
                    onClick={
                        () => {
                            setactive("");
                        }
                    }
                    className={`${active === "" ? "text-cyan-400" : "text-black"}`}>Home</Link>
                <Link href={"/products"} onClick={() => {
                    setactive("products");
                }} className={`${active === "products" ? "text-cyan-400" : "text-black"}`}>Medicines</Link>
                <Link href={"/addProductOne"} onClick={() => {
                    setactive("addProductOne");
                }} className={`${active === "addProductOne" ? "text-cyan-400" : "text-black"}`}>Add Medicine</Link>
                <Link href={"/addProductMore"} onClick={() => {
                    setactive("addProductMore");
                }} className={`${active === "addProductMore" ? "text-cyan-400" : "text-black"}`}>Add MultiMed</Link>
            </div>
            <div className="md:hidden ">
                {/* <img src={toggle?menu:close} alt="menu" onClick={toggleChanger}/> */}
                {
                    toggle ?
                        <div onClick={()=>{settoggle(!toggle)}}><IoReorderThreeSharp className="text-4xl mr-2" /></div>
                        :
                        <div onClick={()=>{settoggle(!toggle)}}> <ImCross className="text-xl mr-3" /></div>

                }
                <div className={`${toggle ? "hidden" : "flex"} p-6 absolute flex-col top-[100px] right-5 left-20 my-2 min-w-[140px] z-10 rounded-xl bg-slate-500`}>
                    <Link href={"/"} onClick={() => {
                        setactive("");
                        settoggle(!toggle);
                    }} className={`${active === "" ? "text-cyan-400" : "text-black"}`}>ABOUT ME</Link>
                    <Link href={"/products"} onClick={() => {
                        setactive("products");
                        settoggle(!toggle);
                    }} className={`${active === "products" ? "text-cyan-400" : "text-black"}`}>Medicines</Link>
                    <Link href={"/addProductOne"} onClick={() => {
                        setactive("addProductOne");
                        settoggle(!toggle);
                    }} className={`${active === "addProductOne" ? "text-cyan-400" : "text-black"}`}>Add Medicine</Link>
                    <Link href={"/addProductMore"} onClick={() => {
                        setactive("addProductMore");
                        settoggle(!toggle);
                    }} className={`${active === "addProductMore" ? "text-cyan-400" : "text-black"}`}>Add MultiMed</Link>

                </div>
            </div>
        </div>
    );
}

export default Navbar;
