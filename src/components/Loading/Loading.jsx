import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class Loading extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const { showFlag } = this.props
    return (
      <div className={showFlag ? "m-loading" : "m-loading f-hide"}>
        <i className="icn"></i>
        加载中...
      </div>
    )
  }
}

Loading.propTypes = {
  showFlag: PropTypes.bool
}

Loading.defaultProps = {
  showFlag: false
}

export default Loading