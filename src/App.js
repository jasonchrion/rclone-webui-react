import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ErrorBoundary from "./ErrorHandling/ErrorBoundary";
import intl from 'react-intl-universal';
// common locale data
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/zh.js');

// app locale data
const locales = {
    "en-US": require('./locales/en-US.json'),
    "zh-CN": require('./locales/zh-CN.json'),
};

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {

    state = {initDone: false}

    componentDidMount() {
        this.loadLocales();
    }

    loadLocales() {
        // init method will load CLDR locale data according to currentLocale
        // react-intl-universal is singleton, so you should init it only once in your app
        intl.init({
            currentLocale: 'zh-CN', // TODO: determine locale here
            locales,
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({initDone: true});
        });
    }

    render() {
        return (
            this.state.initDone &&
            <div data-test="appComponent">
                <ErrorBoundary>
                    <ToastContainer/>
                    <HashRouter>
                        <React.Suspense fallback={loading()}>
                            <Switch>
                                <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>}/>
                                <Route exact path="/register" name="Register Page"
                                       render={props => <Register {...props}/>}/>
                                <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>}/>
                                <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>}/>
                                <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>}/>
                            </Switch>
                        </React.Suspense>
                    </HashRouter>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;
