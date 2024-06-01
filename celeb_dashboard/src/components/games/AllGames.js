import React, { useState, useEffect } from "react";
import DashboardHeader from "../dashboard/DashboardHeader/DashboardHeader";
import CollapseBlock from "../dashboard/CollapseBlockLeft/collapseblockleft";
import CollapseBlockRight from "../dashboard/collapseblockright/collapseblockright";
import { allGames } from "./auxiliary/gamesAux";
import CustomSvg from "../svgs/CustomSvg";
import { useNavigate } from "react-router-dom";


export default function AllGames(){
    const navigate = useNavigate()
    const navigateTo = path => navigate(path)

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
  

    const displayGames = allGames.map((game, i) => {
        const { bgClass, title, img, caption, arrowColor, id } = game

        const selectGame = () => navigateTo(`/games/selected-game/${id}`)

        return (
            <div className={`${blocksOpen == 'none' ? 'col-lg-3 col-md-3' : blocksOpen == 'one' ? 'col-lg-4 col-md-4' : blocksOpen == 'both' && 'col-lg-4 col-md-4'} col-12`}>
                <div
                    key={i}
                    onClick={selectGame}
                    className={`${bgClass} p-3 clickable col-lg-11 col-md-11 col-12 mb-4`}
                >
                    <div className="col-lg-12 col-md-12 col-12 mb-3">
                        <img src={img} className="col-lg-12 col-md-12 col-12" />
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h4 className="m-0 p-0 mb-3 txt-000 font-family-quantico regular-txt font-weight-700">{title}</h4>
                            <p className="m-0 p-0 small-txt font-family-poppins txt-000 font-weight-300">{caption}</p>
                        </div>

                        <div className="p-2 d-flex align-items-center justify-content-center bg-000 rounded-circle">
                            <CustomSvg color={arrowColor} name="arrow-right" width={12} height={12} />
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div style={{ minHeight: '100vh' }} className='dashboard'>
            <DashboardHeader />
            <div className='d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4 justify-content-between align-items-start herogeneral'>
                
                <div className='d-lg-none d-md-none d-flex align-items-center justify-content-between mb-4'>
                    <div className='col-lg-2'>
                        <CollapseBlock isSmallScreen={true} />
                    </div>
                    <div className='col-lg-2'>
                        <CollapseBlockRight isSmallScreen={true} />
                    </div>              
                </div>

                <div className={`${isLeftBlockOpen ? 'col-lg-2 col-md-2' : 'col-lg-1 col-md-1'} d-lg-flex d-md-flex d-none`}>
                    <CollapseBlock setIsLeftBlockOpen={setIsLeftBlockOpen} />
                </div>
                

                <div className={`${blocksOpen == 'both' ? 'col-lg-8 col-md-8' : blocksOpen == 'one' ? 'col-lg-9 col-md-9' : blocksOpen == 'none' ? 'col-lg-10 col-md-10' : ''} col-auto px-lg-4 px-md-4 px-0`}>
                    <h1 className='m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF'>Select <span className='txt-73CD02'>Game</span></h1>
                    <p className='m-0 p-0 mb-4 regular-txt font-weight-300 font-family-poppins txt-FFF opacity-_7'>
                        Select any game of your choice that you will like to participate in
                    </p> 

                    <div className="d-flex align-items-center flex-wrap justify-content-lg-start justify-content-md-start justify-content-center">
                        { displayGames }
                    </div>               
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