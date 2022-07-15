import { format } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from './../utils/getClasses';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import { toast } from 'react-hot-toast';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

const TodoItem = ({todo}) => {
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [checked, setChecked] = useState(false);
    const dispatch =  useDispatch();

    useEffect(()=> {
        if(todo.status === "complete"){
            setChecked(true)
        } else {
            setChecked(false)
        }
    }, [todo.status])

    const handleDelete = () =>{
        dispatch(deleteTodo(todo.id));
        toast.success('Task deleted successfully');
    }
    const handleUpdate = () =>{
        setUpdateModalOpen(true)
    }
    const handleCheck = () =>{
        setChecked(!checked);
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete',
        }))
    }
    return (
        <>
            <div className={styles.item}>
                <div className={styles.todoDetails}>
                    <CheckButton 
                        checked={checked} 
                        handleCheck={handleCheck}
                    ></CheckButton>
                    <div className={styles.texts} >
                        <p className={getClasses([
                            styles.todoText,
                            todo.status === 'complete' && styles['todoText--completed'],
                        ])} >{todo.title}</p>
                        <p className={styles.time}>{format(new Date(todo.time), 'p, MM/dd/yyyy')}</p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div className={styles.icon}
                        onClick={handleDelete}
                        role='button'
                        tabIndex={0}
                    >
                        <MdDelete/>
                    </div>
                    <div className={styles.icon}
                        onClick={handleUpdate}
                        role='button'
                        tabIndex={0}
                    >
                        <MdEdit/>
                    </div>
                </div>
            </div>
            <TodoModal 
                type="update"
                todo={todo}
                modalOpen={updateModalOpen}  
                setModalOpen={setUpdateModalOpen}
            />
        </>
    );
};

export default TodoItem;