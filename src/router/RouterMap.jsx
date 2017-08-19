import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from '../containers/App'
import Home from '../containers/Home/Home'
import Search from '../containers/Search/Search'
import Detail from '../containers/Detail/Detail'
import NotFound from '../containers/NotFound/NotFound'
import Dgalbum from '../containers/Dgalbum/Dgalbum'
import Column from '../containers/Column/Column'

class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home} />
                    <Route path='/search' component={Search} />
                    <Route path='/dgalbum' component={Dgalbum} />
                    <Route path='/column' component={Column} />
                    <Route path='/detail/:id' component={Detail} />
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        )
    }
}

export default RouterMap
