import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    IonIcon,  
    IonPage,
    IonRippleEffect,
    IonToolbar
} from '@ionic/react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBackground from '../components/Layout/LoadingBackground'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Pagination from '../components/Pagination'
import { MdSlowMotionVideo } from 'react-icons/md'
import { remove_history } from '../store/history/action'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { trashOutline } from 'ionicons/icons'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class History extends Component {
    
    state = {
        index: 0
    }

    handleChangeIndex = index => {
        this.setState({
          index
        })
    }

    render() {

        const cssName = {
            layout: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            img: {
                objectFit: 'cover',
                objectPosition: 'top center'
            },
            btnStyle: {
                right: '10px',
                bottom: '40px',
                lineHeight: '2',
                fontSize: '1.2rem',
                fontWeight: '900',
                color: '#f34413',
                whiteSpace: 'nowrap'
            }
        }

        const posts = this.props.historys.length ? (
            <>
                <AutoPlaySwipeableViews 
                    index={this.state.index} 
                    onChangeIndex={this.handleChangeIndex} 
                    className="h-100 AutoPlaySwipeableViews"
                    interval={8000}
                >
                    {
                        this.props.historys
                        .reduce((ac,current) => {
                            const x = ac.find(f => f.id === current.id)
                            if(!x) {
                                return ac.concat([current])
                            } else {
                                return ac
                            }
                        }, [])
                        .map((p) => (
                            <div key={p.id} className="h-100 position-relative">
                                <img
                                    src={p.image}
                                    alt=""
                                    className="h-100 w-100"
                                    style={cssName.img}
                                />
                                <button
                                    className="btn position-absolute border-0 shadow-none p-0 rounded-0 font-default ion-activatable ripple-effect overflow-hidden"
                                    style={cssName.btnStyle}
                                    onClick={() => this.props.history.push(`/video/${p.id}`)}
                                    tappable="true"
                                >
                                    <MdSlowMotionVideo size="3.5rem" className="text-default" />
                                    <IonRippleEffect />
                                </button>
                            </div>
                        ))
                    }
                </AutoPlaySwipeableViews>
                <Pagination 
                    dots={
                        this.props.historys
                        .reduce((ac,current) => {
                            const x = ac.find(f => f.id === current.id)
                            if(!x) {
                                return ac.concat([current])
                            } else {
                                return ac
                            }
                        }, [])
                        .length
                    } 
                    index={this.state.index} 
                    onChangeIndex={this.handleChangeIndex} 
                />
            </>
        ) : (
            <LoadingBackground />
        )

        return (
            <IonPage>
                <IonHeader className="ion-no-border">
                    <IonToolbar style={{'--background': 'transparent'}}>
                        <IonButtons slot="start">
                            <button
                                className="btn ml-2 rounded-circle border-0 p-0 shadow-none position-relative overflow-hidden ion-activatable ripple-parent"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    background: 'rgba(86, 79, 111, 0.51)'
                                }}
                                onClick={() => this.props.history.goBack()}
                                tappable="true"
                            >
                                <IoMdArrowRoundBack size="1rem" className="text-white" />
                                <IonRippleEffect />
                            </button>
                        </IonButtons>
                        
                        {
                            this.props.historys.length ? (
                                <IonButtons slot="end">
                                    <button
                                        className="btn mr-2 rounded-circle border-0 p-0 text-white shadow-none position-relative overflow-hidden ion-activatable ripple-parent"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'rgba(86, 79, 111, 0.51)',
                                            lineHeight: 0
                                        }}
                                        onClick={() => this.props.remove_history()}
                                    >
                                        
                                        <IonIcon icon={trashOutline} size="1rem" className="text-white" ></IonIcon>
                                        <IonRippleEffect />
                                    </button>
                                </IonButtons>
                            ) : null
                        }
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen={true}>
                    <div className="position-absolute" style={cssName.layout}>
                        {posts}
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

const mapStateToProps = state => ({
    historys: state.history
})

export default connect(
    mapStateToProps,
    {remove_history}
)(withRouter(History))