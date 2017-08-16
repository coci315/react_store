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
      <form action="" className="search-input f-sprite">
        <input type="text"
          placeholder={this.props.placeholder}
          value={this.state.value}
          onInput={this.inputHandle.bind(this)}
          onFocus={this.focusHandle.bind(this)}
          onBlur={this.blurHandle.bind(this)}
        />
      </form>
    )
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

}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  inputHandle: PropTypes.func,
  focusHandle: PropTypes.func
}

SearchInput.defaultProps = {
  placeholder: ''
}

export default SearchInput