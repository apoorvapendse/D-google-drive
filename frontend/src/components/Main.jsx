import React, { useState } from 'react'
import axios from 'axios'
const Main = ({ account, contract }) => {

    const [file, setFile] = useState();
    const [filename, setFilename] = useState();

    console.log(account)
    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log("form submitted")
        if (file) {
            try {
                const formData = new FormData();
                //form data is basically an array of arrays that we can use to send strings or even files to server 
                //using xhrHttpRequest
                formData.append("file", file);

                //apricot-real-nightingale-884.mypinata.cloud


                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: "16f6112e1dcf5706db44",
                        pinata_secret_api_key: "bf5c55946ea4a7ba71b5b512d1f22ea578315ca1d8e4c2eb23026dbed95b7639",
                        "Content-Type": "multipart/form-data"
                    }

                })

                //IpfsHash is the CID of the file
                const hash = `https://apricot-real-nightingale-884.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`

                contract.addFile(account, hash)


                setFilename("No image uploaded")

                setFile(null);
                alert("Image uploaded")
            } catch (error) {
                alert(error)
            }
        }
        else {

        }

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
            <p style={{ textAlign: "center", margin: "10px" }}> Account : {account ? account : "Not connected"}</p>

            <form action="" style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", gap: "12px" }} onSubmit={handleSubmit}>

                <input type="file"
                    placeholder='choose file'
                    onChange={handleFile}
                />
                <button style={{ width: "20%" }} disabled={!file}>Upload file</button>
            </form>





        </div>
    )
}

export default Main