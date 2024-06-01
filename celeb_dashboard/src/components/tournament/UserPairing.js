import React, { useEffect, useState } from 'react'
import DashboardHeader from '../dashboard/DashboardHeader/DashboardHeader'
import CollapseBlock from '../dashboard/CollapseBlockLeft/collapseblockleft'
import CollapseBlockRight from '../dashboard/collapseblockright/collapseblockright'
import CustomSvg from '../svgs/CustomSvg'
import vsImg from '../../assets/images/VS.svg'
import { allUsers } from '../games/auxiliary/gamesAux'
import { useNavigate, useParams } from 'react-router-dom'


export default function UserPairing() {

    const navigate = useNavigate()
    const navigateTo = (path) => navigate(path)
    const goToPlayGame = () => navigateTo(`/tournaments/play/${gameId}`)

    
    const params = useParams()
    const { gameId } = params


  const [isLeftBlockOpen, setIsLeftBlockOpen] = useState(true)
  const [isRightBlockOpen, setIsRightBlockOpen] = useState(true)
  const [blocksOpen, setBlocksOpen] = useState('both')


  const firstFive = allUsers.slice(0, 5)
  const lastFive = allUsers.slice(allUsers.length - 5, allUsers.length)

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


  const displayPairedUsers = firstFive.map((firstFiveUser, i) => {
    const { profile, name, bgClass } = firstFiveUser
    const lastFiveUser = lastFive[i]

    return (
        <div
            key={i}
            className='d-flex align-items-center justify-content-between mb-4'
        >
            <div className='d-lg-flex d-md-flex d-block align-items-center col-lg-2'>
                <div style={{ border: '5px solid #FD8D84'}} className={`${bgClass} p-1 col-lg-8 col-md-8 col-12 rounded-circle`}>
                    <img src={profile} className='col-lg-12 col-md-12 col-12' />
                </div>
                <p className='m-0 p-0 col-lg-1 col-md-1 col-12 font-family-poppins txt-FFF small-txt font-weight-600 mx-lg-2 mx-md-2 mx-0 text-center'>{name}</p>
            </div>

            <div className='col-lg-1 col-md-1 col-1'>
                <img src={vsImg} className='col-lg-12 col-md-12 col-12' />
            </div>

            <div className='d-lg-flex d-md-flex d-block align-items-center col-lg-2'>
                <div style={{ border: '5px solid #B1DEFF'}} className={`${lastFiveUser.bgClass} p-1 col-lg-8 col-md-8 col-12 rounded-circle`}>
                    <img src={lastFiveUser.profile} className='col-lg-12 col-md-12 col-12' />
                </div>
                <p className='m-0 p-0 col-lg-1 col-md-1 col-12 font-family-poppins txt-FFF small-txt font-weight-600 mx-lg-2 mx-md-2 mx-0 text-center'>{lastFiveUser.name}</p>
            </div>
        </div>
    )
  })

  
  return (
    <div style={{ minHeight: '100vh' }} className='dashboard font-family-poppins'>
        <DashboardHeader />
        <div className='d-lg-flex d-md-flex d-block mt-lg-4 mt-md-4 mt-2 px-lg-4 px-md-4 px-2 justify-content-between align-items-start herogeneral'>
            
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
                <h1 className='m-0 p-0 mb-3 font-weight-700 font-family-quantico txt-large txt-FFF'>Selected <span className='txt-73CD02'>Users</span></h1>  
                <div className='d-flex align-items-center justify-content-end mb-4'>
                    <div className='clickable d-flex align-items-center'>
                        <p className='m-0 p-0 small-txt txt-73CD02 font-family-poppins font-weight-400'>See All</p>
                        <div className='d-flex align-items-center justify-content-center mx-3'>
                            <CustomSvg name={'arrow-right'} color={'#73CD02'} />
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    { displayPairedUsers }
                </div>

                <button
                    onClick={goToPlayGame} 
                    className='w-100 bg-EAD3AB d-flex align-items-center justify-content-center p-2'
                >
                    <p className='p-0 m-0 small-txt txt-000 font-weight-500 font-family-poppins mx-1'>Start Game</p>
                    <div className='m-0 p-0 mx-2 d-flex align-items-center'>
                        <CustomSvg name={'arrow-right'} color="#000" />
                    </div>
                </button>
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