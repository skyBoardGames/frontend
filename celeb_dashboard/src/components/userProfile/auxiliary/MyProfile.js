import React from "react";
import profile from '../../../assets/images/userProfile1.png'


export default function MyProfile({ bgClass, borderClass }){
    return (
        <div className={`${bgClass} ${borderClass} col-lg-12 col-md-12 col-12 p-1 rounded-circle`}>
            <img src={profile} className='col-lg-12 col-md-12 col-12'  alt=""/>
        </div>        
    )
}