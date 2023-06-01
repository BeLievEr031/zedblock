import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import TodoCard from '../../components/Todo/TodoCard';

function Edit() {
    const { state } = useLocation();
    console.log(state);
    
    return (
        <React.Fragment>
            <Navbar />
            <div className='w-full pt-16 flex justify-center'>
                <TodoCard title='EDIT' todo={state} />
            </div>
        </React.Fragment>
    )
}

export default Edit