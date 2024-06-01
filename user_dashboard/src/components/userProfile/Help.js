import React from "react";
import CustomSvg from "../svgs/CustomSvg";


export default function Help(){
    return (
        <div className='dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2'>
            <div className="d-flex w-100 align-items-center justify-content-center">
                <div className="col-lg-10">
                    <h6 className="m-0 p-0 mb-4 txt-FFF font-family-poppins opacity-_7 font-weight-500 medium-txt">Send us an email, we will help you</h6>
            
                    <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-3'>
                        <div style={{ width: '3%' }}>
                            <CustomSvg name="profile" />
                        </div>
                        <input
                            style={{ width: '94%' }}
                            placeholder='Enter your fullname'
                            className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                        />
                    </div> 

                    <div className='mb-4 d-flex align-items-center register-input-container justify-content-between p-3'>
                        <div style={{ width: '3%' }}>
                            <CustomSvg name="mail" />
                        </div>
                        <input
                            style={{ width: '94%' }}
                            placeholder='Enter your email address'
                            className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                        />
                    </div> 
                    <div className='mb-4 d-flex align-items-start register-input-container justify-content-between p-3'>
                        <div style={{ width: '3%' }}>
                            <CustomSvg name="mail" />
                        </div>
                        <textarea
                            style={{ width: '94%', height: '30vh' }}
                            placeholder='Enter your message'
                            className='txt-FFF mx-lg-0 mx-md-0 mx-4 regular-txt font-family-quantico'
                        />
                    </div> 
                    <div className='w-100 mb-3'>
                        <button 
                            className='w-100 bg-BD3193 d-flex align-items-center justify-content-center p-3'
                        >
                            <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1'>Send</p>
                            <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                                <CustomSvg name={'arrow-right'} />
                            </div>
                        </button>
                    </div>                                                            
                </div>
            </div>          
        </div>
    )
}