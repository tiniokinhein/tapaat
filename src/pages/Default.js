import { IonContent, IonPage } from '@ionic/react'
import React, { Component } from 'react'
import LoadingBackground from '../components/Layout/LoadingBackground'
import TopBar from '../components/Layout/TopBar'

export default class Default extends Component {
    render() {
        return (
            <IonPage>
                <TopBar />
                <IonContent fullscreen={true}>
                    <LoadingBackground />
                </IonContent>
            </IonPage>
        )
    }
}
