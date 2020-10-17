import { 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonRippleEffect, 
    IonToolbar 
} from '@ionic/react'
import React, { Component } from 'react'
// import { FiSearch } from 'react-icons/fi'
import { withRouter } from 'react-router-dom'
import LoadingBackground from '../components/Layout/LoadingBackground'
import { db } from '../helpers/firebase'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Player , LoadingSpinner , ControlBar , VolumeMenuButton, BigPlayButton } from 'video-react'
import 'video-react/dist/video-react.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { add_watch , remove_watch } from '../store/watch/action'
import { FaVideoSlash } from 'react-icons/fa'
import { FiVideo } from 'react-icons/fi'



class Video extends Component {

    static propTypes = {
        watches: PropTypes.array.isRequired,
        addWatch: PropTypes.object,
        deleteWatch: PropTypes.object
    }

    state = {
        p: null,
        loading: false
    }

    getPost = () => {
        const { id } = this.props.match.params

        this.setState({
            loading: true
        })

        // db
        // .collection('videos')
        // .doc(id)
        // .onSnapshot((snap) => {
        //     const data = snap.data()
        //     const id = snap.id

        //     this.setState({
        //         p: {
        //             ...data,
        //             id
        //         },
        //         loading: false
        //     })
        // })

        db 
        .ref(`videos/${id}`)
        .on('value' , (snap) => {
            const data = snap.val()

            this.setState({
                p: data,
                loading: false
            })
        })
    }

    componentDidMount() {
        this.getPost()
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.getPost()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(this.props.match.params.id !== nextProps.match.params.id) {
            this.getPost()
        }

        if(this.props.addWatch !== nextProps.addWatch) {
            this.add_watch(nextProps.addWatch)
        }
        if(this.props.deleteWatch !== nextProps.deleteWatch) {
            this.remove_watch(nextProps.deleteWatch)
        }
    }

    add_watch = p => {
        const { watches } = this.props
        let videoInWatch = false
        watches.forEach(fr => {
            if(fr.id === p.id) {
                videoInWatch = true
            }
        })
        if(!videoInWatch) {
            watches.push(p)
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

    render() {

        const { p } = this.state

        const inWatch = this.props.watches ? this.props.watches.find(f => f.id === (p ? p.id : null)) : null

        const postList = p ? (
            <div 
                key={p.id} 
                className="position-absolute w-100 h-100" 
                style={{
                    top:0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "url("+ p.image +") top center / cover no-repeat"
                }}
            >
                <div
                    className="position-fixed"
                    style={{
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        // backgroundColor: '#2d283e',
                        // opacity: '0.9',
                        backdropFilter: 'blur(3px) brightness(0.1)'
                    }}
                />
                <div className="position-relative d-flex flex-grow-1 flex-column px-2 h-100 justify-content-between">
                    <div className="mt-4 pt-5">
                        <h4 
                            className="text-default font-e m-0"
                            style={{
                                fontWeight: '900',
                                fontSize: '3rem',
                                lineHeight: '1.2'
                            }}
                        >
                            {p.title}
                        </h4>
                        <h6
                            className="text-custom font-e mt-0 mb-2"
                            style={{
                                fontSize: '1.1rem',
                                lineHeight: '1.5'
                            }}
                        >
                            {p.year}
                        </h6>
                        <h6
                            className="font-default mt-0 mb-4"
                            style={{
                                fontSize: '1.3rem',
                                lineHeight: '1.5',
                                color: '#f34413'
                            }}
                        >
                            {
                                p.categories.length <= 1 ? (
                                    p.categories.map((n) => (
                                        <small key={n.id} onClick={() => this.props.history.push(`/category/${n.id}`)} tappable="true">&#8212; {n.title}</small>
                                    ))
                                ) : (
                                    p.categories.map((n) => (
                                        <small key={n.id} className="mr-3" onClick={() => this.props.history.push(`/category/${n.id}`)} tappable="true">&#8212; {n.title}</small>
                                    ))
                                )
                            }
                        </h6>
                        <div className="d-flex">
                            <a
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1 font-e text-custom bg-default rounded shadow text-decoration-none position-relative ion-activatable ripple-effect overflow-hidden"
                                style={{
                                    fontSize: '1.2rem',
                                    lineHeight: '2',
                                    letterSpacing: '2px',
                                    fontWeight: '900'
                                }}
                            >
                                IMDB
                                <IonRippleEffect />
                            </a>

                            {
                                inWatch ? (
                                    <button
                                        className="btn ion-activatable ripple-effect ml-3 px-3 py-0 rounded border-0 shadow-none position-relative overflow-hidden"
                                        onClick={() => this.props.remove_watch(p)}
                                        style={{
                                            color: '#f34413'
                                        }}
                                    >
                                        <FaVideoSlash size="2rem" />
                                        <IonRippleEffect />
                                    </button>
                                ) : (
                                    <button
                                        className="btn ion-activatable ripple-effect ml-3 px-3 py-0 rounded border-0 shadow-none position-relative overflow-hidden"
                                        onClick={() => this.props.add_watch(p)}
                                        style={{
                                            color: '#f34413'
                                        }}
                                    >
                                        <FiVideo size="2rem" />
                                        <IonRippleEffect />
                                    </button>
                                )
                            }
                            
                        </div>
                    </div>

                    <div className="mx-n2 mb-0 mt-4">
                        <Player
                            playsInline
                            poster={p.image}
                            src={p.video}
                            className="v-player"
                        >
                            <LoadingSpinner />
                            <BigPlayButton position="center" />
                            <ControlBar autoHide={true}>
                                <VolumeMenuButton vertical />
                            </ControlBar>
                        </Player>
                    </div>
                </div>
            </div>
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

                <IonContent fullscreen={true}>
                    {postList}
                </IonContent>
            </IonPage>
        )
    }
}

const mapStateToProps = state => ({
    watches: state.watch.watch,
    addWatch: state.watch.watch_to_add,
    deleteWatch: state.watch.watch_to_remove,
})

export default connect(
    mapStateToProps,
    {
        add_watch,
        remove_watch
    }
)(withRouter(Video))