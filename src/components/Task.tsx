import { Check, Trash } from "phosphor-react";
import { useState } from "react";

import styles from './Task.module.css';

interface TaskContent {
    id: string;
    content: string;
    taskCheck: boolean;
    onCheckTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

export function Task({id, content, taskCheck, onCheckTask, onDeleteTask}: TaskContent) {
    function handleClickOnCheck() {
        onCheckTask(id);
    }

    function handleTaskDeletion() {
        onDeleteTask(id);
    }

    return (
        <div className={styles.task}>
            <button className={taskCheck ? styles.checkNotClicked : styles.checkClicked} onClick={handleClickOnCheck}>
                <Check size={10} weight="bold" />
            </button>
            <p className={taskCheck ? styles.textChecked : undefined}>{content}</p>
            <button className={styles.trashButton} onClick={handleTaskDeletion}>
                <Trash size={14}/>
            </button>
        </div>
    )
}