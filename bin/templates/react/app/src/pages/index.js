import ReactDom from "react-dom"
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import lazyLoadComponent from "lazy-load-component"
import {Provider} from "react-redux"
import browserHistory from "history/createBrowserHistory" // URL模式的history
import configureStore from "app/store/configureStore"

const Home = lazyLoadComponent(() => import("./home"))
const About = lazyLoadComponent(() => import("./about"))

const store = configureStore(browserHistory)

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="*" component={Home} />
        </Switch>
    </BrowserRouter>
)

ReactDom.render(
    <Provider store={store}>{routes()}</Provider>,
    document.getElementById("app")
)
