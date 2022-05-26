import React from "react";
import styles from '../styles/UserOptionsCard.module.css';
import { UserPhoto } from "../features/users/UserPhoto";
import { auth } from "../firebase";

export const UserOptionsCard = () => {
    return (
        <div className={styles.main}>
            <div className={styles.user}>
                <div>
                    <UserPhoto />
                </div>
                <div className={styles.textContainer}>
                    <div className={styles.userName}>
                        {auth.currentUser.displayName}
                    </div>
                    <div>
                        see your profile
                    </div>
                </div>
            </div>
            <hr/>
            <ul className={styles.optionsContainer}>
                <li>Log Out</li>
            </ul>
        </div>
    )
}