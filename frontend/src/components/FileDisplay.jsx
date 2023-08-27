import React, { useEffect, useState } from 'react'

const FileDisplay = ({ account, contract }) => {

    const [images, setImages] = useState([]);
    const [address, setAddress] = useState(account);
    const [otherAddresses, setOtherAddresses] = useState([]);
    console.log(account)

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
    async function addNewAccessor() {
        try {

            let newAccessor = prompt("Enter New Address");
            await contract.addAccess(newAccessor);
            alert("added accessor:", newAccessor);
        } catch (error) {
            console.log(error)
        }
    }
    async function revokeAccessAddress() {
        try {
            let addressToRevokeAccess = document.querySelector("select").value

            let index = addressToRevokeAccess.indexOf(",");

            let target = addressToRevokeAccess.substring(0, index);


            let newArray = [...otherAddresses];
            console.log("hello")
            for (let i = 0; i < newArray.length; i++) {
                if (JSON.stringify(target) == JSON.stringify(newArray[i][0])) {
                    console.log('found at', i)
                    newArray.splice(i, 1);
                    console.log("after splicing:", newArray)
                    setOtherAddresses(newArray)

                    await contract.revokeAccess(target);
                    alert("removed accessor:", target);
                    return;
                }

            }

        } catch (error) {
            console.log(error)
        }
    }

    async function getAccessibleAddresses() {

        let otherAddresses = await contract.getSharedOwners();
        const accessibleAddress = otherAddresses.filter((item) => {
            return item[1]
        })
        console.log(accessibleAddress)
        setOtherAddresses(accessibleAddress)
    }


    return (
        <>
            <button onClick={addNewAccessor} style={{
                margin: "20px",
                width: "30%",
                margin: "auto"
            }}>Add Access Address</button>




            <select type="text" name="" id="getFileAddress" placeholder='enter address'
                onClick={getAccessibleAddresses}
                style={{ color: "black", marginLeft: "50%", transform: "translateX(-50%)", width: "40%", textAlign: "center", marginTop: "15px" }} >
                {otherAddresses.map((item, index) => {
                    return (
                        <option style={{ color: "black" }} value={item}>{item}</option>
                    )
                })}



            </select>
            <button onClick={revokeAccessAddress} style={{
                margin: "20px",
                width: "30%",
                margin: "auto"
            }}>Remove Access Address</button>
            <div className='filedisplay'>

                {images.map((item, index) => {
                    return (



                        <img src={item} key={index} style={{ height: "100%", width: "100%", cursor: "pointer", margin: "10px" }} className='image' alt="" srcset="" onClick={() => {
                            window.open(item, "_blank")
                        }} />
                    )
                })}




            </div>





            <input type="text" name="" id=""
                placeholder='Enter target address'
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value)
                }}
                style={{
                    margin: "auto",

                    color: "black"
                    , width: "30%",
                    textAlign: "center"
                }}

            />
            <button style={{ marginLeft: "50%", transform: "translateX(-50%)", width: "20%", textAlign: "center", marginTop: "15px" }} onClick={getdata}>GET FILES</button>
        </>
    )
}

export default FileDisplay