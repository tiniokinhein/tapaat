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
import PropTypes from 'prop-types'
import LoadingBackground from '../components/Layout/LoadingBackground'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Pagination from '../components/Pagination'
import { MdSlowMotionVideo } from 'react-icons/md'
import { remove_watch , delete_all_watch } from '../store/watch/action'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { trashOutline } from 'ionicons/icons'
import { FaVideoSlash } from 'react-icons/fa'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class Watched extends Component {

    static propTypes = {
        watches: PropTypes.array.isRequired,
        delete_all_watch: PropTypes.func.isRequired,
        deleteWatch: PropTypes.object,
        trashAllWatches: PropTypes.object
    }
    
    state = {
        index: 0
    }

    handleChangeIndex = index => {
        this.setState({
          index
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.deleteWatch !== nextProps.deleteWatch) {
            this.remove_watch(nextProps.deleteWatch)
        }
        if(this.props.trashAllWatches !== nextProps.trashAllWatches) {
            this.delete_all_watch(nextProps.trashAllWatches)
        }
    }

    remove_watch = p => {
        const { watches } = this.props
        const index = watches.findIndex(f => f.id === p.id)
        if(index >= 0) {
            watches.splice(index,1)
            this.props.remove_watch()
        }
    }

    delete_all_watch = p => {
        const { watches } = this.props
        const index = watches.filter(f => f === p)
        if(index >= 0) {
            watches.splice(index)
        }
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
            }
        }

        const posts = this.props.watches.length ? (
            <>
                <AutoPlaySwipeableViews 
                    index={this.state.index} 
                    onChangeIndex={this.handleChangeIndex} 
                    className="h-100 AutoPlaySwipeableViews"
                    interval={8000}
                >
                    {
                        this.props.watches.map((p) => (
                            <div key={p.id} className="h-100 position-relative">
                                <img
                                    src={p.image}
                                    alt=""
                                    className="h-100 w-100"
                                    style={cssName.img}
                                />
                                <button
                                    className="btn position-absolute border-0 shadow-none p-0 rounded-0 ion-activatable ripple-effect overflow-hidden"
                                    style={cssName.btnStyle}
                                    onClick={() => this.props.history.push(`/video/${p.id}`)}
                                    tappable="true"
                                >
                                    <MdSlowMotionVideo size="3.5rem" className="text-default" />
                                    <IonRippleEffect />
                                </button>

                                <button
                                    className="btn position-absolute border-0 p-3 bg-default shadow-none rounded-circle ion-activatable ripple-effect overflow-hidden"
                                    onClick={() => this.props.remove_watch(p)}
                                    tappable="true"
                                    style={{
                                        // background: '#f34413',
                                        color: '#fff',
                                        left: '10px',
                                        bottom: '40px'
                                    }}
                                >
                                    <FaVideoSlash size="2rem" />
                                    <IonRippleEffect />
                                </button>

                            </div>
                        ))
                    }
                </AutoPlaySwipeableViews>
                <Pagination dots={this.props.watches.length} index={this.state.index} onChangeIndex={this.handleChangeIndex} />
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
                            this.props.watches.length ? (
                                <IonButtons slot="end">
                                    <button
                                        className="btn mr-2 rounded-circle border-0 p-0 text-white shadow-none position-relative overflow-hidden ion-activatable ripple-parent"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            background: 'rgba(86, 79, 111, 0.51)',
                                            lineHeight: 0
                                        }}
                                        onClick={() => this.props.delete_all_watch()}
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
    watches: state.watch.watch,
    deleteWatch: state.watch.watch_to_remove,
    trashAllWatches: state.watch.watch_to_all_delete
})

export default connect(
    mapStateToProps,
    { remove_watch , delete_all_watch }
)(withRouter(Watched))