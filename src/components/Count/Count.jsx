import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class Count extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      count: 1
    }
  }
  render() {
    const { count } = this.state
    const { min, max } = this.props
    return (
      <div className="m-count">
        <p className="number">数量：</p>
        <div className="u-counter f-fl">
          <a href="javascript:;"
            className={count === min ? "btn btn-dis" : "btn"}
            onClick={this.minusOne.bind(this)}
          >
            <i className="u-icn u-icn-27"></i>
          </a>
          <span className="tot">
            <input type="text"
              className="f-fs14"
              value={count}
              onChange={this.changeHandle.bind(this)}
            />
          </span>
          <a href="javascript:;"
            className={count === max ? "btn btn-dis" : "btn"}
            onClick={this.plusOne.bind(this)}
          >
            <i className="u-icn u-icn-28"></i>
          </a>
        </div>
      </div>
    )
  }

  changeHandle(e) {
    const { min, max } = this.props
    let count = e.target.value
    const last = count.slice(-1)
    if (/\d/.test(last)) {
      count = Number(count)
    } else {
      count = Number(count.slice(0, -1))
    }
    if (count < min) {
      count = min
    }
    if (count > max) {
      count = max
    }
    this._changeCount(count)
  }

  minusOne() {
    let { count } = this.state
    const { min } = this.props
    count -= 1
    if (count < min) {
      count = min
    }
    this._changeCount(count)
  }

  plusOne() {
    let { count } = this.state
    const { max } = this.props
    count += 1
    if (count > max) {
      count = max
    }
    this._changeCount(count)
  }

  _changeCount(count) {
    this.setState({
      count
    })
    this.props.onChange && this.props.onChange(count)
  }
}

Count.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func
}

Count.defaultProps = {
  min: 1,
  max: 50
}

export default Count