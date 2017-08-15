import React from 'react'
import { render } from 'react-dom'
import { hashHistory } from 'react-router'

import './common/scss/index.scss'
import RouteMap from './router/RouterMap'

render(
    <RouteMap history={hashHistory}/>,
    document.getElementById('root')
)
