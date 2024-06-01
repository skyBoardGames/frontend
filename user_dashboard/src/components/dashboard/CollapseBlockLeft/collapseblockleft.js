import React, { useEffect, useState } from 'react';
import './collapseblockleft.css';
import { Offcanvas } from 'react-bootstrap';
import lobby_arrow_right from '../../../assets/images/lobby_arrow_right.svg'
import top_contribution from '../../../assets/images/top_contribution.svg'
import logowithname from '../../../assets/images/logowithname.png';
import top_games from '../../../assets/images/top_games.svg';
import arrow_down from '../../../assets/images/arrow_down.svg'
import Active from '../../../assets/images/Active.svg';
import SnookerActiveicon from '../../../assets/images/SnookerActiveicon.svg';
import LudoActiveicon from '../../../assets/images/LudoActiveicon.svg';
import ChessActiveicon from '../../../assets/images/ChessActiveicon.svg';
import ScrabbleActiveicon from '../../../assets/images/ScrabbleActiveicon.svg';
import CardActiveicon from '../../../assets/images/CardActiveicon.svg';
import ActiveLaptopicon from '../../../assets/images/ActiveLaptopicon.svg';
import ActiveWorldIcon from '../../../assets/images/ActiveWorldIcon.svg';
import CustomSvg from '../../svgs/CustomSvg';


const Block = ({ activebutton, activehandler, handleclose, isOpen }) => (
    <div className='collapseright collapsible-container'>
        <div className='collapsebackright py-3 d-lg-flex d-md-flex d-none align-items-center justify-content-center' onClick={handleclose} disabled={!isOpen}><img src={lobby_arrow_right} className='me-3'/> 
            <div className='collapsebackclick'>Collapse Block</div>
        </div>
        
        <div>
            <div className='d-flex justify-content-between align-items-center topcollapse gap-3 gap-xxl-0 mb-2'>
                <div><img src={top_contribution}/></div>
                <div className='topcompetition'>Top Competitions</div>
                <div><img src={arrow_down} className='clickable'/></div>
            </div>
            <div className='d-flex justify-content-between align-items-center topcollapsegames'>
                <div><img src={top_games}/></div>
                <div className='topcompetition'>Top Games</div>
                <div><img src={arrow_down} className='clickable' /></div>
            </div>
        </div>
        <div className='d-flex '>
            <span className='activebutton d-flex align-items-center justify-content-center col-lg-6 p-3 clickable' onClick={activehandler}><img src={Active} className='me-2'/>Active</span>
            <span className='rewardbutton d-flex align-items-center justify-content-center col-lg-6 p-3 clickable'> Reward</span>
        </div>

        {activebutton && (
        <>
            <div className='d-flex p-3 justify-content-between align-items-center activeall'>
                <div className='d-flex justify-content-between'>
                    <div className='pe-4'>All (5)</div>
                    <div><img src={ActiveLaptopicon} alt=""/>33</div>
                </div>
                <div><img src={ActiveWorldIcon} alt=""/></div>
            </div>
            <div className='activetop'>Top</div>
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <img src={SnookerActiveicon}  alt=''/>
                    <div className='d-flex ps-2'>Snooker Board <div className='ps-1'>(6)</div></div>
                </div>
                <div><img src={arrow_down} className='clickable' alt=''/></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <img src={LudoActiveicon} alt=''/>
                    <div className='d-flex ps-2'>Ludo King <div className='ps-1'>(2)</div></div>
                </div>
                <div><img src={arrow_down} className='clickable' alt=''/></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <img src={ChessActiveicon} alt=''/>
                    <div className='d-flex ps-2'>Chess Game <div className='ps-1'>(14)</div></div>
                </div>
                <div><img src={arrow_down} className='clickable' alt=''/></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <img src={ScrabbleActiveicon} alt=''/>
                    <div className='d-flex ps-2'>Scrabble Game <div className='ps-1'>(10)</div></div>
                </div>
                <div><img src={arrow_down} className='clickable' alt=''/></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <img src={CardActiveicon} alt=''/>
                    <div className='d-flex ps-2'>Whot Card <div className='ps-1'>(1)</div></div>
                </div>
                <div><img src={arrow_down} className='clickable' alt=''/></div>
            </div> 
            </>
        )}
    </div>    
)



function CollapseBlock({ setIsLeftBlockOpen, isSmallScreen }) {


    const [isOpen, setIsOpen] = useState(true);
    const [showOpenButton, setShowOpenButton] = useState(false);
    const [showOffCanvasBlock, setShowOffCanvasBlock] = useState(false)

    const [activebutton, setActivebutton] = useState(false);

    useEffect(() => {
        if(setIsLeftBlockOpen){
            setIsLeftBlockOpen(isOpen)
        }
    }, [isOpen])

    const openOffCanvasBlock = () => setShowOffCanvasBlock(true)
    const closeOffCanvasBlock = () => setShowOffCanvasBlock(false)

    const activehandler = () => {
        setActivebutton(!activebutton);
    }

    const handleOpen = () => {
        setIsOpen(true);
        setShowOpenButton(false); 
    };
    const handleclose = () => {
        setIsOpen(false);
        setShowOpenButton(true);
    }
  

  return (
    <>
    {(showOpenButton || isSmallScreen) && (
        <div>
            <button className='d-lg-block d-md-block d-none arrowLeft mb-lg-0 mb-md-0 mb-4' onClick={handleOpen}><img src= {lobby_arrow_right} /></button>   
            <button className='d-lg-none d-md-none d-block arrowLeft mb-lg-0 mb-md-0 mb-4' onClick={openOffCanvasBlock}><img src= {lobby_arrow_right} /></button>   
        </div>
      )}
    {isOpen && (
        <div className='d-lg-block d-md-block d-none'>
            <Block activebutton={activebutton} activehandler={activehandler} handleclose={handleclose} isOpen={isOpen} />
        </div>
    )}

        <Offcanvas show={showOffCanvasBlock}>
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
                        <Block activebutton={activebutton} activehandler={activehandler} handleclose={handleclose} isOpen={isOpen} />
                    </div>                                    
                </div>                
            </div>
        </Offcanvas>
    </>
  )
}

export default CollapseBlock