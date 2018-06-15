import React from 'react';
import AppStore from '../stores/app-store'

export default (InnerComponent, stateCallback) => class extends React.Component {
    //stateCallBack is the method to initialize state for the Inner component
    constructor(props) {
        super(props);
        this.state = stateCallback(props);
    }
    componentWillMount() {
        AppStore.addChangeListener(this._onChange)
    }
    componentWillUnmount(){
        AppStore.removeChangeListener(this._onChange)
    }
    _onChange = () => {
        this.setState(stateCallback(this.props))
    }
    render() {
        return <InnerComponent
        {...this.state}
        {...this.props} />
    }

}