import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

import './style.scss'
class Bread extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    const { currentText, indexText, indexLink } = this.props
    return (
      <div className="m-bread">
        <div className="block">
          <span><Link to={indexLink}>{indexText}</Link></span>
          <span className="pointer">
            <i></i>
            {currentText}
          </span>
          {
            this.props.children ? (
              React.Children.map(this.props.children, child => child)
            ) : (
                <div className="share f-fr">分享</div>
              )
          }
        </div>
      </div>
    )
  }
}

Bread.propTypes = {
  currentText: PropTypes.string,
  indexText: PropTypes.string,
  indexLink: PropTypes.string
}

Bread.defaultProps = {
  currentText: '',
  indexText: '首页',
  indexLink: '/'
}

export default Bread