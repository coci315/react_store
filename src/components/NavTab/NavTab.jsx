import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import PropTypes from 'prop-types'

import './style.scss'
class NavTab extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    this.state = {
      currentIndex: 0
    }
  }
  render() {
    const { tabs } = this.props
    const len = tabs.length
    const { currentIndex } = this.state
    return (
      <div className="m-navtab">
        <ul>
          {
            tabs.map((item, index) => {
              return (
                <li key={item}>
                  <a href="javascript:;"
                    className={currentIndex === index ? "selected" : ""}
                    onClick={this.clickHandle.bind(this, index)}
                  >
                    <em>{item}</em>
                  </a>
                  {
                    index !== (len - 1) ? (<span className="point"></span>) : ''
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  componentDidMount() {
    const { currentIndex } = this.props
    this.setState({
      currentIndex
    })
  }

  clickHandle(index) {
    this.props.onTabChange && this.props.onTabChange(index)
    this.setState({
      currentIndex: index
    })
  }
}

NavTab.propTypes = {
  currentIndex: PropTypes.number,
  tabs: PropTypes.array,
  onTabChange: PropTypes.func
}

NavTab.defaultProps = {
  currentIndex: 0,
  tabs: []
}

export default NavTab