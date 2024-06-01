import React from "react";
import CustomSvg from "../svgs/CustomSvg";


const securityOptions = [
    {
        title: '2-Factor Authentication'
    },
    {
        title: 'Verify Your Email'
    },    
    {
        title: 'Upload ID'
    },  
]



export default function Security(){

    const displaySecurityOptions = securityOptions.map((opt, i) => {
        const { title } = opt

        return (
            <div
                key={i}
                className="clickable user-profile-security-option-container mb-4 p-3 d-flex align-items-center justify-content-between"
            >
                <div>
                    <p className="m-0 p-0 font-family-quantico txt-FFF medium-txt font-weight-400">{title}</p>
                </div>

                <div className="">
                    <CustomSvg name="caret-right" />
                </div>
            </div>
        )
    })

    return (
        <div className='dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2'>
            { displaySecurityOptions }
        </div>
    )
}