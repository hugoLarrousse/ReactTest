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

// control react component updates when new props are received (3 methods)
export class ComponentUpdate extends React.Component {
    constructor(){
      super();
      this.state = {increasing: false}
    }
    update(){
      ReactDOM.render(
        <ComponentUpdate val={this.props.val + 1} />,
        document.getElementById('root')) // !!!
    }
    // when update props (info)
    componentWillReceiveProps(nextProps){
      this.setState({increasing: nextProps.val > this.props.val})
    }
    // shoudl we update the component (can block if no return)
    shouldComponentUpdate(nextProps, nextState) {
      return nextProps.val % 5 === 0;
    }
    render(){
      console.log(this.state.increasing)
      return (
        <button onClick={this.update.bind(this)}>
          {this.props.val}
        </button>
      )
    }
    //get prevProps & prevstate
    componentDidUpdate(prevProps, prevState) {
      console.log(`prevProps: ${prevProps.val}`)
      console.log(`prevState increasing: ${prevState.increasing}`)
    }
   }
ComponentUpdate.defaultProps = {val: 0}

//use map to create react components from Arrays of Data + filter with input
export class MapForComponent extends React.Component {
    constructor() {
        super();
        this.state = { items: [], filter: ''}
    }

    componentWillMount() {
        fetch('https://swapi.co/api/people/?format=json')
            .then(response => response.json())
            .then(({results: items}) => this.setState({items}))
    }
    filter = (e) => {
        this.setState({filter: e.target.value})
    }

    render() {
        let items = this.state.items
        if(this.state.filter) {
            items = items.filter(item => item.name.toLowerCase().includes(this.state.filter.toLowerCase())) //!!
        }
        return (
            <div>
            <input type='text' onChange={this.filter}/>
            {items.map((item, index) => (
                <Person key={item.name} item={item}/> //you can't put the key inside Person
            ))}
            </div>
        )
    }
}
const Person = (props) => <h4> {props.item.name} </h4>

export class TestH7 extends React.Component {
    constructor() {
        super();
        this.state = { response: '' }
    }

    componentWillMount() {
        fetch('https://api.heptaward.com')
            .then(response => this.setState({response: response.statusText}));
    }
    filter = (e) => {
        this.setState({filter: e.target.value})
    }

    render() {
        let response = this.state.response
        console.log('response', response);
        
        return (
            <div>
                <p> H7 : {response} </p>
            </div>
        )
    }
}



//Compose React COMPONENT BEHAVIOUR WITH HIGHER ORDER COMPONENTS (HOC)
const HOC = (InnerComponent) => class extends React.Component {
    constructor() {
        super();
        this.state = { count:0 }
    }
    update = () => {
        this.setState({count: this.state.count + 1 })
    }
    render() {
        console.log('will mount');
        return (
            <InnerComponent
                {...this.props} //important to spread props!!
                {...this.state}
                update={this.update}
            />
        )
    }
}

export class ComposeComponent extends React.Component {
    render() {
        return (
            <div>
                <Button2 >button</Button2>
                <LabelHOC>label </LabelHOC>
            </div>
        )
    }
}

const toto = {
    color: "red"
}

const Button2 = HOC((props) => <button onClick={props.update} style={toto} >{props.children} - {props.count}</button>)



export class Label extends React.Component {
    render() {
        return (
            <label onMouseMove={this.props.update }> {this.props.children} - {this.props.count} </label>
        )
    }
}

const LabelHOC = HOC(Label)

// React.Children
export class ReactChildren extends React.Component {
    render() {
        return (
            <Parent>
                <div className="childA"> aa</div>
                <div className="childB"> </div>
            </Parent>
        )
    }
}

export class Parent extends React.Component {
    render() {
        let items;
    //not working if only 1 child
        // let items = this.props.children.map(child => child)

        // better to use React.Children functionalities
            // let items = React.Children.map(this.props.children, child => child)
            // let items = React.Children.toArray(this.props.children)
        React.Children.forEach(this.props.children, child => console.log('child', child))
        // works only if there is one child
          // let items = React.Children.only(this.props.children)


        console.log('items', items || 'AHAHAHA');
        return null
    }
}

// how to know in which button you clicked --> use cloneElement
export class ReactCloneElement extends React.Component {
  render() {
    return (
      <div>
        <Buttons>
            <button value="A">A</button>
            <button value="B">B</button>
            <button value="C">C</button>
        </Buttons>
      </div>
    )
  }
}

class Buttons extends React.Component {
  constructor() {
    super();
    this.state = { selected: 'None'}
  }

  selectItem = (selected) => {
      this.setState({selected})
  }

  render() {
    let func = child => React.cloneElement(child, { onClick: this.selectItem.bind(this, child.props.value)})
    let items = React.Children.map(this.props.children, func);
    return (
      <div>
        <h2> You have Selected: {this.state.selected } </h2>
    {items}
      </div>
    )
  }
}


export class NewRenderEggHead1 extends React.Component {
  update = () => {
      ReactDOM.render(
          <div>
        <Button> <Heart/> Test button with stateless function and access to this text with props.children </Button>
        <Title text="totoot"/>
        <EventTest />
        <RefTest />
        <LifeCycle />
        <ComponentUpdate />
        <MapForComponent />
        <TestH7 />
        <div> </div>
        <div> </div>
        <ComposeComponent />
        <ReactChildren />
        <ReactCloneElement />
        </div>,
        document.getElementById('root'))
  }

  render() {
    return (
      <div>
        <button onClick={this.update}> egghead course 1 : start learning React by Joe Maddaloneflux
        </button>
      </div>
    )
  }
}










