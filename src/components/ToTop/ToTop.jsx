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
      showFlag: false,
      styleObj: {}
    }
  }
  render() {
    const { productCount, noCart } = this.props
    const { showFlag, styleObj } = this.state
    return (
      <div className="m-2top" style={styleObj}>
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
        {
          noCart ? '' : (
            <div className="m-item shopcar">
              <span>
                <i className="icon"></i>
                <span className="f-pr">
                  购物车
                <span className="f-pa num">{productCount}</span>
                </span>
              </span>
            </div>
          )
        }
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
    this.setInitStyle()
    scrollHandle = this.scrollHandle.bind(this)
    window.addEventListener('scroll', scrollHandle)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', scrollHandle)
  }

  scrollHandle() {
    const { changePoint } = this.props
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (window.scrollY > 200) {
        this.show()
      } else {
        this.hide()
      }

      if (window.scrollY > changePoint) {
        this.setFixedStyle()
      } else {
        this.setInitStyle()
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

  setInitStyle() {
    const { initTop } = this.props
    if (initTop > -1) {
      const styleObj = { position: 'absolute', top: initTop, marginTop: 0, bottom: 'auto' }
      this.setState({
        styleObj
      })
    }
  }

  setFixedStyle() {
    const { initTop } = this.props
    if (initTop > -1) {
      const styleObj = { position: 'fixed', top: '50%', marginTop: -138, bottom: 'auto' }
      this.setState({
        styleObj
      })
    }
  }
}

ToTop.propTypes = {
  productCount: PropTypes.number,
  initTop: PropTypes.number,
  changePoint: PropTypes.number,
  noCart: PropTypes.bool
}

ToTop.defaultProps = {
  productCount: 0,
  initTop: -1,
  changePoint: 310,
  noCart: false
}

export default ToTop