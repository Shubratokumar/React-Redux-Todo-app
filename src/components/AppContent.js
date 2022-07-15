import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import styles from '../styles/modules/app.module.scss';

const AppContent = () => {
    const filterStatus = useSelector((state)=> state.todo.filterStatus)
    const todoList = useSelector((state) => state.todo.todoList);
    const sortedTodoList = [...todoList];
    sortedTodoList.sort((a,b) => new Date(b.time) - new Date(a.time));

    const filteredTodoLlist = sortedTodoList.filter((item) => {
        if(filterStatus === 'all'){
            return true;
        }
        return item.status === filterStatus;
    })

    return (
        <div className={styles.content__wrapper}>
            {
                filteredTodoLlist && filteredTodoLlist.length > 0 ? 
                filteredTodoLlist.map((todo) => (
                   <TodoItem todo={todo} key={todo.id} />
                )) : "No Tasks found !"
            }
        </div>
    );
};

export default AppContent;