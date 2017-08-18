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
            <img src="http://p4.music.126.net/mxHv8frh9SIlPNrsS_GJiQ==/18535567023046157.jpg" alt="" />
          </Link>
        </div>
        <div className="subj ">
          <Link to="/column?id=62001">
            <img src="http://p3.music.126.net/fh-SBHnxdQZ-uKVtKZOKcw==/18597139674204175.jpg" alt="" />
          </Link>
        </div>
      </div>
    )
  }
}

export default SubTab