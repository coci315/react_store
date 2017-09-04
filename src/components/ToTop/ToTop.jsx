import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

let scrollHandle
import './style.scss'
class ToTop extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      showFlag: false
    }
  }
  render() {
    const { productCount } = this.props
    const { showFlag } = this.state
    return (
      <div className="m-2top">
        <div className="m-item m-unclick">
          <span>
            100%
            <br />
            正品
          </span>
        </div>
        <div className="m-item m-unclick">
          <span>七天无理由退货</span>
        </div>
        <div className="m-item shopcar">
          <span>
            <i className="icon"></i>
            <span className="f-pr">
              购物车
              <span className="f-pa num">{productCount}</span>
            </span>
          </span>
        </div>
        <div className="m-item kefu">
          <i className="icon"></i>
          <span className="f-pr">客服</span>
        </div>
        <div className={showFlag ? "m-item m-back" : "m-item m-back f-hide"}
          onClick={this.clickHandleOnBack.bind(this)}
        ></div>
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
      if (window.scrollY > 200) {
        this.show()
      } else {
        this.hide()
      }
    }, 100)
  }

  clickHandleOnBack() {
    const self = this
    const distance = document.body.scrollTop || document.documentElement.scrollTop
    const speed = distance / 5
    this.timerBack = setTimeout(function fn() {
      const top = document.body.scrollTop || document.documentElement.scrollTop
      if (top > 0) {
        document.body.scrollTop = document.documentElement.scrollTop = top - speed
        self.timerBack = setTimeout(fn, 20)
      } else {
        clearTimeout(self.timerBack)
      }
    }, 20)
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

ToTop.propTypes = {
  productCount: PropTypes.number
}

ToTop.defaultProps = {
  productCount: 0
}

export default ToTop