'use client'
import { Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Select, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from "react-redux";
import { RootState } from "../AppWrappers";
import { AddOneProduct } from '@/services/operations/productAPI';


interface MedFormData {
    type: string;
    medName: string;
    expMonth: number;
    expYear: number;
    mrp: number;
    wholeSalePrice: number;
    storeName: string;
    rate: number;
    inStock: boolean;
}
const AddProductOne = () => {
    const typeOption = [
        "TAB",
        "INJ",
        "SYR",
        "EYED",
        "ONT",
        "LOTN",
        "OTH",
    ]
    const { register, handleSubmit, watch ,reset} = useForm<MedFormData>({defaultValues: {
        type: "TAB",
        medName: "",
        expMonth: 12,
        expYear: 2025,
        mrp: 0,
        wholeSalePrice: 0,
        storeName: "",
        rate: 1,
        inStock: true,
    }});
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state: RootState) => state.auth)

    const onSubmitHandler = async (data: MedFormData) => {
        setLoading(true);
        await AddOneProduct(token ?? "",data);
        reset();
        setLoading(false);
    }
    if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
    return (
        <div>
            <form className='w-full flex flex-col items-center p-6' onSubmit={handleSubmit(onSubmitHandler)}>
                <Flex className='flex-col gap-8 bg-white rounded-md lg:w-[50%] md:w-[70%] w-[95%] px-6 py-8'>
                    <SimpleGrid minChildWidth="200px" gap={'1rem'}>
                        <Flex className='flex-col items-start w-full'>
                            <FormLabel>Med Name</FormLabel>
                            <div className="flex items-center w-full">
                                <Select
                                    {...register("type")}
                                    className="p-2 m-0 rounded-l-md border border-black rounded-r-none w-full"
                                >
                                    {
                                        typeOption?.map((data, index) =>
                                            <option key={index} value={data}>{data}</option>
                                        )
                                    }
                                </Select>
                                <span className='px-2'>/</span>
                                <Input type='string' focusBorderColor='blue.500' borderColor='black' {...register("medName")} className="p-2 m-0 rounded-l-none border border-black rounded-r-md w-full" />
                            </div>
                        </Flex>
                        <Flex className='flex-col items-start w-full'>
                            <FormLabel>Exp date</FormLabel>
                            <div className="flex items-center w-full">
                                <Input
                                    type="number"
                                    {...register("expMonth")}
                                    placeholder="MM"
                                    min={1}
                                    max={12}
                                    className="p-2 m-0 rounded-l-md border border-black rounded-r-none w-full"
                                />
                                <span className='px-2'>/</span>
                                <Input
                                    type="number"
                                    {...register("expYear")}
                                    placeholder="YYYY"
                                    min={1900}
                                    max={2100}
                                    className="p-2 m-0 rounded-l-none border border-black rounded-r-md w-full"
                                />
                            </div>
                        </Flex>
                    </SimpleGrid>
                    <Flex className='flex-col items-start'>
                        <FormLabel>Store Name</FormLabel>
                        <Input focusBorderColor='blue.500' borderColor='black' {...register("storeName")} />
                    </Flex>
                    <SimpleGrid minChildWidth="200px" gap={'1rem'}>
                        <Flex className='flex-col items-start w-full'>
                            <FormLabel>WholeSale Price</FormLabel>
                            <Input focusBorderColor='blue.500' borderColor='black' {...register("wholeSalePrice")} />
                        </Flex>
                        <Flex className='flex-col items-start w-full'>
                            <FormLabel>Mrp</FormLabel>
                            <div className="month-year-input">
                                <Input focusBorderColor='blue.500' {...register("mrp")} className="p-2 m-0 rounded-l-md border border-black rounded-r-none" />
                                <span className='px-2'>/</span>
                                <InputGroup >
                                    <Input
                                        type="number"
                                        {...register("rate")}
                                        placeholder="Per"
                                        // defaultValue={1} 
                                    />
                                    <InputRightAddon>{watch("type", "TAB")}</InputRightAddon>
                                </InputGroup>
                            </div>
                        </Flex>
                    </SimpleGrid>
                    <Flex width={'full'}><Button className=' w-full' colorScheme='blue' type='submit' >Add Product</Button></Flex>
                </Flex>
            </form>
        </div>
    )
}

export default AddProductOne

