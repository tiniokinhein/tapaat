import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import BG from '../assets/images/loginScreen.gif'
import LOGO from '../assets/images/logo.png'
import { IonContent, IonImg, IonPage, IonRippleEffect, IonText } from '@ionic/react'
import firebase from 'firebase/app'
import { auth } from '../helpers/firebase'


class Login extends Component {

    async loginSubmit() {

        const provider = new firebase.auth.FacebookAuthProvider()

        await 
        auth
        .signInWithPopup(provider.setCustomParameters({'display': 'popup'}))
        .then(() => {
            
        })
        .catch((error) => {
            var errorMessage = error.message
            console.log('Error', errorMessage)
        })

    }
    
    render() {

        const fbList = (
            <button
                className="btn mx-3 mt-5 font-default text-white shadow-none ion-activatable ripple-parent overflow-hidden position-relative"
                style={{
                    borderRadius: '1rem',
                    background: 'rgba(186,20,112,0.29)',
                    fontSize: '1.2rem',
                    padding: '0.8rem 4rem',
                    lineHeight: '2',
                    border: '2px solid #bb156e'
                }}
                onClick={() => this.loginSubmit()}
            >
                Facebook နှင့် ဝင်မည်
                <IonRippleEffect type="bounded" />
            </button>
        )

        return (
            <IonPage>
                <IonContent fullscreen={true}>
                    <div 
                        style={{
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        }}
                        className="screen-wrap position-absolute"
                    >
                        <IonImg
                            src={BG}
                            style={{
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                        />
                        <div
                            style={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0
                            }}
                            className="screen-wrap position-absolute"
                        >
                            <div
                                className="ion-align-items-center ion-text-center d-flex h-100 flex-grow-1"
                            >
                                <div className="d-flex flex-column align-items-center">
                                    <img
                                        src={LOGO}
                                        alt=""
                                        width="60%"
                                    />
                                    {fbList}
                                </div>

                                <IonText
                                    style={{
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        fontSize: '0.6rem',
                                        letterSpacing: '6px',
                                        wordSpacing: '5px',
                                        color: '#000'
                                    }}
                                    className="ion-text-center position-fixed mb-4 ion-text-uppercase font-e"
                                >
                                    Powered by Modern Nobody
                                </IonText>
                            </div>
                        </div>
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

export default withRouter(Login)