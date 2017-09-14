import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class BaseLayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showFlag: false
    }
  }
  render() {
    const { title } = this.props
    const { showFlag } = this.state
    return (
      <div className="m-layerwrap" style={{ display: showFlag ? "block" : "none" }}>
        <div className="mask"></div>
        <div className="m-layer" ref={(ele) => { this.layer = ele }}>
          <div className="zbar"
            onMouseDown={this.mouseDownHandle.bind(this)}
            onMouseMove={this.mouseMoveHandle.bind(this)}
            onMouseUp={this.mouseUpHandle.bind(this)}
          >
            <div className="zttl">{title}</div>
          </div>
          <div className="zcnt zcnt2">
            {this.props.children}
          </div>
          <span className="zcls" title="关闭窗体" onClick={this.hide.bind(this)}>x</span>
        </div>
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.mouseMoveHandle.bind(this))
    document.addEventListener('mouseup', this.mouseUpHandle.bind(this))
  }

  componentWillUnMount() {
    document.removeEventListener('mousemove', this.mouseMoveHandle.bind(this))
    document.removeEventListener('mouseup', this.mouseUpHandle.bind(this))
  }

  mouseDownHandle(e) {
    this.moving = true
    this.clientX = e.clientX
    this.clientY = e.clientY
  }

  mouseMoveHandle(e) {
    if (!this.moving) return
    const newClientX = e.clientX
    const newClientY = e.clientY
    const left = parseInt(this.layer.style.left || this.layer.getBoundingClientRect().left)
    const top = parseInt(this.layer.style.top || this.layer.getBoundingClientRect().top)
    const winWidth = window.innerWidth
    const winHeight = window.innerHeight
    const layerWidth = this.layer.offsetWidth
    const layerHeight = this.layer.offsetHeight
    let newLeft = left + (newClientX - this.clientX)
    if (newLeft < 0) {
      newLeft = 0
    }
    if (newLeft > (winWidth - layerWidth)) {
      newLeft = winWidth - layerWidth
    }
    let newTop = top + (newClientY - this.clientY)
    if (newTop < 0) {
      newTop = 0
    }
    if (newTop > (winHeight - layerHeight)) {
      newTop = winHeight - layerHeight
    }
    this.layer.style.left = newLeft + 'px'
    this.layer.style.top = newTop + 'px'
    this.clientX = newClientX
    this.clientY = newClientY
  }

  mouseUpHandle() {
    this.moving = false
  }

  show() {
    this.setState({
      showFlag: true
    })
    setTimeout(() => {
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight
      const layerWidth = this.layer.offsetWidth
      const layerHeight = this.layer.offsetHeight
      this.layer.style.left = (winWidth - layerWidth) / 2 + 'px'
      this.layer.style.top = (winHeight - layerHeight) / 2 + 'px'
    }, 20)
  }

  hide() {
    this.setState({
      showFlag: false
    })
  }
}

BaseLayer.propTypes = {
  title: PropTypes.string
}

BaseLayer.defaultProps = {
  title: '标题'
}

export default BaseLayer