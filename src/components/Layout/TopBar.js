import { IonButtons, IonHeader, IonMenuButton, IonRippleEffect, IonToolbar } from '@ionic/react'
import React, { Component } from 'react'
import { RiMenu4Line } from 'react-icons/ri'
// import { FiSearch } from 'react-icons/fi'

class TopBar extends Component {
    render() {
        return (
            <IonHeader className="ion-no-border">
                <IonToolbar style={{'--background': 'transparent'}}>
                    <IonButtons slot="start">
                        <IonMenuButton autoHide={false} style={{height:40}}>
                            <button
                                className="btn rounded-circle border-0 p-0 shadow-none position-relative overflow-hidden ion-activatable ripple-parent"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(86, 79, 111, 0.51)'
                                }}
                            >
                                <RiMenu4Line size="1rem" className="text-white" />
                                <IonRippleEffect />
                            </button>
                        </IonMenuButton>
                    </IonButtons>

                    {/* <IonButtons slot="end">
                        <button
                            className="btn mr-2 rounded-circle border-0 p-0 shadow-none position-relative overflow-hidden ion-activatable ripple-parent"
                            style={{
                                width: '40px',
                                height: '40px',
                                background: 'rgba(86, 79, 111, 0.51)'
                            }}
                        >
                            <FiSearch size="1rem" className="text-white" />
                            <IonRippleEffect />
                        </button>
                    </IonButtons> */}
                </IonToolbar>
            </IonHeader>
        )
    }
}

export default TopBar