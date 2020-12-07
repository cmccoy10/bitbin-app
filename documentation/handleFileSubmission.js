import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/ducks/authentication';
import { useState } from 'react';
import { uploadFile } from '../../store/ducks/file';


const Main = () => {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");

    const handleClick = async () => {
        await dispatch(logout());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("folderId", 1);

        console.log("File", file)
        console.log(data)

        dispatch(uploadFile(data));
    }

    return (
        <div>
            <h1>Home Page</h1>
            <div>
                <button onClick={handleClick}>Logout</button>
            </div>
            <div>
                <button>
                    <a href="https://bitbin-files.s3.us-east-2.amazonaws.com/w7-study-guide.pdf"> View PDF</a>
                </button>
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        placeholder="Upload file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                        <button type="submit">Upload File</button>
                </form>
            </div>
        </div>
    );
}

export default Main;
