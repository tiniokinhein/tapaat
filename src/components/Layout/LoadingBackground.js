import React from 'react'
import IMG from '../../assets/images/logo.png'

export default function LoadingBackground() {

    return (
        <div className="h-100 d-flex w-100 justify-content-center align-items-center bg-transparent">
            <img
                src={IMG}
                alt=""
                width="100"
            />
        </div>
    )
}
