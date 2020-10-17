import { 
    IonContent, 
    IonPage,
    IonRippleEffect
} from '@ionic/react'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBackground from '../components/Layout/LoadingBackground'
import TopBar from '../components/Layout/TopBar'
import { db } from '../helpers/firebase'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Pagination from '../components/Pagination'
import { MdSlowMotionVideo } from 'react-icons/md'
import { add_history } from '../store/history/action'
import Refresher from '../components/Layout/Refresher'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

class Home extends Component {
    
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
        //         posts,
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
                        this.state.posts.slice(0,6).map((p) => (
                            <div key={p.id} className="h-100 position-relative">
                                <img
                                    src={p.image}
                                    alt=""
                                    className="h-100 w-100"
                                    style={cssName.img}
                                />
                                <button
                                    className="btn position-absolute border-0 shadow-none p-0 rounded-circle font-default ion-activatable ripple-effect overflow-hidden"
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
                <TopBar />
                <IonContent fullscreen={true}>

                    <Refresher />

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
    {add_history}
)(withRouter(Home))