// Import necessary libraries and components
import React, { FC, useState, useMemo } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  Button,
  Card,
  CardBody,
  InputGroup,
  InputLeftElement,
  Text,
  Spacer,
  TableContainer,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useDisclosure } from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Cartfill from "@/assets/Cart Fill.png"
// Define interfaces for table columns and rows
interface TableColumn {
  key: string;
  label: string;
}

export interface TableRow {
  [key: string]: string | number | boolean | React.ReactNode;
}

interface TableProps {
  data: TableRow[];
  columns: TableColumn[];
}

// Utility function to sort data based on given key and order
const sortData = (
  data: TableRow[],
  sortBy: string,
  sortOrder: "asc" | "desc"
) => {
  return [...data].sort((a, b) => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    // If types are different, fallback to string comparison
    const stringA = String(valueA);
    const stringB = String(valueB);

    return sortOrder === "asc"
      ? stringA.localeCompare(stringB)
      : stringB.localeCompare(stringA);
  });
};

// Utility function to filter data based on visible columns and search term
const filterData = (
  sortedData: TableRow[],
  visibleColumns: string[],
  searchTerm: string,
  columnsArray: TableColumn[]
) => {
  const columns: string[] = columnsArray.map((column) => column.key);
  return sortedData.filter((row) =>
    visibleColumns.some(
      (col) =>
        columns.includes(col) &&
        (col === "id"
          ? String(row[col]) === searchTerm
          : String(row[col]).toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );
};

// Utility function to handle pagination
const paginateData = (
  filteredData: TableRow[],
  currentPage: number,
  rowsPerPage: number
) => {
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  return filteredData
    .slice(indexOfFirstRow, indexOfLastRow)
    .slice(0, rowsPerPage);
};

// EditModal component

// DataTable component
const DataTable: FC<TableProps> = ({
  data,
  columns,
}) => {
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  // Use useDisclosure hook for columns modal
  const {
    isOpen: isColumnsModalOpen,
    onOpen: handleColumnsModalOpen,
    onClose: handleColumnsModalClose,
  } = useDisclosure();

  const handleSort = (key: string) =>
    sortBy === key
      ? setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"))
      : setSortBy(key);

  const handleToggleColumn = (key: string, idx: number) =>
    setVisibleColumns((visibleColumns) =>
      visibleColumns.includes(key)
        ? visibleColumns.filter((col) => col !== key)
        : [...visibleColumns.slice(0, idx), key, ...visibleColumns.slice(idx)]
    );

  const sortedData = useMemo(
    () => sortData(data, sortBy, sortOrder),
    [data, sortBy, sortOrder]
  );
  const filteredData = useMemo(
    () => filterData(sortedData, visibleColumns, searchTerm, columns),
    [sortedData, visibleColumns, searchTerm, columns]
  );
  const totalFilteredPages = useMemo(
    () => Math.ceil(filteredData.length / rowsPerPage),
    [filteredData, rowsPerPage]
  );
  const totalPages = useMemo(
    () => Math.ceil(data.length / rowsPerPage),
    [data, rowsPerPage]
  );
  const currentRows = useMemo(
    () => paginateData(filteredData, currentPage, rowsPerPage),
    [filteredData, currentPage, rowsPerPage]
  );

  return (
    <div className="p-8">
      <Card borderRadius="md" border="1px" className=" w-800 border-stroke">
        <CardBody>
          <Flex direction={{ base: "column", md: "row" }}>
            <Flex alignItems={'center'} gap={'3px'}>
              <Text fontSize={'xl'} fontWeight={'bold'} className="text-typography">My Med</Text>
            </Flex>
            <Spacer />
            <Flex gap={2}>
              <Box marginTop={{ base: 4, md: 0 }}>
                <Modal
                  isOpen={isColumnsModalOpen}
                  onClose={handleColumnsModalClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Select Columns</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Flex direction="column">
                        {columns.map((column, idx) => (
                          <Checkbox
                            key={column.key}
                            isChecked={visibleColumns.includes(column.key)}
                            onChange={() => handleToggleColumn(column.key, idx)}
                          >
                            {column.label}
                          </Checkbox>
                        ))}
                      </Flex>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </Flex>
          </Flex>
          <TableContainer borderRadius={'md'} marginTop={5} overflowX="auto">
            <Table>
              <Thead cursor="pointer" color={"#555F6F"}>
                <Tr className={"bg-bg"}>
                  {columns.map(
                    (column) =>
                      visibleColumns.includes(column.key) && (
                        <Th
                          key={column.key}
                          onClick={() => handleSort(column.key)}
                        >
                          {column.label}{" "}
                          {sortBy === column.key &&
                            (sortOrder === "asc" ? "▲" : "▼")}
                        </Th>
                      )
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {currentRows.map((row, index) => (
                  <Tr key={index} _hover={{ bg: "#F4F7FC" }} position={'relative'} >
                    {visibleColumns.map(
                      (column,index2) =>
                        visibleColumns.includes(column) && (
                          <Td key={`${column}-${index}`}>{
                            index2 !== visibleColumns.length - 1?

                            row[column]
                            :
                            <>
                            
                              {row[column] === true  &&  (<Button className="bg-green-200 text-green-700" rounded={'full'} width={'120px'}>Yes</Button>)}

                              {row[column] === false  &&  (<Button className="bg-red-200 text-red-700" rounded={'full'} width={'120px'}>No</Button>)}

                              </>
                            
                            }</Td>
                        )
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>

          {/* Pagination controls */}
          <Flex justify="center" alignItems="center" marginTop={4}>
            <Button
              isDisabled={currentPage === 1}
              onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
              marginRight={2}
              borderWidth={'1.5px'}
              className="border-stroke bg-button text-button1text rounded-full"
            >
              <IoIosArrowBack/>
            </Button>
            {Array.from({ length: Math.min(totalFilteredPages, 3) }, (_, i) => {
              const startPage = Math.max(1, currentPage - 1);
              const pageToShow = i + startPage;
              return (
                pageToShow <= totalPages && (
                  pageToShow === currentPage ? (
                  <Button
                    key={pageToShow}
                    onClick={() => setCurrentPage(pageToShow)}
                    marginRight={2}
                    borderWidth={'1.5px'}
                    className="border-stroke bg-button text-button1text rounded-full"
                  >
                    {pageToShow}
                  </Button>
                ):(
                  <Button
                    key={pageToShow}
                    onClick={() => setCurrentPage(pageToShow)}
                    marginRight={2}
                    className=" bg-button text-button1text"
                  >
                    {pageToShow}
                  </Button>
                )
              ))
            })}
            <Button
              isDisabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              className="border-stroke bg-button text-button1text rounded-full"
              borderWidth={'1.5px'}
            >
              <IoIosArrowForward />
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </div>
  );
};

export default DataTable;
