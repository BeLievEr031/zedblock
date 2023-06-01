import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setIsBulk } from "../../redux/slice/bulkSlice"

interface IActionProp {
    handleBulkMoveToBin: () => void,
    handleBulkComplete: () => void,
    queryData: IQuery,
    setQueryData: React.Dispatch<React.SetStateAction<IQuery>>
}

function Action({
    handleBulkMoveToBin,
    handleBulkComplete,
    queryData,
    setQueryData }: IActionProp) {
    const dispatch = useDispatch();
    const { isBulk } = useSelector((state: RootState) => state.bulkAction)


    return (
        <div className="w-2/3 flex my-4 pl-2 items-end ">
            <div className="w-1/5 ">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Filter</label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setQueryData({
                        ...queryData,
                        ["filter"]: e.target.value
                    })}
                >
                    <option value={"ALL"} selected>ALL</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>

            </div>
            <div className="w-1/5 ml-4">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Sort</label>
                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setQueryData({
                        ...queryData,
                        ["sortType"]: e.target.value
                    })}
                >
                    <option value={"A-Z"} selected>A-Z</option>
                    <option value="Z-A">Z-A</option>
                    <option value="old-new">OLD-NEW</option>
                    <option value="new-old">NEW-OLD</option>
                </select>

            </div>

            <div className="w-1/7 mx-4">
                <button type="button" className={`text-white ${isBulk ? "bg-red-700" : "bg-blue-700"} hover:${isBulk ? "bg-red-800" : "bg-blue-800"} font-medium rounded-lg text-sm px-5 py-2.5`} onClick={() => dispatch(setIsBulk(!isBulk))}>{isBulk ? "Off" : "Active"} Bulk Mode</button>
            </div>

            {isBulk && <React.Fragment><div className="w-1/7 mx-2">
                <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" onClick={handleBulkMoveToBin}>Move To Bin</button>
            </div>
                <div className="w-1/7 mx-2">
                    <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5" onClick={handleBulkComplete}>Complete </button>
                </div></React.Fragment>}
        </div>
    )
}

export default Action