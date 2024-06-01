import React from "react";
import img1 from '../../assets/images/userProfile1.png'
import img2 from '../../assets/images/userProfile2.png'
import img3 from '../../assets/images/userProfile3.png'
import img4 from '../../assets/images/userProfile4.png'
import logo from '../../assets/images/logowithname.svg'


const notifications = [
    {
        text: 'James Dan has requested for you to join a tournament that is hosted by Michael',
        date: 'February 23, 2024',
        senderProfile: img1,
        bgClass: '',
        type: 'normal'
    },
    {
        text: 'James Dan has requested for you to join a tournament that is hosted by Michael',
        date: 'February 1, 2024',
        senderProfile: img2,
        type: 'normal',
    }, 
    {
        text: 'Update your skyboard details, treat this with urgency',
        date: 'January 21, 2024',
        senderProfile: 'skyBoard',
        type: 'urgent'
    }, 
    {
        text: 'James Dan has requested for you to join a tournament that is hosted by Michael',
        date: 'February 1, 2024',
        senderProfile: img1,
        type: 'normal'
    }, 
    {
        text: 'James Dan has requested for you to join a tournament that is hosted by Michael',
        date: 'January 10, 2024',
        senderProfile: img2,
        type: 'normal'
    }, 
    {
        text: 'Skyboard has added a new game, check it out',
        date: 'December 31, 2023',
        senderProfile: 'skyBoard',
        type: 'normal'
    }, 
    {
        text: 'James Dan has requested for you to join a tournament that is hosted by Michael',
        date: 'December 11, 2023',
        senderProfile: img3,
        type: 'normal'
    }, 
    {
        text: 'James Dan has requested for you to join a tournament that is hosted by Michael',
        date: 'December 1, 2023',
        senderProfile: img4,
        type: 'normal'
    },                            
]


export default function Notifications(){

    const displayNotifications = notifications.map((notify, i) => {
        const { text, date, senderProfile, type } = notify

        return (
            <div
                key={i}
                className="d-lg-flex d-md-flex d-block align-items-center mb-4"
            >
                <div className="d-lg-block d-md-block d-flex align-items-center justify-content-start mb-lg-0 mb-md-0 mb-2">
                    <div className={`${senderProfile == 'skyBoard' ? 'col-lg-12' : 'bg-FFD2B1 rounded-circle d-flex align-items-center justify-content-center p-1'}`}>
                        <img className={`${senderProfile == 'skyBoard' && 'col-lg-12'}`} src={senderProfile == 'skyBoard' ? logo : senderProfile} />
                    </div>
                </div>

                <div className="mx-lg-4 mx-md-4 mx-0 w-100">
                    <h4 className="m-0 p-0 mb-2 regular-txt font-family-poppins txt-FFF font-weight-400 opacity-_8">{text}</h4>
                    <p className="m-0 p-0 txt-BD3193 font-weight-400 font-family-poppins opacity-_7 line-height-18">{date}</p>
                </div>
            </div>
        )
    })

    return (
        <div className='dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2'>
            { displayNotifications }
        </div>
    )
}