'use client'
import { Button, Flex, FormLabel, Input, InputGroup, InputRightAddon, Select, SimpleGrid } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { useSelector } from "react-redux";
import { RootState } from "../AppWrappers";
import { AddMoreProduct } from '@/services/operations/productAPI';

interface MedFormData {
    formData: {
        type: string;
        medName: string;
        expMonth: number;
        expYear: number;
        mrp: number;
        wholeSalePrice: number;
        storeName: string;
        rate: number;
        inStock: boolean;
    }[],
}
const AddProductAll = () => {
    const typeOption = [
        "TAB",
        "INJ",
        "SYR",
        "EYED",
        "ONT",
        "LOTN",
        "OTH",
    ]
    const { register, handleSubmit, watch, reset, control } = useForm<MedFormData>({
        defaultValues: {
            formData: [{
                type: "TAB",
                medName: "",
                expMonth: 12,
                expYear: 2025,
                mrp: 0,
                wholeSalePrice: 0,
                storeName: "",
                rate: 1,
                inStock: true,
            }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'formData'
    });
    const [loading, setLoading] = useState(false)
    const { token } = useSelector((state: RootState) => state.auth)

    const onSubmitHandler = async (data: MedFormData) => {
        setLoading(true);
        console.log("data formData",data.formData);
        await AddMoreProduct(token ?? "", data.formData);
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
            <Flex className='flex-col gap-4 bg-white rounded-md lg:w-[50%] md:w-[70%] w-[95%] px-6 py-8'>
                {
                    fields.map((data, index) => {
                        return (
                            <Flex className='flex-col gap-8 bg-white rounded-md w-[100%] px-6 py-4' key={index}>
                                <SimpleGrid minChildWidth="200px" gap={'1rem'}>
                                    <Flex className='flex-col items-start w-full'>
                                        <FormLabel>Med Name</FormLabel>
                                        <div className="flex items-center w-full">
                                            <Select
                                                {...register(`formData.${index}.type`)}
                                                className="p-2 m-0 rounded-l-md border border-black rounded-r-none w-full"
                                
                                            >
                                                {
                                                    typeOption?.map((data, index) =>
                                                        <option key={index} value={data}>{data}</option>
                                                    )
                                                }
                                            </Select>
                                            <span className='px-2'>/</span>
                                            <Input type='string' focusBorderColor='blue.500' borderColor='black' {...register(`formData.${index}.medName`)}  className="p-2 m-0 rounded-l-none border border-black rounded-r-md w-full" />
                                        </div>
                                    </Flex>
                                    <Flex className='flex-col items-start w-full'>
                                        <FormLabel>Exp date</FormLabel>
                                        <div className="flex items-center w-full">
                                            <Input
                                                type="number"
                                                {...register(`formData.${index}.expMonth`)}
                                                placeholder="MM"
                                                min={1}
                                                max={12}
                                                className="p-2 m-0 rounded-l-md border border-black rounded-r-none w-full"
                                
                                            />
                                            <span className='px-2'>/</span>
                                            <Input
                                                type="number"
                                                {...register(`formData.${index}.expYear`)}
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
                                    <Input focusBorderColor='blue.500' borderColor='black' {...register(`formData.${index}.storeName`)} />
                                </Flex>
                                <SimpleGrid minChildWidth="200px" gap={'1rem'}>
                                    <Flex className='flex-col items-start w-full'>
                                        <FormLabel>WholeSale Price</FormLabel>
                                        <Input focusBorderColor='blue.500' borderColor='black' {...register(`formData.${index}.wholeSalePrice`)} />
                                    </Flex>
                                    <Flex className='flex-col items-start w-full'>
                                        <FormLabel>Mrp</FormLabel>
                                        <div className="flex items-center w-full">
                                            <Input focusBorderColor='blue.500' {...register(`formData.${index}.mrp`)} className="p-2 m-0 rounded-l-md border border-black rounded-r-none w-full"
                                 />
                                            <span className='px-2'>/</span>
                                            <InputGroup >
                                                <Input
                                                    type="number"
                                                    {...register(`formData.${index}.rate`)}
                                                    placeholder="Per"
                                                    defaultValue={1}
                                                />
                                                <InputRightAddon>{watch(`formData.${index}.type`, "TAB")}</InputRightAddon>
                                            </InputGroup>
                                        </div>
                                    </Flex>
                                </SimpleGrid>
                                <Flex alignItems={'center'} justifyContent={'end'}>
                                    <Button onClick={() => remove(index)} colorScheme='red'>Remove Variant</Button>
                                </Flex>
                                <hr className='my-2' />
                            </Flex>
                        )
                    })
                }
                <Flex className='justify-center items-center w-full'> <Button colorScheme='yellow' onClick={() =>
                    append({
                        type: "TAB",
                        medName: "",
                        expMonth: 12,
                        expYear: 2025,
                        mrp: 0,
                        wholeSalePrice: 0,
                        storeName: watch(`formData.0.storeName`) ?? "",
                        rate: 1,
                        inStock: true,
                    })
                }>Add More</Button></Flex>
                <Flex width={'full'}><Button className=' w-full' colorScheme='blue' type='submit' >Add Product</Button></Flex>
                </Flex>
            </form>
        </div>
    )
}

export default AddProductAll
