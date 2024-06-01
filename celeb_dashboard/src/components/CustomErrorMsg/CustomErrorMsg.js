import React from "react";


export default function CustomErrorMsg({ errorMsg, isCentered }){
    return (
        <div className="my-3">
            <p className={`${isCentered && 'text-center'} font-family-poppins small-txt font-weight-500 txt-DC1212`}>{errorMsg}</p>
        </div>
    )
}