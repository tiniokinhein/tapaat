import { 
    IonContent, 
    IonLoading, 
    IonPage,
    IonRippleEffect
} from '@ionic/react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import LoadingBackground from '../components/Layout/LoadingBackground'
import TopBar from '../components/Layout/TopBar'
import { db } from '../helpers/firebase'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Pagination from '../components/Pagination'
import { MdSlowMotionVideo } from 'react-icons/md'



const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class Categories extends Component {
    
    state = {
        posts: [],
        loading: false,
        index: 0
    }

    getPosts = () => {

        this.setState({
            loading: true
        })

        // db
        // .collection('categories')
        // .orderBy('title','asc')
        // .onSnapshot((snapshot) => {
        //     const posts = []

        //     snapshot.forEach((snap) => {
        //         const { title , image } = snap.data()

        //         posts.push({
        //             id: snap.id,
        //             snap,
        //             title,
        //             image
        //         })
        //     })

        //     this.setState({
        //         posts,
        //         loading: false
        //     })            
        // })

        db 
        .ref('categories')
        .orderByChild('title')
        .on('value' , (snapshot) => {
            const lists = []

            snapshot.forEach((snap) => {
                lists.push(snap.val())
            })

            const data = lists

            this.setState({
                posts: data,
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
                            <div 
                                key={p.id} 
                                className="h-100 position-relative"
                                style={{
                                    background: "url("+ p.image +") center / cover no-repeat"
                                }}
                            >
                                <div
                                    className=""
                                    style={{
                                        backdropFilter: 'sepia(1.5)',
                                        height: '100vh'
                                    }}
                                />
                                <button
                                    className="btn position-absolute border-0 shadow-none p-0 rounded-0 font-default ion-activatable ripple-effect overflow-hidden"
                                    style={cssName.btnStyle}
                                    onClick={() => this.props.history.push(`/category/${p.id}`)}
                                    tappable="true"
                                >
                                    {p.title} <MdSlowMotionVideo size="3.5rem" className="text-default" />
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
                <TopBar />
                <IonContent fullscreen={true}>
                    <div className="position-absolute" style={cssName.layout}>
                        {posts}
                    </div>

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
            </IonPage>
        )
    }
}

export default withRouter(Categories)