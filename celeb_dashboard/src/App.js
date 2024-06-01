import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/dashboard';
import EmailVerification from './components/auth/EmailVerification';
import Chat from './components/chat/Chat';
import UserProfile from './components/userProfile/UserProfile';
import AllUsers from './components/chat/AllUsers';
import Deposit from './components/payments/Deposit';
import Login from './components/auth/Login';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ScrollTo from './components/scroll/ScrollTo';
import SelectAvatar from './components/userProfile/SelectAvatar';
import Tournaments from './components/tournament/tournament';
import AllGames from './components/games/AllGames';
import SelectedGame from './components/games/SelectedGame';
import CreateLobby from './components/games/CreateLobby';
import AllTournaments from './components/tournament/AllTournaments';
import WatingRoom from './components/tournament/waitingRoom/watingRoom';
import ParticipatingUsers from './components/games/ParticipatingUsers';
import UserPairing from './components/tournament/UserPairing';


export default function App(){


  const navigate = useNavigate()
  const navigateTo = (path) => navigate(path)

  const pathname = useLocation().pathname

  const userLogout = () => navigateTo('/login')


  return (
    <ScrollTo condition={pathname}>
      <Routes>

        {/* AUTHENTICATION ROUTES  */}
        
        <Route 
          path='/email-verification'
          element={<EmailVerification navigateTo={navigateTo} type="activateAcct" />}
        />

        <Route 
          path='/forgot-password/verify-email'
          element={<EmailVerification navigateTo={navigateTo} type="resetPassword" />}
        />   

        <Route 
          path='/forgot-password/reset-password'
          element={<ResetPassword />}
        />   

        <Route 
          path='/register'
          element={<Register navigateTo={navigateTo}/>}
        />

        <Route 
          path='/login'
          element={<Login navigateTo={navigateTo}/>}
        />

        <Route 
          path='/forgot-password'
          element={<ForgotPassword navigateTo={navigateTo}/>}
        /> 

        <Route
          path='/select-avatar'
          element={<SelectAvatar />}
        />






        
        {/* MAIN APP ROUTES  */}

        {/* Dashboard */}

        <Route 
          path='/'
          element={<Dashboard navigateTo={navigateTo} />}
          
        />





        {/* Games  */}

        <Route 
          path='/games'
          element={<AllGames navigateTo={navigateTo} />}
        />

        <Route 
          path='/games/waiting-room/:gameId'
          element={<WatingRoom navigateTo={navigateTo} />}
        />        

        <Route 
          path='/games/create-lobby/:gameId'
          element={<CreateLobby navigateTo={navigateTo} />}
        />        

        <Route 
          path='/games/selected-game/:gameId'
          element={<SelectedGame navigateTo={navigateTo} />}
        />

        <Route 
          path='/games/participating-users/:gameId'
          element={<ParticipatingUsers navigateTo={navigateTo} />}
        />        



        {/* Users */}

        <Route 
          path='/chat'
          element={<Chat navigateTo={navigateTo} />}
        />

        <Route 
          path='/all-users'
          element={<AllUsers navigateTo={navigateTo} />}
        />





        {/* Tournaments */}

        <Route 
          path='/tournaments'
          element={<AllTournaments navigateTo={navigateTo} />}
        /> 
    
        <Route 
          path='/tournaments/play/:gameId'
          element={<Tournaments navigateTo={navigateTo} />}
        /> 

        <Route 
          path='/tournaments/play/user-pairing/:gameId'
          element={<UserPairing navigateTo={navigateTo} />}
        /> 





        {/* User Profile  */}

        <Route 
          path='/user-profile/*'
          element={<UserProfile app_navigateTo={navigateTo} userLogout={userLogout} />}
        /> 





        {/* Transactions  */}

        <Route 
          path='/deposit'
          element={<Deposit app_navigateTo={navigateTo} />}
        />            

      </Routes>
    </ScrollTo>
  )
}