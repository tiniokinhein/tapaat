import { IonApp, IonContent, IonLoading } from '@ionic/react'
import React, { Component } from 'react'

export default class Loading extends Component {

    state = {
        loading: true
    }

    render() {
        return (
            <IonApp>
                <IonContent>
                    <IonLoading
                        cssClass='load-pre'
                        isOpen={this.state.loading}
                        onDidDismiss={() => this.setState({
                            loading: false
                        })}
                        message={'ခနစောင့်'}
                        duration={3000}
                    />
                </IonContent>
            </IonApp>
        )
    }
}
