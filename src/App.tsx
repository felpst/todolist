import { useState } from 'react';
import { Header } from './components/Header';
import { TasksLists } from './components/TasksList';

import styles from './App.module.css';

import './global.css'

function App() {

  return (
    <div className={styles.app}>
      <Header />

      <main>
        <TasksLists />
      </main>
    </div>
  )
}

export default App
