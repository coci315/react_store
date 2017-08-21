import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class ImgDisplay extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      currentPicIndex: 0,
      showArrow: false,
      showBigImg: false
    }
  }
  render() {
    const { picUrls } = this.props
    const len = picUrls.length
    const { currentPicIndex, showArrow, showBigImg } = this.state
    const ulMarginLeft = this._getUlMarginLeft(currentPicIndex, len)
    return (
      <div className="img-display">
        <div className="pic f-pr" onMouseOver={this.showArrow.bind(this)} onMouseOut={this.hideArrow.bind(this)}>
          <div className="imgbox"
            onMouseMove={this.onImgBoxMouseMove.bind(this)}
            onMouseOut={this.onImgBoxMouseOut.bind(this)}
            ref={(ele) => { this.imgBox = ele }}
          >
            <img src={picUrls[currentPicIndex] + '?param=440y440'} alt="" className="img1" />
            <div className="smallmask" ref={(ele) => { this.smallMask = ele }} style={{ display: showBigImg ? "block" : "none" }}></div>
          </div>
          <div className="bigimgbox" style={{ display: showBigImg ? "block" : "none" }}>
            <img src={picUrls[currentPicIndex]} alt="" ref={(ele) => { this.bigImg = ele }} />
          </div>
          <span className="arrowleft" onClick={this.goPrev.bind(this)} style={{ display: (currentPicIndex !== 0 && showArrow) ? "block" : "none" }}>
            <i className="u-icn u-arrowl"></i>
          </span>
          <span className="arrowright" onClick={this.goNext.bind(this)} style={{ display: (currentPicIndex !== (len - 1) && showArrow) ? "block" : "none" }}>
            <i className="u-icn u-arrowr"></i>
          </span>
          <div className="u-num">
            <em className="numctn">
              {currentPicIndex + 1}/{len}
            </em>
          </div>
        </div>
        <div className="smnav f-pr">
          <ul className="clearfix" style={{ marginLeft: ulMarginLeft + 'px' }}>
            {
              picUrls.map((item, index) => {
                return (
                  <li className={currentPicIndex === index ? "z-sel" : ""} key={picUrls[index]} onClick={this.changeCurIndex.bind(this, index)}>
                    <img src={picUrls[index] + '?param=76y76'} alt="" />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  changeCurIndex(index) {
    this.setState({
      currentPicIndex: index
    })
  }

  onImgBoxMouseMove(e) {
    this.showBigImg()
    const rect = this.imgBox.getBoundingClientRect()
    const top = Math.floor(rect.top)
    const left = Math.floor(rect.left)
    // console.log((e.clientX - left) + ' ---- ' + (e.clientY - top))
    const posX = e.clientX - left
    const posY = e.clientY - top
    let smallMaskLeft = posX - 110
    if (smallMaskLeft < 0) {
      smallMaskLeft = 0
    }
    if (smallMaskLeft > 220) {
      smallMaskLeft = 220
    }
    let smallMaskTop = posY - 110
    if (smallMaskTop < 0) {
      smallMaskTop = 0
    }
    if (smallMaskTop > 220) {
      smallMaskTop = 220
    }
    let bigImgLeft = smallMaskLeft / 220 * 530
    let bigImgTop = smallMaskTop / 220 * 530
    this.smallMask.style.left = smallMaskLeft + 'px'
    this.smallMask.style.top = smallMaskTop + 'px'
    this.bigImg.style.left = (bigImgLeft === 0 ? 0 : -bigImgLeft) + 'px'
    this.bigImg.style.top = (bigImgTop === 0 ? 0 : -bigImgTop) + 'px'
  }

  onImgBoxMouseOut() {
    this.hideBigImg()
  }

  goPrev() {
    let { currentPicIndex } = this.state
    currentPicIndex -= 1
    if (currentPicIndex < 0) {
      currentPicIndex = 0
    }
    this.changeCurIndex(currentPicIndex)
  }

  goNext() {
    let { currentPicIndex } = this.state
    const { picUrls } = this.props
    const len = picUrls.length
    currentPicIndex += 1
    if (currentPicIndex > (len - 1)) {
      currentPicIndex = len - 1
    }
    this.changeCurIndex(currentPicIndex)
  }

  showArrow() {
    this.setState({
      showArrow: true
    })
  }

  hideArrow() {
    this.setState({
      showArrow: false
    })
  }

  showBigImg() {
    this.setState({
      showBigImg: true
    })
  }

  hideBigImg() {
    this.setState({
      showBigImg: false
    })
  }

  _getUlMarginLeft(currentPicIndex, picUrlsLen) {
    const count = picUrlsLen - 5
    if (currentPicIndex <= 2) {
      return 0
    } else {
      if (count <= 0) {
        return 0
      } else {
        return -(Math.min(currentPicIndex - 2, count) * 90)
      }
    }
  }
}

ImgDisplay.propTypes = {
  picUrls: PropTypes.array
}

ImgDisplay.defaultProps = {
  picUrls: []
}

export default ImgDisplay