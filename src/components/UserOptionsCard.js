import React from "react";
import styles from '../styles/UserOptionsCard.module.css';
import { UserPhoto } from "../features/users/UserPhoto";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const UserOptionsCard = () => {

    const navigate = useNavigate();

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch(err) {
            console.error(err);
        }
    }
    return (
        <div className={styles.main}>
            <div className={styles.user}>
                <div>
                    <UserPhoto />
                </div>
                <div className={styles.textContainer}>
                    <div className={styles.userName}>
                        {auth && auth.currentUser.displayName}
                    </div>
                    <div>
                        see your profile
                    </div>
                </div>
            </div>
            <hr/>
            <ul className={styles.optionsContainer}>
                <li onClick={logOut}>Log Out</li>
            </ul>
        </div>
    )
}