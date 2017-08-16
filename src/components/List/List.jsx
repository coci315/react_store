import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'

class List extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      selectIndex: ''
    }
  }

  render() {
    const { title, items, delMode } = this.props
    return (
      <div className="m-list">
        <h2>{title}</h2>
        <ul>
          {items.map((item, index) => {
            return (<li
              key={item.label}
              className={index === this.state.selectIndex ? 'z-sel' : ''}
              onMouseOver={this.mouseOverHandle.bind(this, index)}
              onMouseOut={this.mouseOutHandle.bind(this)}
              onClick={this.clickHandle.bind(this, item.label)}
            >{item.label}
              {delMode ? <span className="f-fr" onClick={this.delHandle.bind(this, item.label)}>x</span> : ''}
            </li>)
          })}
        </ul>
      </div>
    )
  }

  mouseOverHandle(index) {
    this.setState({
      selectIndex: index
    })
  }

  mouseOutHandle() {
    this.setState({
      selectIndex: ''
    })
  }

  clickHandle(label) {
    this.props.clickHandle && this.props.clickHandle(label)
  }

  delHandle(label, e) {
    e.stopPropagation()
    const { delMode, delHandle } = this.props
    delMode && delHandle && delHandle(label)
  }
}

List.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  clickHandle: PropTypes.func,
  delMode: PropTypes.bool,
  delHandle: PropTypes.func
}

List.defaultProps = {
  title: '',
  items: [],
  delMode: false
}

export default List