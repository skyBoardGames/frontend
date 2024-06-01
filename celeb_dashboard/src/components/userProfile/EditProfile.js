import React, { useState } from "react";
import userProfile1 from '../../assets/images/userProfile1.png'
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import UserProfileNav from "./UserProfileNav";
import { MdEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";


const user = {
    name: 'SteshaCr',
    wins: 230,
    profile: userProfile1,
    bgClass: 'bg-FD8D84',
    category: 'wins',
    email: 'steshacr@gmail.com',
    country: 'Nigeria',
    favGame: 'Chess',
    bio: `I'm SteshaCr, hailing from Lagos, Nigeria, where I've carved a niche for myself in the gaming world. My journey began with a love for strategic classics like Chess and Ludo, which not only honed my tactical abilities but also opened doors to a vibrant, global gaming community. As I climbed the ranks in local tournaments, my belief in gaming as a bridge between cultures has only strengthened. I'm committed to mastering my skills further and making an impact in Nigeria's competitive gaming landscape.`
}



export default function EditProfile(){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)

    const goToSelectAvatar = () => navigateTo(`/user-profile/select-avatar`)

    const { bgClass, name, profile, country } = user

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [isEditting, setIsEditting] = useState(false)


    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev)
    const toggleEditMode = () => setIsEditting(prev => !prev)


    return (
        <div className='dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2'>
            <div className="d-lg-flex d-md-flex d-block align-items-center justify-content-between mb-5">
                <div className="d-flex align-items-center">
                    <div>
                        <div 
                            style={{
                                border: '6px solid #BD3193'
                            }}
                            className={`${bgClass} rounded-circle d-flex flex-column align-items-center justify-content-center p-1`}
                        >
                            <img src={profile} />
                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <div onClick={goToSelectAvatar} className="user-profile-edit-profile-profile-edit-icon p-2 clickable rounded-circle bg-FFF">
                                <MdEdit size={20} color="#BD3193" />
                            </div>
                        </div>
                    </div>                            
                    <div className="mx-2">
                        <h5 className="m-0 mb-1 p-0 txt-FFF font-family-poppins font-weight-600 regular-txt">{name}</h5>
                        <p className="m-0 p-0 txt-FFF opacity-_7 small-txt font-family-poppins font-weight-300">{country}</p>
                    </div>
                </div>
                <div onClick={toggleEditMode} className="d-flex align-items-center justify-content-lg-center justify-content-md-center justify-content-end clickable">
                    <p className="m-0 p-0 font-family-poppins txt-small font-weight-400 txt-73CD02 text-capitalize">
                        { isEditting ? 'revert changes' : 'edit profile' }
                    </p>
                    <div className="mx-2">
                        <CustomSvg name="arrow-right" color="#73CD02" />
                    </div>
                </div>
            </div>

            <div className="d-flex flex-wrap align-items-start justify-content-lg-between justify-content-md-between justify-content-center mb-4">
                <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
                    <div className="mb-4">
                        <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">Name</label>
                        <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-2'>
                            <input
                                style={{ width: '100%' }}
                                value={name}
                                className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                            />
                        </div> 
                    </div>
                    <div className="mb-4">
                        <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">Phone Number</label>
                        <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-2'>
                            <input
                                style={{ width: '100%' }}
                                value={'+234 804 586 4089'}
                                className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                            />
                        </div> 
                    </div>
                    <div className="mb-4">
                        <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">Date Of Birth</label>
                        <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-2'>
                            <input
                                style={{ width: '100%' }}
                                value={'Dec 5th, 2004'}
                                className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                            />
                        </div> 
                    </div> 
                    <div className="mb-4">
                        <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">Password</label>
                        <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-2'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                style={{ width: '91%' }}
                                value='**************'
                                className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                            />
                            <div 
                                style={{ width: '3%' }} 
                                className='d-flex jusitfy-content-start clickable'
                                onClick={togglePasswordVisibility}
                            >
                                {
                                    passwordVisible
                                    ?
                                        <FiEye color='#FFFFFFB2' />
                                    :
                                        <CustomSvg name="eye-slash" />
                                }
                            </div>                            
                        </div>                        
                    </div>                                       
                </div>


                <div className="col-lg-5 col-md-5 col-12 mb-lg-0 mb-md-0 mb-4">
                    <div className="mb-4">
                        <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">Email Address</label>
                        <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-2'>
                            <input
                                type="email"
                                style={{ width: '100%' }}
                                value={'Dec 5th, 2004'}
                                className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                            />
                        </div> 
                    </div>

                    <div className="mb-4">
                        <label className="m-0 p-0 mb-2 txt-FFF regular-txt font-family-poppins">Bio</label>
                        <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-2'>
                            <textarea
                                style={{ width: '100%', height: '37vh' }}
                                value={"I'm SteshaCr, a dynamic presence in the online gaming community. My passion lies in exploring new gaming horizons and pushing the limits of competitive play. With a knack for strategy and a spirit for adventure, I engage in battles that not only challenge my skills but also bring excitement to my followers. My journey is one of constant growth, aiming to inspire and entertain through every game I conquer."}
                                className='p-lg-4 p-md-4 p-2 txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                            />
                        </div> 
                    </div>                    
                </div>
            </div>  

            {
                isEditting &&
                    <button 
                        className='w-100 bg-73CD02 d-flex align-items-center justify-content-center p-2 mb-5'
                    >
                        <p className='p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1'>Save Changes</p>
                        <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                            <CustomSvg name={'arrow-right'} color='#000' />
                        </div>
                    </button>                  
            }                   
        </div>
    )
}