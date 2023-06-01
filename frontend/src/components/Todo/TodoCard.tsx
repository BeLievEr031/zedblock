import React from 'react'
import { createTodo, editTodo } from '../../https/apis';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ITodoCardProp {
    title: string,
    todo: ITodo
}

function TodoCard({ title, todo }: ITodoCardProp) {
    const navigate = useNavigate();
    const [currTodo, setCurrTodo] = React.useState<ITodo>({
        ...todo
    });

    const handleAddNew = async () => {
        try {
            const res = await createTodo(currTodo)
            console.log(res);
            if (res.status === 200) {
                navigate("/home")
                return toast.success("Todo created.")
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        try {
            const id = todo._id!;
            delete currTodo._id;
            const res = await editTodo(id, "edit", currTodo)
            console.log(res);
            if (res.status === 200) {
                navigate("/home")
                return toast.success("Todo updated")
            }


        } catch (error) {

            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)

            }
            console.error(error);

        }
    }
    
    return (
        <div className="w-full max-w-lg">
            <h1 className='mb-8 text-3xl'>{title} TODO</h1>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Title
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="title" type="text" name='title'
                        value={currTodo.title}

                        onChange={(e) => setCurrTodo({
                            ...currTodo,
                            [e.target.name]: e.target.value
                        })}
                    />
                </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                        Description
                    </label>
                    <textarea
                        className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                        name='description'
                        id="description"
                        value={currTodo.description}
                        onChange={(e) => setCurrTodo({
                            ...currTodo,
                            [e.target.name]: e.target.value
                        })}
                    ></textarea>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3">
                    <button
                        className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                        type="button"
                        onClick={() => title === "ADD" ? handleAddNew() : handleUpdate()}
                    >
                        {title === "ADD" ? "ADD" : "UPDATE"}
                    </button>
                </div>
                <div className="md:w-2/3"></div>
            </div>
        </div>
    )
}

export default TodoCard