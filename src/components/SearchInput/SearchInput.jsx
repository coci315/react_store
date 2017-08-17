import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'

class SearchInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <form action="" className="search-input f-sprite" onSubmit={e => {
        e.preventDefault()
      }}>
        <input type="text"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onInput={this.inputHandle.bind(this)}
          onFocus={this.focusHandle.bind(this)}
          onBlur={this.blurHandle.bind(this)}
          onKeyUp={this.keyUpHandle.bind(this)}
        />
      </form>
    )
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
  }

  inputHandle(e) {
    this.setState({
      value: e.target.value
    })

    this.props.inputHandle && this.props.inputHandle(e.target.value)
  }

  focusHandle(e) {
    this.props.focusHandle && this.props.focusHandle(e.target.value)
  }

  blurHandle() {
    this.props.blurHandle && this.props.blurHandle()
  }

  keyUpHandle(e) {
    e.stopPropagation()
    e.preventDefault()
    if (e.keyCode !== 13) return
    this.props.enterHandle && this.props.enterHandle(e.target.value)
  }

  setValue(v) {
    this.setState({
      value: v
    })
  }

}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  inputHandle: PropTypes.func,
  focusHandle: PropTypes.func,
  enterHandle: PropTypes.func,
  value: PropTypes.string
}

SearchInput.defaultProps = {
  placeholder: '',
  value: ''
}

export default SearchInput