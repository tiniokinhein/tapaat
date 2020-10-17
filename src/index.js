import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import Loading from './components/Layout/Loading'
import * as serviceWorker from "./serviceWorker"

const initialState = {}

ReactDOM.render(
  <Provider store={store(initialState)}>
    <React.Suspense fallback={<Loading />}>
      <App useSuspense={true} />
    </React.Suspense>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.register()