import React,  {useEffect, useState} from 'react'
import './tournament.css'
import DashboardHeader from '../dashboard/DashboardHeader/DashboardHeader'
import CustomSvg from '../svgs/CustomSvg'
import { useLocation, useParams } from 'react-router-dom'
import { allGames, allUsers } from '../games/auxiliary/gamesAux'
import LeaderBoardModal from './auxiliary/LeaderBoardModal'
import MyProfile from '../userProfile/auxiliary/MyProfile'


function Tournaments() {

  const params = useParams()
  const location = useLocation()

  const { gameId } = params

  const gameInfo = allGames.filter(game => game.id == gameId)[0]

  const [leaderBoardModal, setLeaderBoardModal] = useState({ visible: false, onHide: null, size: 'md' })

  useEffect(() => {
    const tempTimeout = setTimeout(() => {
      openLeaderBoardModal({ players: allUsers.slice(0, 3) })
      clearTimeout(tempTimeout)
    }, 3000)
  }, [])

  const openLeaderBoardModal = ({ players }) => setLeaderBoardModal({ visible: true, onHide: hideLeaderBoardModal, size: 'md', players })
  const hideLeaderBoardModal = () => setLeaderBoardModal({ visible: false, onHide: null, size: 'md'})

  return (
    <div className='generaltournament' style={{ minHeight: '100vh' }}>
      <DashboardHeader />   
      <div className='w-100 mt-lg-4 mt-md-4 mt-4 px-lg-4 px-md-4 px-4'>

        <div className='d-flex align-items-center justify-content-center py-lg-5 py-md-5 py-4'>
          <div className='d-flex flex-column align-items-center ludotournamentcontainer'>
              <div className='align-self-start d-flex align-items-center col-lg-2 col-md-4 col-4'>
                <div className='col-lg-7'>
                  <MyProfile bgClass={'bg-FD8D84'} />
                </div>
                <p className='col-lg-3 col-md-3 col-3 m-0 p-0 txt-FFF font-weight-600 font-family-poppins regular-txt text-center mx-2'>User 1</p>
              </div>

              <div className='align-self-center my-5 col-lg-8 col-md-3 col-12'><img src={gameInfo.img} alt="" className='col-lg-12 col-md-12 col-12'/></div>               
              
              <div className='align-self-end d-flex flex-row-reverse align-items-center col-lg-2 col-md-4 col-4'>
                <div className='col-lg-7'>
                  <MyProfile bgClass={'bg-FD8D84'} />
                </div>
                <p className='col-lg-3 m-0 p-0 txt-FFF font-weight-600 font-family-poppins regular-txt text-center mx-2'>User 2</p>
              </div>            
          </div>

          <LeaderBoardModal modalProps={leaderBoardModal} />           
        </div>
      </div>
    </div>
  )
}

export default Tournaments