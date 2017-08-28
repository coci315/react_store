import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class Page extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      crtIndex: 0
    }
  }
  render() {
    const { pagesNum } = this.props
    let arr = []
    for (let i = 0; i < pagesNum; i++) {
      arr[i] = i + 1
    }
    const { crtIndex } = this.state
    return (
      <div className="m-page">
        <a href="javascript:;"
          className={crtIndex === 0 ? "zbtn zprv disabled" : "zbtn zprv"}
          onClick={this.handleClickOnPrev.bind(this)}
        ></a>
        {
          arr.map((item, index) => {
            return (
              <a href="javascript:;"
                className={crtIndex === index ? "zpgi selected" : "zpgi"}
                key={item}
                onClick={this.handleClickOnPage.bind(this, index)}
              >
                {item}
              </a>
            )
          })
        }
        <a href="javascript:;"
          className={crtIndex === (pagesNum - 1) ? "zbtn znxt disabled" : "zbtn znxt"}
          onClick={this.handleClickOnNext.bind(this)}
        ></a>
      </div>
    )
  }

  // componentDidMount() {
  //   const { crtIndex } = this.props
  //   this.setState({
  //     crtIndex
  //   })
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { crtIndex } = nextProps
  //   this.setState({
  //     crtIndex
  //   })
  // }

  handleClickOnPage(index) {
    this.setPage(index)
  }

  handleClickOnPrev() {
    let { crtIndex } = this.state
    if (crtIndex === 0) {
      return
    } else {
      crtIndex -= 1
      this.setPage(crtIndex)
    }
  }

  handleClickOnNext() {
    let { crtIndex } = this.state
    let { pagesNum } = this.props
    if (crtIndex === (pagesNum - 1)) {
      return
    } else {
      crtIndex += 1
      this.setPage(crtIndex)
    }
  }

  setPage(index) {
    this.props.onPageChange && this.props.onPageChange(index)
    this.setState({
      crtIndex: index
    })
  }
}

Page.propTypes = {
  pagesNum: PropTypes.number,
  // crtIndex: PropTypes.number,
  onPageChange: PropTypes.func
}

Page.defaultProps = {
  pagesNum: 0
  // crtIndex: 0
}

export default Page