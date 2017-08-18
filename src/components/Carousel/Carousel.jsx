import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class Carousel extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      curIndex: 0,
      showPoint: false
    }
  }
  render() {
    const { imgsData } = this.props
    const { curIndex, showPoint } = this.state
    return (
      <div className="m-carousel f-pr" onMouseOver={this.mouseOverHandle.bind(this)} onMouseOut={this.mouseOutHandle.bind(this)}>
        <ul className="f-pr clearfix">
          {imgsData.map((item, index) => {
            return (
              <li key={item.id} className={curIndex === index ? "f-pa active" : "f-pa"} style={{ backgroundImage: 'url(' + item.backendPicStr + ')' }}>
                <a href={item.url} className="f-pa w" target="_blank">
                  <img src={item.picStr} alt="banners" />
                </a>
              </li>
            )
          })}
        </ul>
        <div className="dots f-pa">
          {
            imgsData.map((item, index) => {
              return (
                <a key={item.id}
                  href="javascript:;"
                  className={curIndex === index ? "z-sel" : ""}
                  onClick={this.setCurIndex.bind(this, index)}
                ></a>
              )
            })
          }
        </div>
        {
          imgsData.length > 1 ? (
            <div className="point f-pr" style={{ display: showPoint ? "block" : "none" }}>
              <a href="javascript:;" className="left f-pa" onClick={this.goPrev.bind(this)}>
                <i className="tk"></i>
                <i className="bg"></i>
              </a>
              <a href="javascript:;" className="right f-pa" onClick={this.goNext.bind(this)}>
                <i className="tk"></i>
                <i className="bg"></i>
              </a>
            </div>
          ) : ''
        }

      </div>
    )
  }

  componentDidMount() {
    const { imgsData } = this.props
    if (imgsData.length > 1) {
      this.autoPlay()
    }
  }

  componentWillReceiveProps(nextProps) {
    const { imgsData } = nextProps
    if (imgsData.length > 1) {
      this.autoPlay()
    }
  }

  setCurIndex(index) {
    this.setState({
      curIndex: index
    })
  }

  goPrev() {
    let curIndex = this.state.curIndex
    const len = this.props.imgsData.length
    if (curIndex === 0) {
      curIndex = len - 1
    } else {
      curIndex -= 1
    }
    this.setCurIndex(curIndex)
  }

  goNext() {
    let curIndex = this.state.curIndex
    const len = this.props.imgsData.length
    if (curIndex === (len - 1)) {
      curIndex = 0
    } else {
      curIndex += 1
    }
    this.setCurIndex(curIndex)
  }

  autoPlay() {
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      this.goNext()
    }, this.props.duration)
  }

  showPoint() {
    this.setState({
      showPoint: true
    })
  }

  hidePoint() {
    this.setState({
      showPoint: false
    })
  }

  mouseOverHandle() {
    this.showPoint()
    clearInterval(this.timer)
  }

  mouseOutHandle() {
    this.hidePoint()
    this.autoPlay()
  }
}



Carousel.propTypes = {
  imgsData: PropTypes.array,
  duration: PropTypes.number
}

Carousel.defaultProps = {
  imgsData: [],
  duration: 3000
}

export default Carousel