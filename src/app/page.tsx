'use client'
import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function Home() {
  return (
    <div>
      <Flex className="items-center flex-col justify-center gap-4 bg-white p-4 rounded-sm m-8">
        <Link href={'/products'} className="font-semibold text-lg gap-2 text-green-500 flex items-center">All Medicines<MdArrowOutward /></Link>
        <Link href={'/addProductOne'} className="font-semibold text-lg gap-2 text-green-500 flex items-center">Add Medicine <MdArrowOutward /></Link>
        <Link href={'/addProductMore'} className="font-semibold text-lg gap-2 text-green-500 flex items-center">Add MultiMed <MdArrowOutward /></Link>
      </Flex>
    </div>
  );
}
