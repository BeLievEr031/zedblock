import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { editTodo } from '../../https/apis';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Detail() {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { id, title, description, status } = state;


    const [checked, setChecked] = React.useState<boolean>(status === "DONE" ? true : false)

    const handleToAddBin = async () => {
        try {
            console.log(id);

            const res = await editTodo(id, "bin")
            console.log(res);

            if (res.status === 200) {
                navigate("/home")
                return toast.success("Todo Added to the bin.")
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }
    }

    const handleComplete = async () => {
        try {
            const res = await editTodo(id, !checked ? "complete" : "incomplete")
            if (res.status === 200) {
                !checked ? toast.success("Todo Completed.") : toast.success("Todo Active.")
                return;
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return toast.error(error.response?.data.message)
            }
            console.log(error);
        }
    }

    
    return (
        <React.Fragment>
            <Navbar />
            <div className='w-full pt-8 flex justify-center'>
                <div className="w-full max-w-lg">
                    <h1 className='mb-8 text-3xl'>Details Of TODO</h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Title
                            </label>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="title" type="text" name='title'
                                value={title}
                                readOnly
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
                                value={description}
                                readOnly
                            ></textarea>
                        </div>
                    </div>
                    <div className="md:flex md:items-center">

                        <div className="">
                            <input type="checkbox" className='mx-2 w-10 h-10'
                                checked={checked}
                                onChange={() => {
                                    handleComplete()

                                    setChecked(!checked)
                                }}
                            />
                        </div>

                        <div className="ml-4">
                            <button
                                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => { navigate("/edit", { state: { _id: id, title, description, status } }) }}
                            >
                                EDIT
                            </button>
                        </div>
                        <div className="ml-4">
                            <button
                                className="shadow bg-teal-400 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                                type="button"
                                onClick={() => { handleToAddBin() }}
                            >
                                MOVE TO BIN
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Detail