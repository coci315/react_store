import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'

import './common/scss/index.scss'
import RouteMap from './router/RouterMap'

render(
    <RouteMap history={browserHistory} />,
    document.getElementById('root')
)
