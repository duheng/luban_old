import ReactDom from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'

import objectAssign from 'object-assign'
Object.assign = objectAssign

import configureStore from 'app/store/configureStore'

import Home from 'react-proxy?name=home!./home'
import About from 'react-proxy?name=about!./about'

const routes = (history) => (
    <Router history={history}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="*" component={Home} />
    </Router>
)

const store = configureStore(browserHistory)
const history = syncHistoryWithStore(browserHistory, store)

ReactDom.render(
    <Provider store={store}>
    { routes(history) }
    </Provider>, document.getElementById('app')
)
