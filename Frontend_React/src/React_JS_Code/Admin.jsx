import React from 'react';
import { useNavigate } from 'react-router-dom';

function Admin() {
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
            <h1>Welcome as Admin</h1>
            <button
                onClick={() => handlenavigate('/change_password')}
                style={styles.NavigationBox}
            >
                Change Password
            </button>
            <br/>
            <button onClick={()=>handlenavigate('/add_user')} style={styles.NavigationBox}
            >Add User
                </button><br/>
                <button onClick={()=>handlenavigate('/make_announcement')} style={styles.NavigationBox}
            >Make Announcement
                </button> <br/>
                <button onClick={()=>handlenavigate('/admin_center')} style={styles.NavigationBox}
            >Allocate & Change Center
                </button>
                <br/>
                <button onClick={()=>handlenavigate('/see_reportedstudent')} style={styles.NavigationBox}
            >See Reported Students
                </button>
                <br/>
                <button onClick={()=>handlenavigate('/publish')} style={styles.NavigationBox}
            >Publish Result
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

export default Admin;
