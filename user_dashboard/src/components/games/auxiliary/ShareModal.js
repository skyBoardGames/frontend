import { Modal } from "react-bootstrap";
import CustomSvg from "../../svgs/CustomSvg";
import facebook from '../../../assets/images/facebook.png'
import twitter from '../../../assets/images/twitter.png'
import tiktok from '../../../assets/images/tiktok.png'
import weChat from '../../../assets/images/weChat.png'
import sms from '../../../assets/images/sms.png'
import instagram from '../../../assets/images/instagram.png'
import yahooMail from '../../../assets/images/yahooMail.png'
import whatsApp from '../../../assets/images/whatsApp.png'


const mediaHandles1 = [
    {
        name: 'WhatsApp',
        img: whatsApp,
    },
    {
        name: 'Twitter',
        img: twitter,
    },
    {
        name: 'Facebook',
        img: facebook,
    },
    {
        name: 'Instagram',
        img: instagram,
    },
]

const mediaHandles2 = [
    {
        name: 'Yahoo',
        img: yahooMail,
    },
    {
        name: 'Tiktok',
        img: tiktok,
    },
    {
        name: 'Chat',
        img: sms,
    },
    {
        name: 'WeChat',
        img: weChat,
    },
]



export default function ShareModal({ modalProps }){

    if(modalProps){

        const { visible, onHide, size } = modalProps

        const displayMediaHandles = ({ handles }) => handles.map((handle, i) => {
            const { name, img } = handle

            return (
                <div 
                    key={i}
                    className="col-lg-2"
                >
                    <div className="d-flex align-items-center justify-content-center mb-1">
                        <img src={img} />
                    </div>
                    <p className="text-center m-0 p-0 txt-000 font-family-source-sans extra-small-txt font-weight-600">{name}</p>
                </div>
            )
        })

        return (
            <Modal
                show={visible}
                onHide={onHide}
                size={size ? size : 'sm'}
                centered={true}
            >
                <div className="py-4 px-4 mx-3">
                    <div 
                        onClick={onHide}
                        className="d-flex align-items-center justify-content-end mb-2 clickable"
                    >
                        <CustomSvg name='x' />
                    </div>

                    <h4 className="p-0 m-0 mb-4 txt-130828 text-center font-family-quantico font-weight-700 line-height-30 letter-spacing-_32 medium-txt">Share With Friends</h4>
                    
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        { displayMediaHandles({ handles: mediaHandles1 }) }
                    </div>

                    <div className="d-flex align-items-center justify-content-between pb-4">
                        { displayMediaHandles({ handles: mediaHandles2 }) }
                    </div>
                </div>                
            </Modal>
        )
    }

    return <></>
}