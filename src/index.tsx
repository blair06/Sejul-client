import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// CSS 
// 브라우저 공통 사항 초기화용 
import './scss/reset.css';
// SCSS
import './scss/global.scss';

// COMPONENTS
import { Navbar, UserInfoHeader, SubNavbar, Footer } from './components';

import 'moment/locale/ko';

// VIEWS
import MainView from './views/MainView';
import NotFoundView from './views/NotFoundView';
import SignInView from './views/SignInView';
import NewSignInView from './views/NewSignInView';
import NewSignUpView from './views/NewSignUpView';
import SearchView from './views/SearchView';
import SearchView_2 from './views/SearchSummaryView';
import SignUpView from './views/SignUpView';
import SummaryDetailView from './views/SummaryDetailView';
//userinfoview
import UserFollowing from './views/UserInfoView/UserFollowing';
import UserInfoView from './views/UserInfoView';
import UserHashTag from './views/UserInfoView/UserHashTag/UserHashTag';
import UserLike from './views/UserInfoView/UserLike/UserLike';
import UserSummaryList from './views/UserInfoView/UserSummaryList/UserSummaryList';
import UserScrap from './views/UserInfoView/UserScrap/UserScrap';

import SummaryView from './views/SummaryView';

// ROUTER
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// REDUX
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';
import rootReducer from './modules';

// Google Analytics
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';





// Google Analytics initialize
const history = createBrowserHistory();
history.listen(({ location }) => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

// Redux store initialize
/* eslint-disable no-underscore-dangle */

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(Thunk)),
);
/* eslint-enable */

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router >
        <Navbar />
        <Switch>
          <Route exact path="/" component={MainView}></Route>
          <Route path="/signin" component={NewSignInView} />
          <Route path="/signup" component={NewSignUpView} />
          <Route path="/search" >

            <div className="__container__" >
              <SubNavbar className="__search-navbar" links={
                [
                  { to: '/search/topic/', text: '기사 검색' },
                  { to: '/search/summary/', text: '글 검색' }
                ]
              } />
              <Switch>
                <Route exact path="/search">
                  <Redirect to="/search/topic" />
                </Route>
                <Route path="/search/topic" component={SearchView} />
                <Route path="/search/summary" component={SearchView_2} />
              </Switch>
            </div>
          </Route>

          {/* <Route path="/user/:user_name/summary" component={UserInfoView} /> */}
          <Route path="/user/:username">
            <div className="__user-info-container">
              <UserInfoHeader />
              <Switch>
                {/* <Route exact path="/user/:username" component={UserFollowing} /> */}
                <Route path="/user/:username/summaries" component={UserSummaryList} />
                <Route path="/user/:username/following" component={UserFollowing} />
                <Route path="/user/:username/hashtag" component={UserHashTag} />
                <Route path="/user/:username/likes" component={UserLike} />
                <Route path="/user/:username/scrap" component={UserScrap} />
              </Switch>
            </div>
          </Route>
          <Route exact path="/summary" component={SummaryView} />
          <Route path="/summary/:summaryId" component={SummaryDetailView} />
          <Route path="*" component={NotFoundView} />
        </Switch>

      </Router>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
