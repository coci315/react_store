import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'

class SuggestList extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      selectIndex: ''
    }
  }

  render() {
    const { word, items } = this.props
    const reg = new RegExp('^' + word)
    return (
      <div className="suggest-list">
        <h2 onClick={this.clickHandle.bind(this, word)}>搜索"<i>{word}</i>"相关商品</h2>
        <ul>
          {items.map((item, index) => {
            let content = <p>{item}</p>
            if (reg.test(item)) {
              content = <p><em>{word}</em>{item.slice(word.length)}</p>
            }
            return (<li
              key={item}
              className={index === this.state.selectIndex ? 'z-sel' : ''}
              onMouseOver={this.mouseOverHandle.bind(this, index)}
              onMouseOut={this.mouseOutHandle.bind(this)}
              onClick={this.clickHandle.bind(this, item)}
            >{content}
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

}

SuggestList.propTypes = {
  word: PropTypes.string,
  items: PropTypes.array,
  clickHandle: PropTypes.func,
}

SuggestList.defaultProps = {
  word: '',
  items: []
}

export default SuggestList