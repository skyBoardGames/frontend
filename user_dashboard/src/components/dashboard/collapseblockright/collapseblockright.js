import React, { useEffect, useState } from 'react';
import logowithname from '../../../assets/images/logowithname.png';
import { Offcanvas } from 'react-bootstrap';
import './CollapseBlockright.css';
import lobby_arrow_right from '../../../assets/images/lobby_arrow_right.svg'
import JoinLobbyModal from '../../games/auxiliary/JoinLobbyModal';
import WithdrawModal from '../../payments/WithdrawModal';
import arrowright from '../../../assets/images/arrowright.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomSvg from '../../svgs/CustomSvg';



const Block = ({ 
  handleclose, goToDeposit, goToGames, goToJoinLobby, openWithdrawModal, pathname, joinLobbyModal, withdrawModal,
  isOpen
}) => {
  return (
    <>
      <div className='collapseback py-3 d-lg-block d-md-block d-none' onClick={handleclose} disabled={!isOpen}>
        Collapse Block <img src={lobby_arrow_right}/>
      </div>
        <div className='py-3 colorfuldiv'>
            <p className='total'>Total Amount</p>
            <p className='nairasymbol'>&#8358;52,000.00</p>
            <div className='d-flex justify-content-between flex-wrap'>
              <p
                onClick={goToDeposit} 
                className='p-2 clickable fundyouraccount d-flex align-items-center justify-content-center'
              >
                + Fund your balance
              </p>
              <p 
                onClick={openWithdrawModal}
                className='clickable p-2 withdrawyourwins d-flex align-items-center justify-content-center'
              >
                - Withdraw your wins
              </p>
            </div>
        </div>
        {
          !pathname.includes('deposit') && !pathname.includes('join-lobby') && !pathname.includes('selected-game') && !pathname.includes('games') && !pathname.includes('tournaments/play') &&
            <>
              <button onClick={goToGames} className='py-3 createlobby px-3 w-100'>Create Lobby <img src={lobby_arrow_right}/></button>
              <button onClick={goToJoinLobby} className='py-3 joinlobby px-3 w-100'>Join Lobby <img src={lobby_arrow_right}/></button>            
            </>
        }



        <JoinLobbyModal modalProps={joinLobbyModal} />
        <WithdrawModal modalProps={withdrawModal} />
    </>    
  )
}




function CollapseBlockRight({ setIsRightBlockOpen, isSmallScreen }) { 

  const pathname = useLocation().pathname

  const navigate = useNavigate()
  const navigateTo = path => navigate(path)
  const goToDeposit = () => navigateTo('/deposit')  
  const goToGames = () => navigateTo('/games')
  const goToJoinLobby = () => navigateTo('/games/join-lobby')

  const [joinLobbyModal, setJoinLobbyModal] = useState({ visible: false, onHide: null, size: 'md' })
  const [withdrawModal, setWithdrawModal] = useState({ visible: false, onHide: null, size: 'md' })
  const [showOffCanvasBlock, setShowOffCanvasBlock] = useState(false)

  const [isOpen, setIsOpen] = useState(true);
  const [showOpenButton, setShowOpenButton] = useState(false);


  useEffect(() => {
    if(setIsRightBlockOpen){
      setIsRightBlockOpen(isOpen)
    }
  }, [isOpen])
 


  const openOffCanvasBlock = () => setShowOffCanvasBlock(true)
  const closeOffCanvasBlock = () => setShowOffCanvasBlock(false)

  const openJoinLobbyModal = () => setJoinLobbyModal({ visible: true, onHide: hideJoinLobbyModal, size: 'md' })
  const hideJoinLobbyModal = () => setJoinLobbyModal({ visible: false, onHide: null, size: 'md' })

  const openWithdrawModal = () => setWithdrawModal({ visible: true, onHide: hideWithdrawModal, size: 'md' })
  const hideWithdrawModal = () => setWithdrawModal({ visible: false, onHide: null, size: 'md' })

  const handleOpen = () => {
      setIsOpen(true);
      setShowOpenButton(false); 
  };
  const handleclose = () => {
      setIsOpen(false);
      setShowOpenButton(true);
  }

  return (
    <div className=''>
      {(showOpenButton || isSmallScreen) && ( 
        <div>
          <button className='d-lg-block d-md-block d-none arrowLeft mb-lg-0 mb-md-0 mb-4' onClick={handleOpen}><img src= {arrowright} /></button>   
          <button className='d-lg-none d-md-none d-block arrowLeft mb-lg-0 mb-md-0 mb-4' onClick={openOffCanvasBlock}><img src= {arrowright} /></button>   
          {/* <button className='arrowLeft' onClick={handleOpen}><img src= {arrowright} /></button> */}
        </div>
      )}
      {isOpen && (
        <div className='d-lg-block d-md-block d-none'>
          <Block 
            handleclose={handleclose}
            goToDeposit={goToDeposit}
            goToGames={goToGames}
            goToJoinLobby={goToJoinLobby}
            openWithdrawModal={openWithdrawModal}
            pathname={pathname}
            joinLobbyModal={joinLobbyModal}
            withdrawModal={withdrawModal}
            isOpen={isOpen}
          />
        </div>
      )}
        <Offcanvas show={showOffCanvasBlock} placement='end'>
            <div style={{ backgroundColor: '#130828', overflowY: 'auto', }} className='w-100 h-100'>
                <div className='navContainer w-100 h-100 p-4'>
                    <div className='d-flex align-items-center mb-5 justify-content-between'>
                        <div className='col-3 d-flex'>
                            <img src={logowithname} className='col-12' alt ="Our Logo"/>
                        </div>   
                        <div onClick={closeOffCanvasBlock} className='clickable'>
                            <CustomSvg name="x" color="#FFF" />
                        </div>                     
                    </div>

                    <div className='mb-5'>
                      <Block 
                        handleclose={handleclose}
                        goToDeposit={goToDeposit}
                        goToGames={goToGames}
                        goToJoinLobby={goToJoinLobby}
                        openWithdrawModal={openWithdrawModal}
                        pathname={pathname}
                        joinLobbyModal={joinLobbyModal}
                        withdrawModal={withdrawModal}
                        isOpen={isOpen}
                      />                        
                    </div>                                    
                </div>                
            </div>
        </Offcanvas>    
    </div>
  )
  }

  export default CollapseBlockRight