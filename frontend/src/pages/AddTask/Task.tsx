import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TodoCard from '../../components/Todo/TodoCard'

function Task() {
    const [todo, setTodo] = React.useState<ITodo>({
        title: ""
        , description: ""
    })
    return (
        <React.Fragment>
            <Navbar active='addTask' />
            <div className='w-full pt-8 flex justify-center'>
                <TodoCard title='ADD' todo={todo} />
            </div>
        </React.Fragment>
    )
}

export default Task