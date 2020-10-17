import { 
    IonContent,
    IonFooter,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonLoading,
    IonMenu, 
    IonMenuToggle
} from '@ionic/react'
import React from 'react'
import { TiPower } from 'react-icons/ti'
import { GiFilmStrip, GiSandsOfTime } from 'react-icons/gi'
import { FiVideo } from 'react-icons/fi'
import { withRouter } from 'react-router-dom'
import { IoIosFilm } from 'react-icons/io'
import { auth } from '../../helpers/firebase'


class SideBar extends React.Component {

    state = {
        user: auth.currentUser,
        loading: false
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if(user) {
                this.setState({
                    user: auth.currentUser
                })
            } else {
                this.setState({
                    user: null
                })
            }
        })
    }

    handleSignOutFB = async () => {
        
        this.setState({
            loading: true
        })

        await auth.signOut()

        window.location.reload()

    }

    render() {

        const { user } = this.state

        return(
            <IonMenu side="start" contentId="main-menu">
                <IonContent className="ion-no-border">
                    <IonMenuToggle>
                        {
                            user ? (
                                <IonListHeader className="my-4 px-0" key={user.uid}>
                                    <img
                                        src={user.photoURL}
                                        alt=""
                                        width="60"
                                        className="rounded-circle m-3 shadow"
                                    />

                                    <IonLabel
                                        className="text-custom font-e font-weight-normal"
                                        style={{
                                            fontSize: '1.1rem',
                                            lineHeight: '1.5'
                                        }}
                                    >
                                        {user.displayName}
                                    </IonLabel>
                                </IonListHeader>
                            ) : null
                        }

                        <IonList lines="none">
                            <IonItem
                                onClick={() => this.props.history.push('/')}
                            >
                                <IoIosFilm size="1.5rem" className="text-custom mr-2" />
                                <IonLabel
                                    className="font-default"
                                    style={{
                                        fontSize: '1.1rem',
                                        lineHeight: '2',
                                        '--color': '#802bb1',
                                        cursor: 'pointer'
                                    }}
                                >
                                    အသစ်များ
                                </IonLabel>
                            </IonItem>
                            <IonItem
                                onClick={() => this.props.history.push('/categories')}
                            >
                                <GiFilmStrip size="1.5rem" className="text-custom mr-2" />
                                <IonLabel
                                    className="font-default"
                                    style={{
                                        fontSize: '1.1rem',
                                        lineHeight: '2',
                                        '--color': '#802bb1',
                                        cursor: 'pointer'
                                    }}
                                >
                                    အမျိုးအစားများ
                                </IonLabel>
                            </IonItem>
                            <IonItem
                                onClick={() => this.props.history.push('/watched')}
                            >
                                <FiVideo size="1.5rem" className="text-custom mr-2" />
                                <IonLabel
                                    className="font-default"
                                    style={{
                                        fontSize: '1.1rem',
                                        lineHeight: '2',
                                        '--color': '#802bb1',
                                        cursor: 'pointer'
                                    }}
                                >
                                    သိမ်းထားသော
                                </IonLabel>
                            </IonItem>
                            <IonItem
                                onClick={() => this.props.history.push('/history')}
                            >
                                <GiSandsOfTime size="1.5rem" className="text-custom mr-2" />
                                <IonLabel
                                    className="font-default"
                                    style={{
                                        fontSize: '1.1rem',
                                        lineHeight: '2',
                                        '--color': '#802bb1',
                                        cursor: 'pointer'
                                    }}
                                >
                                    ဝင်ကြည့်ထားသော
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonMenuToggle>

                    <IonLoading
                        cssClass='load-pre'
                        isOpen={this.state.loading}
                        onDidDismiss={() => this.setState({
                            loading: false
                        })}
                        message={'ခနစောင့်'}
                        duration={5000}
                    />

                </IonContent>

                <IonFooter className="ion-no-border">
                    <IonMenuToggle>
                        <IonList lines="none" className="p-0">
                            <IonItem
                                onClick={() => this.handleSignOutFB()}
                            >
                                <IonLabel
                                    className="font-default"
                                    style={{
                                        fontSize: '1rem',
                                        lineHeight: '2',
                                        '--color': '#802bb1',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <TiPower size="1.5rem" className="text-custom mr-2" />
                                    အကောင့်ထွက်မယ်
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonMenuToggle>
                </IonFooter>
            </IonMenu>
        )
    }
}

export default withRouter(SideBar)