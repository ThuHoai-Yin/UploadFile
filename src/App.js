import React, { useState } from 'react';
import "./App.css";
import axios from 'axios';
import 'antd/dist/antd.css';
import { Progress } from 'antd';


function App() {

    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    //choose first file when get it the computer
    const handleChange = (event) => {
        setFile(event.target.files[0])
    }

    //this caculate the progress of upload file
    const progress = {
        onProgress: (eventProgress) => {
            let { loaded, total } = eventProgress;
            let percentage = Math.floor(loaded * 100 / total);
            //console.log(`${loaded}kb of ${total}kb | ${percentage}%`);
            if (percentage < 100) {
                //get progress to upload progress
                setUploadProgress(percentage)
            }
        }
    }

    //Upload file to the API
    const handleSubmision = () => {
        //FormData is object lets you compile a set of key/value pairs to send using XMLHttpsReques
        const formData = new FormData();
        //compile the key and value and prepare to send to api by using axios.post 
        formData.append("file", file);
        axios.post('minh', formData, progress)
            .then((respone) => {
                console.log(respone.data);
                setUploadProgress(100);
                if (uploadProgress == 100) {
                    alert("upload success");
                }
                //after 1 second change the percentage to 0
                setTimeout(() => {
                    setUploadProgress(0);
                }, 1000)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    const handleRemove = () => {
       const formData = new FormData();
       formData.append("file", file);
       axios.delete('them url o day', formData)
       .then((respone) => {
           console(respone.data);
           setFile(null)
       })
       .catch((error) => {
           console.log(error);
       })
    }
    return (
        <>
            <div className="contain">
                <input type="file" onChange={handleChange}/>
                {file && 
                <div className="file">
                    {file.name}
                    <button className="remove" onClick={handleRemove}>Remove</button>
                </div>}
                <button onClick={handleSubmision}>submit</button>
                {uploadProgress > 0 && <Progress percent={uploadProgress} />}
            </div>
        </>
    );
}

export default App;