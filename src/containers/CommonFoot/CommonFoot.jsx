import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.scss'
class CommonFoot extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  render() {
    return (
      <div className="common-foot">
        <div className="m-ft f-cb">
          <div className="wrap clearfix">
            <div className="copyright f-fl">
              <p>
                <a href="http://music.163.com/about" target="_blank" className="s-fc4">关于网易</a><span className="line">|</span>
                <a href="http://help.163.com/" target="_blank" className="s-fc4">客户服务</a><span className="line">|</span>
                <a href="http://music.163.com/html/web2/service.html" target="_blank" className="s-fc4">服务条款</a><span className="line">|</span>
                <a href="http://sitemap.163.com/" target="_blank" className="s-fc4">网站导航</a><span className="line">|</span>
                <a className="s-fc4">意见反馈</a>
              </p>
              <p className="s-fc3">
                <span className="sep">网易公司版权所有©1997-2017</span>杭州乐读科技有限公司运营：<a className="s-fc3" href="http://p1.music.126.net/-DB9zs1FAJq8vg7HOb-yOQ==/3250156395654666.jpg" target="_blank">浙网文[2015] 0415-135号</a>
              </p>
            </div>
            <ul className="enter f-fr">
              <li>
                <a className="logo logo-musician f-tid" href="http://music.163.com/nmusician/web/index" target="_blank">独立音乐人</a>
              </li>
              <li>
                <a className="logo logo-topic f-tid" href="http://music.163.com/topic/recruit" target="_blank">音乐专栏</a>
              </li>
              <li>
                <a className="logo logo-midea f-tid" href="http://music.163.com/topic/selfmedia" target="_blank">自媒体</a>
              </li>
              <li>
                <a className="logo logo-reward f-tid" href="http://music.163.com/web/reward" target="_blank">赞赏</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default CommonFoot