import { 
    IonButtons,
    IonContent, 
    IonHeader, 
    // IonLoading, 
    IonPage,
    IonRippleEffect,
    IonToolbar
} from '@ionic/react'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadingBackground from '../components/Layout/LoadingBackground'
import { db } from '../helpers/firebase'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Pagination from '../components/Pagination'
import { MdSlowMotionVideo } from 'react-icons/md'
import { withRouter } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { add_history } from '../store/history/action'



const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class CategoryId extends Component {
    
    state = {
        posts: [],
        loading: false,
        index: 0
    }

    getPosts = () => {
        const { id } = this.props.match.params

        this.setState({
            loading: true
        })

        // db
        // .collection('videos')
        // .orderBy('date','desc')
        // .onSnapshot((snapshot) => {
        //     const posts = []

        //     snapshot.forEach((snap) => {
        //         const { title , image , categories } = snap.data()

        //         posts.push({
        //             id: snap.id,
        //             snap,
        //             title,
        //             image,
        //             categories
        //         })
        //     })

        //     this.setState({
        //         posts: posts.filter(fr => fr.categories.find(f => f.id === id)),
        //         loading: false
        //     })            
        // })

        db 
        .ref('videos')
        .orderByChild('date')
        .on('value' , (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                lists.push(snap.val())
            })

            const data = lists.reverse()

            this.setState({
                posts: data.filter(fr => fr.categories.find(f => f.id === id)),
                loading: false
            })
        })
    }

    componentDidMount() {
        this.getPosts()
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

        const posts = this.state.posts.length ? (
            <>
                <AutoPlaySwipeableViews 
                    index={this.state.index} 
                    onChangeIndex={this.handleChangeIndex} 
                    className="h-100 AutoPlaySwipeableViews"
                    interval={8000}
                >
                    {
                        this.state.posts.map((p) => (
                            <div key={p.id} className="h-100 position-relative">
                                <img
                                    src={p.image}
                                    alt=""
                                    className="h-100 w-100"
                                    style={cssName.img}
                                />
                                <button
                                    className="btn position-absolute border-0 shadow-none p-0 rounded-0 font-e ion-activatable ripple-effect overflow-hidden"
                                    style={cssName.btnStyle}
                                    onClick={() => {
                                        this.props.history.push(`/video/${p.id}`)
                                        this.props.add_history(p)
                                    }}
                                    tappable="true"
                                >
                                    <MdSlowMotionVideo size="3.5rem" className="text-default" />
                                    <IonRippleEffect />
                                </button>
                            </div>
                        ))
                    }
                </AutoPlaySwipeableViews>
                <Pagination dots={this.state.posts.length} index={this.state.index} onChangeIndex={this.handleChangeIndex} />
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
                    <div className="position-absolute" style={cssName.layout}>
                        {posts}
                    </div>
                </IonContent>
            </IonPage>
        )
    }
}

export default connect(
    null,
    {add_history}
)(withRouter(CategoryId))