import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import CommonHead from './CommonHead/CommonHead'
import CommonFoot from './CommonFoot/CommonFoot'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <CommonHead />
                {this.props.children}
                <CommonFoot />
            </div>
        )
    }
}

export default App