import React from "react";
import styles from '../styles/UserOptionsCard.module.css';
import { UserPhoto } from "../features/users/UserPhoto";
import { auth } from "../firebase";

export const UserOptionsCard = () => {
    return (
        <div className={styles.main}>
            <div>
                <div>
                    <UserPhoto />
                </div>
                <div>
                    <div>
                        {auth.currentUser.displayName}
                    </div>
                    <div>
                        see your profile
                    </div>
                </div>
                user info stuff here
            </div>
            <hr/>
            <ul>
                <li>Log Out</li>
            </ul>
        </div>
    )
}