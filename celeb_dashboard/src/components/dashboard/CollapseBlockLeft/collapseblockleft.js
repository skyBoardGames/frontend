import React, { useEffect, useState } from 'react';
import './collapseblockleft.css';
import { Offcanvas } from 'react-bootstrap';
import logowithname from '../../../assets/images/logowithname.png';
import Active from '../../../assets/images/Active.svg';
import CustomSvg from '../../svgs/CustomSvg';


const Block = ({ activebutton, activehandler, handleclose, isOpen }) => (
    <div className='collapseright collapsible-container'>
        <div className='collapsebackright py-3 d-lg-flex d-md-flex d-none align-items-center justify-content-center' onClick={handleclose} disabled={!isOpen}><div className='me-3'><CustomSvg name="arrwowRight" /></div>
            <div className='collapsebackclick'>Collapse Block</div>
        </div>
        
        <div>
            <div className='d-flex justify-content-between align-items-center topcollapse gap-3 gap-xxl-0 mb-2'>
                <div><CustomSvg name="trophy" /></div>
                <div className='topcompetition'>Top Competitions</div>
                <div className='clickable'>
                    <CustomSvg name="caret-down" color="#73CD02" />
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-center topcollapsegames'>
                <div><CustomSvg name="medalAward" /></div>
                <div className='topcompetition'>Top Games</div>
                <div className='clickable'>
                    <CustomSvg name="caret-down" color="#73CD02" />
                </div>
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
                    <div><CustomSvg name={'laptop'} /> 33</div>
                </div>
                <div><CustomSvg name={'planet'} /></div>
            </div>
            <div className='activetop'>Top</div>
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <CustomSvg name={'snooker'} />
                    <div className='d-flex ps-2'>Snooker Board <div className='ps-1'>(6)</div></div>
                </div>
                <div className='clickable'><CustomSvg name={'caret-down'} color="#73CD02" /></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <CustomSvg name={'ludo'} />
                    <div className='d-flex ps-2'>Ludo King <div className='ps-1'>(2)</div></div>
                </div>
                <div className='clickable'><CustomSvg name={'caret-down'} color="#73CD02" /></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <CustomSvg name={'chessPiece'} />
                    <div className='d-flex ps-2'>Chess Game <div className='ps-1'>(14)</div></div>
                </div>
                <div className='clickable'><CustomSvg name={'caret-down'} color="#73CD02" /></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <CustomSvg name={'scrabble'} />
                    <div className='d-flex ps-2'>Scrabble Game <div className='ps-1'>(10)</div></div>
                </div>
                <div className='clickable'><CustomSvg name={'caret-down'} color="#73CD02" /></div>
            </div> 
            <div className='d-flex justify-content-between align-items-center activetext'>
                <div className='d-flex'>
                    <CustomSvg name={'whot'} />   
                    <div className='d-flex ps-2'>Whot Card <div className='ps-1'>(1)</div></div>
                </div>
                <div className='clickable'><CustomSvg name={'caret-down'} color="#73CD02" /></div>
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
            <button className='d-lg-block d-md-block d-none arrowLeft mb-lg-0 mb-md-0 mb-4' onClick={handleOpen}><CustomSvg name="arrow-right" /></button>   
            <button className='d-lg-none d-md-none d-block arrowLeft mb-lg-0 mb-md-0 mb-4' onClick={openOffCanvasBlock}><CustomSvg name="arrow-right" /></button>   
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