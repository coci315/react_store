import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'
class NoResult extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="m-noresult">
        <div className="icon"></div>
      </div>
    )
  }
}

export default NoResult