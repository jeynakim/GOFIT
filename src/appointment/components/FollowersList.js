import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import ErrorModal from '../../shared/components/ErrorModal';
import styles from './FollowersList.module.css';

function FollowersList(props) {

    const auth = useContext(AuthContext);

    const { onSelect, onSubmit } = props;

    const [error, setError] = useState(null);
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        if (!auth.userId) return
        (async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/followers/${auth.userId}`);
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                console.log(responseData)
                setFollowers(responseData.followers);
            } catch (error) {
                console.log(error);
                setError(error.message || 'Unexpected error occured.');
            }
        })();
    }, [])

    return (
        <div className={`${styles.container}`} onClick={event => event.stopPropagation()}>
            <div className={styles.followingContainer}>
                <p className={styles.followings_p}>Followings</p>
            </div>
            {error && <ErrorModal error={error} onClear={() => { setError(null) }} />}
            {followers && followers.map(ele => (
                <ul key={ele.id} className={`${styles.ul}`}>
                    <li className={styles.followerContainer} onClick={event => { event.stopPropagation(); onSelect(ele.id, ele.name) }}>
                        <img className={`${styles.avatar}`} src={ele.image} alt="avatar" />
                        <p className={styles.followerName} value={ele.id}>{ele.name}</p>
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default React.memo(FollowersList)