import React, { Component } from 'react'
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './assets/css/style.scss'
import './assets/css/theme.scss'
import './assets/css/media.scss'

import Home from './pages/Home'
import Login from './pages/Login'
import Video from './pages/Video'
import SideBar from './components/Layout/SideBar'
import Categories from './pages/Categories'
import CategoryId from './pages/CategoryId'
import History from './pages/History'
import Watched from './pages/Watched'
import { auth } from './helpers/firebase'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from './components/routes/PublicRoute'
import Loading from './components/Layout/Loading'
import Default from './pages/Default'


class App extends Component {

  state = {
    authenticated: false,
    loading: true
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }

  render() {

    return this.state.loading ? <Loading /> : (

        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet id="main-menu">
              <PrivateRoute  
                exact
                path="/" 
                authenticated={this.state.authenticated}
                component={Home}
              />
              <PrivateRoute
                path="/video/:id"
                authenticated={this.state.authenticated}
                component={Video}
              />
              <PrivateRoute
                path="/category/:id"
                authenticated={this.state.authenticated}
                component={CategoryId}
              />
              <PublicRoute 
                path="/login" 
                authenticated={this.state.authenticated}
                component={Login}
              />
              <PrivateRoute
                path="/categories"
                authenticated={this.state.authenticated}
                component={Categories}
              />
              <PrivateRoute
                path="/history"
                authenticated={this.state.authenticated}
                component={History}
              />
              <PrivateRoute
                path="/watched"
                authenticated={this.state.authenticated}
                component={Watched}
              />
              <PrivateRoute
                authenticated={this.state.authenticated}
                component={Default}
              />
            </IonRouterOutlet>

            <SideBar />

          </IonReactRouter>
        </IonApp>
    )
  }
}

export default App