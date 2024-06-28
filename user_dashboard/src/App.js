import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/dashboard";
import EmailVerification from "./components/auth/EmailVerification";
import Chat from "./components/chat/Chat";
import UserProfile from "./components/userProfile/UserProfile";
import AllUsers from "./components/chat/AllUsers";
import Deposit from "./components/payments/Deposit";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import ScrollTo from "./components/scroll/ScrollTo";
import SelectAvatar from "./components/userProfile/SelectAvatar";
import Tournaments from "./components/tournament/tournament";
import AllGames from "./components/games/AllGames";
import SelectedGame from "./components/games/SelectedGame";
import JoinLobby from "./components/games/JoinLobby";
import AllTournaments from "./components/tournament/AllTournaments";
import WatingRoom from "./components/tournament/waitingRoom/watingRoom";
import ProtectedRoute from "./components/ProtectedRoute";

import { useEffect } from "react";

import socket from './socket';

// game imports
import Game from "./components/games/chess/components/game"
import { allUsers } from "./components/games/auxiliary/gamesAux";
import userProfile1 from './assets/images/userProfile1.png'

import { RecoilRoot } from "recoil";

import Ludo from './components/games/ludo/src/Ludo';

import Whot from './components/games/whot/src/pages/PlayFriend/Whot';
import { Provider } from 'react-redux';
import store from './components/games/whot/src/redux/playFriendStore';

import Snooker from './components/games/snooker/src/Snooker';
import Scrabble from './components/games/scrabble/Scrabble';

export default function App() {
  const navigate = useNavigate();
  const navigateTo = (path) => navigate(path);

  const pathname = useLocation().pathname;

  const userLogout = () => {
    sessionStorage.removeItem("token");
    navigateTo("/login");
  };

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
        console.log("this user", socket.id);
    })
  
    socket.on('disconnect', (_) => {
        console.log("this user disconnect", _);
        // console.log("this user disconnect", socket.id);
    }) 

    socket.on('opponent-joined-lobby', (userID, gameName, lobbyCode) => {
        navigateTo(`/tournaments/play/${userID}/${gameName}/${1000}/${lobbyCode}`)
    })

    socket.on('get_active', (arrayOfUserObjects) => {
        console.log("getting active");
        
        allUsers.splice(0);
  
        console.log(arrayOfUserObjects);
  
        arrayOfUserObjects.forEach(userObject => {
          // console.log("user active", userObject.socketID);
  
            allUsers.unshift({
                user_id: userObject.userID,
                name: 'random',
                wins: 210,
                profile: userProfile1,
                bgClass: 'bg-FD8D84'
            })
        })
  
    })
  
    return () => {
        console.log("unmounting disconnecting");
        socket.disconnect();
    }

  }, [])

  // const goToLogin = () => {
  //   const isVerified = sessionStorage.getItem("token")
  //   if(!isVerified){
  //     navigateTo("login")
  //   }
  // }

  return (
    <ScrollTo condition={pathname}>
      <Routes>
        {/* AUTHENTICATION ROUTES  */}

        <Route
          path="/email-verification"
          element={
            <EmailVerification navigateTo={navigateTo} type="activateAcct" />
          }
        />

        <Route
          path="/forgot-password/verify-email"
          element={
            <EmailVerification navigateTo={navigateTo} type="resetPassword" />
          }
        />

        <Route
          path="/forgot-password/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/register"
          element={<Register navigateTo={navigateTo} />}
        />

        <Route path="/login" element={<Login navigateTo={navigateTo} />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword navigateTo={navigateTo} />}
        />

        <Route path="/select-avatar" element={<SelectAvatar />} />

        {/* GAMES */}

        <Route
          path="/games/Chess/"
          element={<Game />}
        />

        <Route 
          path='/games/Ludo/'
          element={
            <RecoilRoot>
              <Ludo />
            </RecoilRoot>
          }
          
        />
        <Route 
          path='/games/Whot/'
          element={
            <Provider store={store}>
              <Whot />
            </Provider>
          }
          
        />
        <Route 
          path='/games/Snooker/'
          element={<Snooker />}
          
        />
        <Route 
          path='/games/Scrabble/'
          element={<Scrabble />}
          
        />

        {/* MAIN APP ROUTES  */}

        <Route path="/" element={<Dashboard navigateTo={navigateTo} />} />

        <Route path="/games" element={<AllGames navigateTo={navigateTo} />} />

        <Route
          path="/games/waiting-room"
          element={<WatingRoom navigateTo={navigateTo} />}
        />

        <Route
          path="/games/join-lobby"
          element={<JoinLobby navigateTo={navigateTo} />}
        />

        <Route
          path="/games/selected-game/:gameId"
          element={<SelectedGame navigateTo={navigateTo} />}
        />

        <Route path="/chat" element={<Chat navigateTo={navigateTo} />} />

        <Route
          path="/all-users"
          element={<AllUsers navigateTo={navigateTo} />}
        />

        <Route
          path="/tournaments"
          element={<AllTournaments navigateTo={navigateTo} />}
        />

        <Route
          path="/tournaments/play/:user_id/:gameId/:stakeValue/:roomID"
          element={<Tournaments navigateTo={navigateTo} />}
        />

        <Route
          path="/user-profile/*"
          element={
            <ProtectedRoute element={UserProfile} app_navigateTo={navigateTo} userLogout={userLogout} />
          }
        />

        <Route
          path="/deposit"
          element={<Deposit app_navigateTo={navigateTo} />}
        />

      </Routes>
    </ScrollTo>
  );
}
