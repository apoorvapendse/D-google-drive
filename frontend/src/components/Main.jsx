import React, { useState } from 'react'

const Main = () => {

    const [file, setFile] = useState();
    const [filename, setFilename] = useState();


    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted")
    }

    function handleFile(e) {

        const file = e.target.files[0];

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file)
        reader.onloadend = (hello) => {
            setFile(e.target.files[0]);
            console.log(hello)
        }

        setFilename(file.name);
    }

    return (
        <div>
            <h1 className='Heading'>
                Ddrive by <a href="https://github.com/apoorvapendse" target='_blank'>

                    <img style={{ height: "40px", width: "40px", borderRadius: "50%" }} src='https://avatars.githubusercontent.com/u/102853901?v=4'></img>

                </a>
            </h1>


            <form action="" style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", gap: "12px" }} onSubmit={handleSubmit}>

                <input type="file"
                    placeholder='choose file'
                    onChange={handleFile}
                />
                <button style={{ width: "20%" }}>Upload file</button>
            </form>



            <input type="text" name="" id="" placeholder='enter address' style={{ marginLeft: "50%", transform: "translateX(-50%)", width: "40%", textAlign: "center", marginTop: "15px" }} />
            <br></br>
            <button style={{ marginLeft: "50%", transform: "translateX(-50%)", width: "20%", textAlign: "center", marginTop: "15px" }}>GET FILES</button>

        </div>
    )
}

export default Main