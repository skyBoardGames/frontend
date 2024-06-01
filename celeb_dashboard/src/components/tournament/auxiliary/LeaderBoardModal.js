import React from "react";
import { Modal } from 'react-bootstrap'
import CustomSvg from "../../svgs/CustomSvg";
import winnerImg from '../../../assets/images/winnerImg.png'
import { useNavigate } from "react-router-dom";
import MyProfile from "../../userProfile/auxiliary/MyProfile";


export default function LeaderBoardModal({ modalProps }){

    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const navigateTo = (path) => navigate(path)

    if(modalProps){

        const { visible, onHide, size, players } = modalProps

        const quitGame = () => {
            onHide()
            return navigateTo('/games')
        }


        return (
            <Modal
                show={visible}
                onHide={quitGame}
                size={size ? size : 'sm'}
                centered={true}            
            >
                <div className="py-4 px-4 mx-3">
                    <div 
                        onClick={quitGame}
                        className="d-flex align-items-center justify-content-end mb-2 clickable"
                    >
                        <CustomSvg name='x' />
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <h1 className="m-0 p-0 mb-3 txt-130828 font-family-quantico line-height-30 font-weight-700 letter-spacing-_32 medium-txt text-center">Leaderboard</h1>
                        <div className="d-flex align-items-center justify-content-center mb-2">
                            <CustomSvg name="crown" />
                        </div>
                        <div className="d-flex align-items-center justify-content-center mb-5">
                            <div>
                                <hr />
                            </div>                                
                            <div className="mx-3">
                                <p className="m-0 p-0 opacity-_9 font-family-poppins small-txt txt-000 font-weight-400 text-center">Top Winners</p>
                            </div>
                            <div>
                                <hr />
                            </div>
                        </div>
                        {
                            players &&
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="col-lg-3 col-md-3 col-3 d-flex flex-column justify-content-center align-items-center">
                                        <div className="mb-2">
                                            <div className={`${players[0].bgClass} leaderboard-profile-container col-lg-12 col-md-12 col-12 p-1 rounded-circle`}>
                                                <img src={players[0].profile} className='col-lg-12 col-md-12 col-12'  alt=""/>
                                            </div> 
                                        </div>
                                        <div>
                                            <h5 className="m-0 p-0 mb-1 text-center txt-000 font-weight-600 small-txt font-family-SourceSans">{players[0].name}</h5>
                                            <p className="m-0 p-0 text-center txt-73CD02 font-family-SourceSans font-weight-600 extra-small-txt">98.0</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-5 col-lg-5 col-5 d-flex flex-column justify-content-center align-items-center">
                                        <div className="mb-2">
                                            <MyProfile bgClass={"bg-C59AFC"} borderClass={"leaderboard-profile-container"} />                                    
                                        </div>
                                        <div>
                                            <h5 className="m-0 p-0 mb-1 text-center txt-000 font-weight-600 small-txt font-family-SourceSans">You</h5>
                                            <p className="m-0 p-0 text-center txt-73CD02 font-family-SourceSans font-weight-600 extra-small-txt">98.5</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-2 col-md-2 col-2 d-flex flex-column justify-content-center align-items-center">
                                        <div className="mb-2">
                                            <div className={`${players[1].bgClass} leaderboard-profile-container col-lg-12 col-md-12 col-12 p-1 rounded-circle`}>
                                                <img src={players[1].profile} className='col-lg-12 col-md-12 col-12'  alt=""/>
                                            </div>
                                        </div>
                                        <div>
                                            <h5 className="m-0 p-0 mb-1 text-center txt-000 font-weight-600 small-txt font-family-SourceSans">{players[1].name}</h5>
                                            <p className="m-0 p-0 text-center txt-73CD02 font-family-SourceSans font-weight-600 extra-small-txt">97.8</p>
                                        </div>
                                    </div>                                                        
                                </div>                            
                        }
                    </div>
                </div> 
            </Modal>
        )
    }

    return <></>
}