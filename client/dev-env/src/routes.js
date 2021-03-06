import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './ui/App';
import LogIn from './auth/LogIn';
import {Provider} from 'react-redux';
import store from './redux/store';
import {setCurrentUser} from './redux/actions/authActions';
import SignUp from './auth/SignUp';
import DashBoard from './ui/DashBoard';
import NewPost from './ui/NewPost';
import Home from './ui/Home';
import ShowPost from './ui/ShowPost';
import EditPost from './ui/EditPost';

if (sessionStorage.jwtToken) {
    const user = JSON.parse(sessionStorage.user);
    store.dispatch(setCurrentUser(user));
}

const isAdmin = () => {
    if (!sessionStorage.getItem('jwtToken') && !sessionStorage.getItem('user')) {
        return false;
    }
    const user = JSON.parse(sessionStorage.getItem('user'));
    return user.admin;
};

const requireAuth = (nextState, replace) => {
    if (!isAdmin()) {
        replace('/')
    }
};

export const renderRoutes = () => (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Home}/>
                <Route path='/login' component={LogIn}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/dashboard' component={DashBoard} onEnter={requireAuth}/>
                <Route path='/posts/new' component={NewPost} onEnter={requireAuth}/>
                <Route path='/posts/:post_id' component={ShowPost}/>
                <Route path='/posts/:post_id/edit' component={EditPost} onEnter={requireAuth}/>
            </Route>
        </Router>
    </Provider>
);
