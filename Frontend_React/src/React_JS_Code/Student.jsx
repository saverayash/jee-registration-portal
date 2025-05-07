import React from 'react';
import { useNavigate } from 'react-router-dom';

function Student() {
    const navigate = useNavigate();

    const handlenavigate = (path) => {
        navigate(path);
    };

    return (
        <div style={{
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            textAlign: 'center',
            fontFamily: 'Arial'
        }}>
            <h1>Welcome as Student</h1>
            <button
                onClick={() => handlenavigate('/change_password')}
                style={styles.NavigationBox}
            >
                Change Password
            </button>
            <br/>
            <button
                onClick={() => handlenavigate('/announcement')}
                style={styles.NavigationBox}
            >
                Announcements
            </button>
            <br/>
            <button
                onClick={() => handlenavigate('/studentquery')}
                style={styles.NavigationBox}
            >
                See & Ask Query
            </button>
            <br/>
            <button
                onClick={() => handlenavigate('/view_center')}
                style={styles.NavigationBox}
            >
                View Center
            </button>
            <br/>
            <button
                onClick={() => handlenavigate('/result_view')}
                style={styles.NavigationBox}
            >
                Result View
            </button>
            <br/>
            <button
                onClick={() => handlenavigate('/paperview')}
                style={styles.NavigationBox}
            >
                Paper View
            </button>
        </div>
    );
}

const styles = {
    NavigationBox: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default Student;
