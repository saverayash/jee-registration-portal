import React from 'react';
import { useNavigate } from 'react-router-dom';

function Centre() {
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
            <h1>Welcome as Centre</h1>
            <button
                onClick={() => handlenavigate('/change_password')}
                style={styles.NavigationBox}
            >
                Change Password
            </button>
            <br/>
            <button
                onClick={() => handlenavigate('/center_student')}
                style={styles.NavigationBox}
            >
               View Student
            </button>
            <br/>
            <button
                onClick={() => handlenavigate('/report_student')}
                style={styles.NavigationBox}
            >
               Report Student
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

export default Centre;
