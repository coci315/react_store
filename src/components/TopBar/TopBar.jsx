import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

let scrollHandle
import './style.scss'
class TopBar extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      showFlag: false
    }
  }
  render() {
    const { name, picUrls, currentPrice } = this.props
    const { showFlag } = this.state
    return (
      <div className={showFlag ? "m-topbar show" : "m-topbar"}>
        <div className="topbarctn f-cb">
          <div className="imgbox f-fl">
            {picUrls.length ? <img src={picUrls[0]} alt="" /> : ''}
          </div>
          <div className="prtmsg f-fl">
            <p className="f-thide">{name}</p>
            <span>￥{currentPrice}</span>
          </div>
          <div className="topbarbtn f-fr">
            <a href="javascript:;" className="f-fl u-btn u-btn-white u-btn-white-2">立即购买</a>
            <a href="javascript:;" className="f-fl u-btn u-btn-red u-btn-red-1 u-btn-red-3">
              <i className="u-icn u-icn-7"></i>
              加入购物车
            </a>
          </div>
        </div>
        <div className="border f-pa"></div>
      </div>
    )
  }

  componentDidMount() {
    scrollHandle = this.scrollHandle.bind(this)
    window.addEventListener('scroll', scrollHandle)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', scrollHandle)
  }

  scrollHandle() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (window.scrollY > 850) {
        this.show()
      } else {
        this.hide()
      }
    }, 100)
  }

  show() {
    this.setState({
      showFlag: true
    })
  }

  hide() {
    this.setState({
      showFlag: false
    })
  }
}

TopBar.propTypes = {
  name: PropTypes.string,
  picUrls: PropTypes.array
}

TopBar.defaultProps = {
  name: '',
  picUrls: [],
  currentPrice: ''
}

export default TopBar