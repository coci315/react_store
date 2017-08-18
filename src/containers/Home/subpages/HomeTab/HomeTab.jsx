import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router'

import './style.scss'
class HomeTab extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="hometab f-cb">
        <ul className="clearfix">
          <li className="tab">
            <Link to="/variouskind?cid=1008002&title=音乐人周边">
              <img src="http://p4.music.126.net/tKMAm5OvR-2lAj7dnEOhsg==/18623527952924939.jpg" />
              <span className="f-thide">音乐人周边</span>
            </Link>
            <em className="line"></em>
          </li>
          <li className="tab">
            <Link to="/variouskind?cid=101000&title=数码影音">
              <img src="http://p3.music.126.net/PzH4QQKE5R97J9f2V-SvqQ==/18585045045959929.jpg" />
              <span className="f-thide">数码影音</span>
            </Link>
            <em className="line"></em>
          </li>
          <li className="tab">
            <Link to="/column?id=63001&title=热销爆品">
              <img src="http://p3.music.126.net/UKhDHWnEMmoOo27PQmDPbA==/19117208672446378.jpg" />
              <span className="f-thide">热销爆品</span>
            </Link>
            <em className="line"></em>
          </li>
          <li>
            <a href="javascript:;">
              <div className="left"></div>
              <div className="right">
                <div className="txt">积分商城</div>
                <span className="count">0</span>
                <span className="jifen">积分</span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    )
  }
}

export default HomeTab