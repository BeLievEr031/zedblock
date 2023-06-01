import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { deleteTodo, editTodo, getAllTodo } from '../../https/apis'
interface ITitleCardProp {
    todo: ITodo,
    page: "HOME" | "BIN",
    queryData: IQuery,
    bulkIdArr?: string[],
    setTodoDataArr?: React.Dispatch<React.SetStateAction<ITodo[]>>,
    setBulkIdArr?: React.Dispatch<React.SetStateAction<string[]>>
    setBinArr?: React.Dispatch<React.SetStateAction<ITodo[]>>
}

function TitleCard({ todo, page, queryData, setTodoDataArr, bulkIdArr, setBinArr }: ITitleCardProp) {
    const [isSelected, setSelected] = React.useState(false)
    const [checked, setChecked] = React.useState(todo.status === "DONE" ? true : false)
    const navigate = useNavigate();
    const { isBulk } = useSelector((state: RootState) => state.bulkAction)

    React.useEffect(() => {
        setSelected(false)
    }, [isBulk])


    const handlePermanentDelete = async (event: React.MouseEvent<HTMLElement>, id: string) => {
        try {
            event.stopPropagation()
            const res = await deleteTodo(id)

            if (res.status === 200) {
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}`
                const resTodo = await getAllTodo(query)
                if (resTodo.status === 200) {
                    if (setBinArr) {
                        setBinArr([...resTodo.data.data])
                    }
                }
                return toast.success("Todo deleted permanently")
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }
    }

    const handleRestore = async (event: React.MouseEvent<HTMLElement>, id: string) => {
        try {
            event.stopPropagation()

            const res = await editTodo(id, "incomplete")

            if (res.status === 200) {
                const query = `page=${queryData.page}&sortType=${queryData.sortType}&limit=${queryData.limit}&filter=${queryData.filter}`
                const resTodo = await getAllTodo(query)
                if (resTodo.status === 200) {
                    if (setBinArr) {
                        setBinArr([...resTodo.data.data])
                    }
                }
                return toast.success("Todo item restored.")

            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }

    }



    return (
        <div className={`w-60 h-24 p-2  shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${isSelected ? "bg-green-300" : "bg-transparent"} rounded-md relative m-8`}
            onClick={(e) => {
                if (isBulk) {
                    setSelected(!isSelected)
                    if (bulkIdArr?.includes(todo._id!)) {
                        const idx = bulkIdArr?.findIndex((item) => {
                            return item === todo._id!
                        })
                        return bulkIdArr.splice(idx, 1)
                    }
                    bulkIdArr?.push(todo._id!)

                } else {
                    navigate("/detail", { state: { id: todo._id, title: todo.title, description: todo.description, status: todo.status } })
                }
            }}
        >
            <p className='text-xl'>{todo.title} </p>
            {
                page === "BIN" &&
                <div className='absolute right-1 bottom-0  flex items-center'>
                    <span className="material-symbols-outlined mr-2 w-5 h-5 mb-2 cursor-pointer"
                        onClick={(event) => handleRestore(event, todo._id!)}
                    >
                        refresh
                    </span>
                    <span className="material-symbols-outlined mr-2 w-5 h-5 mb-2 cursor-pointer"
                        onClick={(event) => handlePermanentDelete(event, todo._id!)}
                    >
                        delete_forever
                    </span>
                </div>
            }
        </div>
    )
}

export default React.memo(TitleCard)