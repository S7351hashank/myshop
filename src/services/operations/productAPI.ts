import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { productEndpoints } from "../apis"

const {
    ADDONEPRODUCT,
    ADDMOREPRODUCT,
    GETALLPRODUCT,
    UPDATEPRODUCT,
} = productEndpoints;

export const GetAllProducts = async (token: string) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        
        const response = await apiConnector("GET", GETALLPRODUCT, { token }, {
            Authorization: `Bearer ${token}`,
        }, null);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        result = response?.data?.data

    }
    catch (error: any) {
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const AddOneProduct = async (token: string,data:any) => {
    const toastId = toast.loading("Loading...")
    try {

        const response = await apiConnector("POST", ADDONEPRODUCT, { token , ...data }, {
            Authorization: `Bearer ${token}`,
        }, null);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Product Details Added Successfully")

    }
    catch (error: any) {
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

export const AddMoreProduct = async (token: string,data:any) => {
    const toastId = toast.loading("Loading...")
    try {

        const response = await apiConnector("POST", ADDMOREPRODUCT, data, {
            Authorization: `Bearer ${token}`,
        }, null);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("All Product Details Added Successfully")

    }
    catch (error: any) {
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

export const UpdateProduct = async (token: string,userId:any,data:any) => {
    const toastId = toast.loading("Loading...")
    try {

        const response = await apiConnector("POST", UPDATEPRODUCT, {...data,userId,token}, {
            Authorization: `Bearer ${token}`,
        }, null);

        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("All Product Details Added Successfully")

    }
    catch (error: any) {
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}