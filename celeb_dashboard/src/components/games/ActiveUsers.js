import CustomSvg from "../svgs/CustomSvg";
import { IoMdShare } from "react-icons/io";
import { useState } from "react";
import DisplayUsers from "./auxiliary/DisplayUsers";
import ShareModal from "./auxiliary/ShareModal";
import { allUsers } from "./auxiliary/gamesAux";
import { useNavigate } from "react-router-dom";



export default function ActiveUsers({ btnTxt, btnFunc, multiSelect, maxPlayers }){

    const navigate = useNavigate()
    const navigateTo = path => navigate(path)

    return (
        <div className='d-flex w-100'>
            <div className="w-100">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h1 className='m-0 p-0 font-weight-700 font-family-quantico txt-large txt-FFF'>Active <span className='create-lobby-title-span'>Users</span></h1>
                    <IoMdShare color="#FFF" size={30} />
                </div>
                <div>
                    <DisplayUsers
                        users={allUsers}
                        btnTxt={btnTxt || 'share'}
                        btnFunc={btnFunc}
                        multiSelect={multiSelect}
                        maxSelect={maxPlayers-1}
                    />
                </div>
            </div>
        </div>
    )
}