import styles from './Header.module.css';

import todoLogo from '../assets/rocket.svg';

export function Header() {
    return (
        <header className={styles.header}>
            <img src={todoLogo} />
            <div className={styles.text}>
                <h1 className={styles.to}>to</h1>
                <h1 className={styles.do}>do</h1>
            </div>
        </header>
    )
}