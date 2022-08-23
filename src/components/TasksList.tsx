import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Task } from './Task';
import styles from './TasksList.module.css';

import { v4 as uuidv4 } from 'uuid';
import { PlusCircle } from 'phosphor-react';


export function TasksLists() {
    let [tasks, setTasks] = useState(
        [
            {
                id: uuidv4(),
                content: "Teste",
                taskCheck: false,
            }
        ]
    );

    const [newTaskText, setNewTaskText] = useState('');

    const [totalTasks, setTotalTasks] = useState(1);

    const [totalCheckedTasks, setTotalCheckedTasks] = useState(0);

    const isNewTaskEmpty = newTaskText.length === 0;

    function handleCreateNewTask(event: FormEvent) {
        event.preventDefault();

        const newTask = {
            id: uuidv4(),
            content: newTaskText,
            taskCheck: false,
        }

        setTasks([...tasks, newTask]);
        setNewTaskText('');
        setTotalTasks(totalTasks + 1);
    }

    function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewTaskText(event.target.value);
    }


    function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Este campo é obrigatório!');
    }

    function deleteTask(id: string) {

        let totalChecked = 0

        const tasksWithoutDeletedTask = tasks.filter(task => {
            return task.id !== id;
        });

        tasksWithoutDeletedTask.forEach((task) => {
            if (task.taskCheck) {
                totalChecked += 1;
            }
        });

        if (tasksWithoutDeletedTask.length === 0) {
            setTotalTasks(0);
        }
        else {
            setTotalTasks(tasksWithoutDeletedTask.length);
        }
        
        setTasks(tasksWithoutDeletedTask);
        setTotalCheckedTasks(totalChecked);
    }

    function checkTask(id:string) {

        let totalChecked = 0

        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                task.taskCheck = !task.taskCheck;
                return task;
            }
            return task;
        });

        updatedTasks.forEach((task) => {
            if (task.taskCheck) {
                totalChecked += 1;
            }
        });

        setTasks(updatedTasks);
        setTotalCheckedTasks(totalChecked);
    }

    return (

        <div>
            <form onSubmit={handleCreateNewTask} className={styles.addTaskBar}>
                <textarea
                    name='task'
                    placeholder='Adicione uma nova tarefa'
                    value={newTaskText}
                    onChange={handleNewTaskChange}
                    onInvalid={handleNewTaskInvalid}
                    required
                />

                <footer>
                    <button className={styles.createButton} type='submit' disabled={isNewTaskEmpty}>
                        Criar
                        <PlusCircle size={16} weight='bold' />
                    </button>
                </footer>
            </form>
            <div className={styles.taskList}>
                <div className={styles.info}>
                    <div>
                        <strong className={styles.created}>
                            Tarefas criadas
                        </strong>
                        <span>{totalTasks}</span>
                    </div>
                    <div>
                        <strong className={styles.concluded}>
                            Concluídas
                        </strong>
                        <span>
                            {totalCheckedTasks} de {totalTasks}
                        </span>
                    </div>
                </div>

                <div className={styles.tasks}>
                    {tasks.map(task => {
                        return (
                            <Task
                                id={task.id} 
                                content={task.content} 
                                taskCheck={task.taskCheck}
                                onDeleteTask={deleteTask}
                                onCheckTask={checkTask}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}