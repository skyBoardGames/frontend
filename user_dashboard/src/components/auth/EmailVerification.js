import { useState, useRef } from 'react'
import './css/auth.css'
import logo from '../../assets/images/logo1.png'
import CustomSvg from '../svgs/CustomSvg'
import { useNavigate } from 'react-router-dom'


export default function EmailVerification({ type }){

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)

    const goToDashboard = () => navigateTo('/')
    const goToSelectAvatar = () => navigateTo('/select-avatar')
    const goToResetPassword = () => navigateTo('/forgot-password/reset-password')

    const input1Ref = useRef(null)
    const input2Ref = useRef(null)
    const input3Ref = useRef(null)
    const input4Ref = useRef(null)
    const input5Ref = useRef(null)

    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [input4, setInput4] = useState('')
    const [input5, setInput5] = useState('')


    const onChangeInput1 = (e) => {
        const val = e.target.value
        setInput1(checkInputLength({ input: val }))

        if(input2Ref.current && val && Boolean(Number(val))){
            input2Ref.current.focus()
        }

        return;
    } 

    const onChangeInput2 = (e) => {
        const val = e.target.value
        setInput2(checkInputLength({ input: val }))

        if(input3Ref.current && val && Boolean(Number(val))){
            input3Ref.current.focus()
        }

        return
    } 

    const onChangeInput3 = (e) => {
        const val = e.target.value
        setInput3(checkInputLength({ input: val }))
        
        if(input4Ref.current && val && Boolean(Number(val))){
            input4Ref.current.focus()
        }

        return
    } 

    const onChangeInput4 = (e) => {
        const val = e.target.value
        setInput4(checkInputLength({ input: val }))
        
        if(input5Ref.current && val && Boolean(Number(val))){
            input5Ref.current.focus()
        }

        return
    } 

    const onChangeInput5 = (e) => {
        const val = e.target.value
        return setInput5(checkInputLength({ input: val }))
    } 


    const checkInputLength = ({ input, setInput }) => {
        if(!Boolean(Number(input))){
            return ''
        }

        if(input.length > 1){
            return input.slice(0, 1)
        }

        return input
    }

    const onBtnClick = () => {
        if(type == 'resetPassword'){
            return goToResetPassword()
        
        }

        if(type == 'activateAcct'){
            return goToSelectAvatar()
        }
    }


    return (
        <div className='email-verify-bg py-4 px-lg-5 px-md-5 px-3'>
            <div className='d-flex align-items-start flex-column mb-5'>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                    <div className='mb-0 col-lg-8 d-flex align-items-center justify-content-center'>
                        <img src={logo} className='col-lg-12' />
                    </div>
                    <h3 className='regular-txt txt-FFF m-0 p-0 text-center font-family-quantico font-weight-500'>SkyBoard</h3>
                </div>
            </div>

            <div className='d-flex align-items-center justify-content-center py-0'>
                <div className='col-lg-5'>
                    {
                        type == 'resetPassword'
                        ?
                            <h1 className='m-0 p-0 mb-4 font-weight-700 font-family-quantico txt-FFF extra-large-txt'>Email <span className='email-verify-email-txt'>Sent</span></h1>                        
                        :
                            <h1 className='m-0 p-0 mb-4 font-weight-700 font-family-quantico txt-FFF extra-large-txt'>Verify <span className='email-verify-email-txt'>Email</span></h1>                        
                    }
                
                    <p className='m-0 p-0 mb-5 opacity-_7 font-family-poppins txt-small font-weight-300 txt-FFF'>We’ve sent the OTP verification code to your email address. Check your email and enter the code below</p>
                
                    <div className='d-flex align-items-center justify-content-between mb-4 pb-3'>
                        <input 
                            ref={input1Ref}
                            onInput={onChangeInput1}
                            value={input1}
                            className='email-verify-input p-3 col-lg-2 col-md-2 col-2 text-center font-family-source-sans txt-FFF medium-txt' 
                        />
                        <input 
                            ref={input2Ref}
                            onInput={onChangeInput2}
                            value={input2}
                            className='email-verify-input p-3 col-lg-2 col-md-2 col-2 text-center font-family-source-sans txt-FFF medium-txt' 
                        />

                        <input 
                            ref={input3Ref}
                            onInput={onChangeInput3}
                            value={input3}
                            className='email-verify-input p-3 col-lg-2 col-md-2 col-2 text-center font-family-source-sans txt-FFF medium-txt' 
                        />
                        <input
                            ref={input4Ref}
                            onInput={onChangeInput4}
                            value={input4} 
                            className='email-verify-input p-3 col-lg-2 col-md-2 col-2 text-center font-family-source-sans txt-FFF medium-txt' 
                        />
                        <input 
                            ref={input5Ref}
                            onInput={onChangeInput5}
                            value={input5}
                            className='email-verify-input p-3 col-lg-2 col-md-2 col-2 text-center font-family-source-sans txt-FFF medium-txt' 
                        />                                                                                                
                    </div>

                    <button 
                        onClick={onBtnClick}
                        className='w-100 bg-BD3193 d-flex align-items-center justify-content-center p-2 mb-5'
                    >
                        <p className='p-0 m-0 small-txt txt-FFF font-weight-500 font-family-poppins mx-1'>Continue</p>
                        <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                            <CustomSvg name={'arrow-right'} />
                        </div>
                    </button>

                    <div>
                        <p className='p-0 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins'>
                            Didn’t receive email? <br /> You can resend code in <span className='txt-BD3193'>55s</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}