import React, { useEffect, useState } from 'react'

const FileDisplay = ({ account, contract }) => {

    const [images, setImages] = useState([]);
    const [address, setAddress] = useState(account);

    const getdata = async () => {
        try {
            let mydata = await contract.getImages(address)
            console.log(mydata)
            setImages(mydata);
        } catch (error) {
            console.log(error)
            setImages([])
            setAddress("")
            alert("access not available for given address")
        }
    }

    return (
        <>
            <div className='filedisplay'>

                {images.map((item) => {
                    return (

                        <img src={item} className='image' alt="" srcset="" />
                    )
                })}




            </div>
            <input type="text" name="" id="" placeholder='enter address' value={address} onChange={(e) => { setAddress(e.target.value) }} style={{ color: "black", marginLeft: "50%", transform: "translateX(-50%)", width: "40%", textAlign: "center", marginTop: "15px" }} />
            <br></br>
            <button style={{ marginLeft: "50%", transform: "translateX(-50%)", width: "20%", textAlign: "center", marginTop: "15px" }} onClick={getdata}>GET FILES</button>
        </>
    )
}

export default FileDisplay