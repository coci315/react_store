import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
let hide
class Select extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      showFlag: false,
      curIndex: 0
    }
  }
  render() {
    const { showFlag, curIndex } = this.state
    const { data } = this.props
    return (
      <div className="u-slt f-ib">
        <span className="curr f-thide">{data.length ? data[curIndex].locationName : ''}</span>
        <a href="javascript:;" className="button" onClick={this.toggleShow.bind(this)}>
          <i className="u-icn u-icn-slt"></i>
        </a>
        <ul className={showFlag ? "" : "f-hide"}>
          {
            data.map((item, index) => {
              return (
                <li className="f-thide" key={item.id}>
                  <a href="javascript:;" onClick={this.clickHandleOnSelect.bind(this, index)}>{item.locationName}</a>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
    hide = this.hide.bind(this)
    document.addEventListener('click', hide, false)
    const { curIndex } = this.props
    this.setState({
      curIndex
    })
  }

  componentWillReceiveProps(nextProps) {
    const { curIndex } = nextProps
    this.setState({
      curIndex
    })
  }

  componentWillUnMount() {
    document.removeEventListener('click', hide)
  }

  clickHandleOnSelect(index) {
    const curIndex = this.state.curIndex
    if (index === curIndex) return
    this.setState(
      {
        curIndex: index
      }
    )
    this.props.onSelect && this.props.onSelect(index)
  }

  toggleShow(e) {
    e.nativeEvent.stopImmediatePropagation()
    const { showFlag } = this.state
    this.setState({
      showFlag: !showFlag
    })
  }

  hide() {
    this.setState({
      showFlag: false
    })
  }
}

Select.propTypes = {
  data: PropTypes.array,
  curIndex: PropTypes.number,
  onSelect: PropTypes.func
}

Select.defaultProps = {
  data: [],
  curIndex: 0
}

export default Select