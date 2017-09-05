import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import './style.scss'
class SubTab extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="subtab clearfix">
        <div className="subj pad-right">
          <Link to="/column?id=55001">
            <img src="http://p4.music.126.net/48Da_74tR8YqP0pvvvpZxg==/19143596951529145.jpg" alt="" />
          </Link>
        </div>
        <div className="subj ">
          <Link to="/column?id=68001">
            <img src="http://p4.music.126.net/37433Ah-LuLbidEPjs-u2A==/19078725765440648.jpg" alt="" />
          </Link>
        </div>
      </div>
    )
  }
}

export default SubTab