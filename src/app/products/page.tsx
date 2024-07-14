'use client'
import DataTablewithoutEdit from '@/components/Tables/DataTablewithoutEdit';
import { GetAllProducts } from '@/services/operations/productAPI';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../AppWrappers";
const Products = () => {
      const [data,setData] = useState([]);
      const [loading, setLoading] = useState(false)
      const columns = [
        { key: 'type', label: 'Type' },
        { key: 'medName', label: 'MedName' },
        { key: 'wholeSalePrice', label: 'Whs Price' },
        { key: 'expDate', label: 'ExpDate' },
        { key: 'storeName', label: 'Store' },
        { key: 'mrp', label: 'MRP' },
        { key: 'rate', label: 'Per' },
        { key: 'inStock', label: 'isAvailable' },// it must be last indexed
      ];

      const { token } = useSelector((state: RootState) => state.auth)
      useEffect(()=>{
        // console.log("hii");
        ;(async () =>{
          setLoading(true);
          // console.log("hii2");
          const result = await GetAllProducts(token ?? '');
          console.log("result",result);
          if(result){
            setData(result?.map((prod: any)=>({
              type:prod.type,
              medName:prod.medName,
              wholeSalePrice:`Rs${prod.wholeSalePrice}`,
              expDate:`${prod.expMonth}/${prod.expYear}`,
              storeName:prod.storeName,
              mrp:`Rs${prod.mrp}`,
              rate:prod.rate,
              inStock:prod.inStock,
            })));
          }
          setLoading(false);
        })();
      },[])
      
  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  return (
    <div>
      {
        data.length !==0 &&  <DataTablewithoutEdit data={data} columns={columns}  />
      }
     
    </div>
  )
}

export default Products


