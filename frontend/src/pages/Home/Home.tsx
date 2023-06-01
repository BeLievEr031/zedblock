import React, { useState, useEffect } from "react"
import Navbar from "../../components/Navbar/Navbar"
import TitleCard from "../../components/Todo/TitleCard";
import Action from "../../components/ActionButton/Action";
import { bulkAction, getAllTodo } from "../../https/apis";
import { useDebounce } from 'use-debounce';
import axios from "axios";
import { toast } from "react-hot-toast";
function Home() {

    // const [isBulk, setIsBulk] = useState<boolean>(false)
    const [todoDataArr, setTodoDataArr] = useState<ITodo[]>([])
    const [count, setCount] = useState<number>(0)
    const [text, setText] = useState('');
    const [value] = useDebounce(text, 1000);
    const [bulkIdArr, setBulkIdArr] = useState<string[]>([])
    const [queryData, setQueryData] = useState<IQuery>({
        page: 1,
        sortType: "A-Z",
        limit: 10,
        filter: "ALL"
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}&keyword=${value}`
                const res = await getAllTodo(query)
                if (res.status === 200) {
                    setCount(res.data.count)
                    setTodoDataArr(res.data.data)
                }

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [queryData, value])

    const handleBulkMoveToBin = async () => {
        try {
            let data: IBulk = {
                ids: bulkIdArr,
                action: "bin"
            }
            const res = await bulkAction(data)
            if (res.status === 200) {
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}`
                const res = await getAllTodo(query)
                if (res.status === 200) {
                    setTodoDataArr(res.data.data)
                }
                return toast.success("Bulk Bin.")
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }

            console.log(error);

        }
    }

    const handleBulkComplete = async () => {
        try {
            let data: IBulk = {
                ids: bulkIdArr,
                action: "completed"
            }
            const res = await bulkAction(data)
            if (res.status === 200) {
                return toast.success("Bulk completed.")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }
    }

    const handlePrev = () => {
        if (queryData.page === 1) {
            return toast.error("You are on first Page");
        }

        setQueryData({
            ...queryData,
            page: queryData.page - 1,
        });
    };

    const handleNext = () => {
        if (queryData.page < Math.ceil(count / queryData.limit)) {
            setQueryData({
                ...queryData,
                page: queryData.page + 1,
            });
        } else {
            toast.error("No more Todo");
        }
    };
    return (
        <React.Fragment>
            <Navbar active="home" setText={setText} />
            <Action handleBulkMoveToBin={handleBulkMoveToBin} handleBulkComplete={handleBulkComplete} queryData={queryData} setQueryData={setQueryData} />
            <div className="flex flex-wrap">
                {
                    todoDataArr.map((item: ITodo) => {
                        return <TitleCard todo={item} page="HOME" queryData={queryData} setTodoDataArr={setTodoDataArr} setBulkIdArr={setBulkIdArr} bulkIdArr={bulkIdArr} />
                    })
                }


            </div>
            <div className="absolute right-2 bottom-2">
                <div className="flex flex-col items-center">

                    <div className="inline-flex mt-2 xs:mt-0">
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={handlePrev}
                        >
                            Prev
                        </button>
                        <div className="flex w-10 h-10 justify-center items-center">
                            {queryData.page}
                        </div>
                        <button
                            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home