import React from "react";
import CustomSvg from "../svgs/CustomSvg";




const transactions = [
    {
        type: 'deposit',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
    {
        type: 'withdrawal',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
    {
        type: 'deposit',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
    {
        type: 'withdrawal',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
    {
        type: 'deposit',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
    {
        type: 'withdrawal',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
    {
        type: 'deposit',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
    {
        type: 'withdrawal',
        amount: 20000,
        date: '12-03-2024',
        ref: 'Ref - hercfwf40d836ab71701a8598'
    },
]


export default function TransacHistory(){

    const displayTransacHistory = transactions.map((transac, i) => {
        const { type, amount, date, ref } = transac

        return (
            <div
                key={i}
                className="d-flex align-items-center justify-content-between mb-4"
            >
                <div className="d-flex align-items-center">
                    <div className="p-2 rounded-circle user-profile-transac-history-transac-icon-container">
                        <CustomSvg name={type == 'withdrawal' ? 'withdrawal-arrow' : 'deposit-arrow'} />
                    </div>
                    <div className="mx-2 px-2">
                        <h5 className="m-0 p-0 mb-1 txt-FFF opacity-_8 font-weight-600 font-family-poppins small-txt">{ type == 'withdrawal' ? 'Cash Withdrawal' : 'Funds Added'}</h5>
                        <p className="m-0 p-0 txt-979797 extra-small-txt font-family-poppins font-weight-400 letter-spacing-_12">{ref}</p>
                    </div>
                </div>
                <div>
                    <h5 className={`${type == 'withdrawal' ? 'txt-E75547' : 'txt-4FC143'} m-0 p-0 mb-1 small-txt font-family-poppins font-weight-500`}>&#8358;{amount.toLocaleString()}</h5>
                    <p className="m-0 p-0 txt-979797 font-family-poppins extra-small-txt line-height-16 letter-spacing-_12 font-weight-400">{date}</p>
                </div>
            </div>
        )
    })

    return (
        <div className='dashboard py-lg-5 py-md-5 my-md-3 my-lg-3 my-0 py-2'>
            { displayTransacHistory }
        </div>
    )
}