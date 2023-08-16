import React from 'react'

interface Task{
    project_id: number;
    id: number;
    text: string;
}

interface Props{
    tasks: Task[]
}

const CustomListTasks = ({tasks}: Props) => {
  return (
    <ul className='list-group'>
        {tasks.map(item => <li key={item.id} className='list-group-item'>{item.text}</li>)}
    </ul>
  )
}

export default CustomListTasks