import React, { useEffect, useRef, useState } from "react";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate, useParams } from "react-router-dom";


const  CreatePin = ({ gameId }) => {

    const navigate = useNavigate()
    const navigateTo = path => navigate(path)
    const goToParticipatingUsers = () => navigateTo(`/games/participating-users/${gameId}`)

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

    return (
        <div>            
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
                onClick={goToParticipatingUsers}
                className='w-100 bg-73CD02 d-flex align-items-center justify-content-center p-2 mb-5'
            >
                <p className='p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1'>Enter</p>
                <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                    <CustomSvg name={'arrow-right'} color="#000" />
                </div>
            </button>           
        </div>
    )
}


const CreateQrCode = ({ gameId }) => {

    const navigate = useNavigate()
    const navigateTo = path => navigate(path)
    const goToParticipatingUsers = () => navigateTo(`/games/participating-users/${gameId}`)

    return (
        <div>
            <div className="mb-4 pb-3 d-flex align-items-center justify-content-center">
                <CustomSvg name="qrCode" />
            </div>
            <button 
                onClick={goToParticipatingUsers}
                className='w-100 bg-73CD02 d-flex align-items-center justify-content-center p-2 mb-4'
            >
                <p className='p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1'>Share</p>
                <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                    <CustomSvg name={'share'} />
                </div>
            </button>  
            <div>
                <p className='p-0 px-2 m-0 opacity-_8 text-center letter-spacing-_22 line-height-30 font-weight-300 small-txt txt-FFF font-family-poppins'>
                    QR Code are unique and different for each  competition, you can invite your friends to join the competition
                </p>
            </div>                       
        </div>
    )
}


export default function CreateLobby(){

    const params = useParams()
    const { gameId } = params

    const [activeRoute, setActiveRoute] = useState('enterPin')
    const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true)
    const [isRightBlockOpen, setIsRightBlockOpen] = useState(true)
    const [blocksOpen, setBlocksOpen] = useState('both')

    useEffect(() => {
        if(isLeftBlockOpen && isRightBlockOpen){
            setBlocksOpen('both')

        }

        if(!isLeftBlockOpen && !isRightBlockOpen){
            setBlocksOpen('none')
        }

        if((!isLeftBlockOpen && isRightBlockOpen) || (isLeftBlockOpen && !isRightBlockOpen)){
            setBlocksOpen('one')
        }
    }, [isLeftBlockOpen, isRightBlockOpen])    

    const routeToEnterPin = () => setActiveRoute('enterPin')
    const routeToQrCode = () => setActiveRoute('qrCode')

    return(
        <div style={{ minHeight: '100vh' }} className='dashboard'>
            <DashboardHeader />

            <div className='d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4 justify-content-between align-items-start herogeneral'>
                
                <div className='d-lg-none d-md-none d-flex align-items-center justify-content-between mb-2'>
                    <div className='col-lg-2'>
                        <CollapseBlock isSmallScreen={true} />
                    </div>
                    <div className='col-lg-2'>
                        <CollapseBlockRight isSmallScreen={true }/>
                    </div>              
                </div>

                <div className={`${isLeftBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none`}>
                    <CollapseBlock setIsLeftBlockOpen={setIsLeftBlockOpen} />
                </div>

                <div className={`${blocksOpen == 'both' ? 'col-lg-8 col-md-8' : blocksOpen == 'one' ? 'col-lg-9 col-md-9' : blocksOpen == 'none' ? 'col-lg-10 col-md-10' : ''} col-auto px-lg-4 px-md-4 px-0`}>
                    <h1 className='m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF'>Create <span className='txt-73CD02'>{ activeRoute == 'enterPin' ? 'Token' : 'Qr Code' }</span></h1>
                    {
                        activeRoute == 'enterPin' &&
                            <p className='m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF opacity-_7'>
                                Create a token for your fans to use to join the game you are hosting
                            </p>                         
                    }
                    
                    <div className="d-flex col-lg-12 w-100 align-items-center justify-content-between mb-5">
                        <div 
                            onClick={routeToEnterPin} 
                            className={`${activeRoute == 'enterPin' ? 'bg-73CD02' : 'bg-transparent join-lobby-inactive-route'} clickable col-lg-5 p-3`}
                        >
                            <p className={`${activeRoute == 'enterPin' ? 'txt-000' : 'txt-FFF'} m-0 p-0 text-center font-weight-500 regular-txt font-family-poppins`}>Enter Pin</p>
                        </div>
                        <div 
                            onClick={routeToQrCode}
                            className={`${activeRoute == 'qrCode' ? 'bg-73CD02' : 'bg-transparent join-lobby-inactive-route'} clickable col-lg-5 p-3`}
                        >
                            <p className={`${activeRoute == 'qrCode' ? 'txt-000' : 'txt-FFF'} m-0 p-0 text-center font-weight-500 regular-txt font-family-poppins`}>Scan Qr Code</p>
                        </div>                        
                    </div> 

                    { activeRoute == 'enterPin' && <CreatePin gameId={gameId} /> }
                    { activeRoute == 'qrCode' && <CreateQrCode gameId={gameId} /> }
                </div>

                <div className={`${isRightBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none align-items-center justify-content-end`}>
                    <div className=''>
                        <CollapseBlockRight setIsRightBlockOpen={setIsRightBlockOpen} />
                    </div>
                </div>                
            </div>             
        </div>
    )
}