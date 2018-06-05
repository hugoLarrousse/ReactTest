import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export const Button = (props) => <button> {props.children} </button>

 export const Heart = () => <span>&hearts;</span>

// same as

// export class Heart extends React.Component {
//     render () {
//         return <span>&hearts;</span>
//     }
// }

export const Title = (props) => <h1> {props.text} </h1>

Title.propTypes = {
    text: PropTypes.string.isRequired
}

export class EventTest extends React.Component {
    constructor() {
        super();
        this.state = { currentEvent: '---'}
    }
    update = (e) => {
        this.setState({currentEvent: e.type })
    }
    render() {
        return (
            <div>
                <textarea
                    onKeyPress={this.update}
                    onCopy={this.update}
                    cols="30"
                    rows="10"
                />
                <h1>{this.state.currentEvent}</h1>
            </div>
        )
    }
}

//Use ref to differentite multiple input
export class RefTest extends React.Component {
    constructor() {
        super();
        this.state = { a: '', b:''}
    }
    update = (e) => {
        // this.setState({a: e.target.value, b: e.target.value })
        this.setState({
            // a: ReactDOM.findDOMNode(this.a).value,
            a: this.a.refs.input.value,
            b: this.refs.b.value
        })
    }
    render() {
        return (
            <div>
                <Input
                ref={ component => this.a = component }
                update={this.update}
                /> {this.state.a}
                <input
                ref="b"
                type="text"
                onChange={this.update}
                /> {this.state.b}
            </div>
        )
    }
}

class Input extends React.Component {
    render() {
        return <div> <input ref='input' type="text" onChange={this.props.update} /> </div>
    }
}

export class LifeCycle extends React.Component {
    constructor() {
        super();
        this.state = {val: 0}
    }

    update = () => this.setState({val: this.state.val + 1})

    componentWillMount() {
        console.log('componentWillMount');
        this.setState({m: 2})
    }

    render () {
        console.log('render');
        return <button onClick={this.update}> {this.state.val * this.state.m} </button>
    }

    componentDidMount() {
        console.log('componentDidMount');
        console.log(ReactDOM.findDOMNode(this))
        this.inc = setInterval(this.update, 1000)
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this.inc)
    }
}

// to mount & unmount (doesn't work for now)
// export class Wrapper extends React.Component {
//     mount = () => {
//         ReactDOM.render(<LifeCycle/>, document.getElementById('a'))
//     }
//     unmount = () => {
//         ReactDOM.unmountComponentAtNode(<LifeCycle/>, document.getElementById('a'))
//     }

//     render() {
//         return (
//             <div> 
//                 <button> onClick={this.mount} Mount </button>
//                 <button> onClick={this.unmount} unMount </button>
//                 <div id="a"> </div>
//             </div>
//         )
//     }
// }