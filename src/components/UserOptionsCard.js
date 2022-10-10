import React, {useState, useEffect} from "react";
import styles from '../styles/UserOptionsCard.module.css';
import { UserPhoto } from "../features/users/UserPhoto";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../features/api/apiSlice";

export const UserOptionsCard = ({toggleCard, toggleNav}) => {
    const [name, setName] = useState('');
    const {data: user, isError} = useGetCurrentUserQuery();


    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            throw new Error('User not found');
        }
        setName(`${user.firstName} ${user.lastName}`);
    }, []);

    const logOut = async () => {
        try {
            // await signOut(auth);
            toggleCard();
            toggleNav();
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
                        {name}
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