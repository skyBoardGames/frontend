import React, { useState } from "react";
import CustomSvg from "../../svgs/CustomSvg";


export default function AmountPicker({ btnTxt, btnFunc, subTxt }){

    const [value, setValue] = useState(2000)

    const onIncrement = () => value < 25000 && setValue(prev => prev + 1000)
    const onDecrement = () => value > 0 && setValue(prev => prev - 1000)

    const resetValue = amount => setValue(amount)
 
    const submitValue = () => btnFunc && btnFunc(value)

    return (
        <div>
            <div className='d-flex align-items-start justify-content-between mb-5'>
                <div className=''>
                    <div 
                        onClick={onDecrement}
                        className='clickable create-lobby-decrement-stake-container p-1 d-flex align-items-center justify-content-center'
                    >
                        <CustomSvg name="minus" />
                    </div>
                </div>

                <div className='col-lg-5'>
                    <p className='m-0 p-0 mb-3 pb-2 text-center txt-FFF regular-txt font-weight-600 font-family-poppins create-lobby-stake-txt'>{value}</p>
                    
                    <div className='d-flex align-items-center justify-content-between mb-4'>
                        <div 
                            onClick={() => resetValue(5000)} 
                            className='create-lobby-stake-option-container clickable'
                        >
                            <p className='m-0 p-0 p-2 small-txt font-family-poppins txt-000 font-weight-600'>N5,000</p>
                        </div>
                        <div 
                            onClick={() => resetValue(15000)} 
                            className='create-lobby-stake-option-container clickable'
                        >
                            <p className='m-0 p-0 p-2 small-txt font-family-poppins txt-000 font-weight-600'>N15,000</p>
                        </div>
                        <div 
                            onClick={() => resetValue(25000)}
                            className='create-lobby-stake-option-container clickable'
                        >
                            <p className='m-0 p-0 p-2 small-txt font-family-poppins txt-000 font-weight-600'>N25,000</p>
                        </div>
                    </div>
            
                    <p className='m-0 p-0 small-txt opacity-_7 txt-FFF font-family-poppins font-weight-400 text-center'>{subTxt}</p>                                
                </div>

                <div className=''>
                    <div 
                        onClick={onIncrement}
                        className='clickable create-lobby-increment-stake-container p-2 d-flex align-items-center justify-content-center'
                    >
                        <CustomSvg name="plus" />
                    </div>
                </div>
            </div>
            <button 
                onClick={submitValue}
                className='w-100 bg-FBBC04 d-flex align-items-center justify-content-center p-2 mb-3'
            >
                <p className='p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1'>{btnTxt}</p>
                <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                    <CustomSvg name={'arrow-right'} color="#000" />
                </div>
            </button>                        
        </div>
    )
}