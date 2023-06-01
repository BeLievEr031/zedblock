import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-hot-toast';
import { getAllTodo } from '../../https/apis';
import TitleCard from '../../components/Todo/TitleCard';

function Bin() {
    const [binArr, setBinArr] = React.useState<ITodo[]>([])
    const [text, setText] = React.useState('');
    const [value] = useDebounce(text, 1000);
    const [queryData, setQueryData] = React.useState<IQuery>({
        page: 1,
        sortType: "A-Z",
        limit: 20,
        filter: "BIN"
    })

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}&keyword=${value}`
                const res = await getAllTodo(query)
                console.log(res);
                if (res.status === 200) {
                    setBinArr(res.data.data)
                }

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    return toast.error(error.response?.data.message)
                }
                console.log(error);
            }
        }

        fetchData();
    }, [value])

    return (
        <React.Fragment>
            <Navbar active='bin' setText={setText} />
            {/* <Action handleBulkMoveToBin={handleBulkMoveToBin} handleBulkDelete={handleBulkDelete} /> */}
            <div className="flex flex-wrap">
                {
                    binArr.map((item: ITodo) => {
                        return <TitleCard todo={item} page='BIN' queryData={queryData} setBinArr={setBinArr} />
                    })
                }


            </div>
        </React.Fragment>
    )
}

export default Bin