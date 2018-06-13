import React from 'react'
import ReactDOM from 'react-dom'

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.children
            ? <div> {this.props.children} </div>
            : <div> No message </div>
        }
      </div>
    )
  }
}


class Box extends React.Component {
  render() {
console.log(this)
    return (
      <div
      style={{paddingLeft: 20, borderStyle: 'solid', ...this.props.style}}>
      {this.props.children}
      </div>
    )
  }
}

class StopWatch extends React.Component {
  constructor() {
    super();
    this.state = {
        watch: 0,
        interval: 0,
        isRunning: false,
    }
  }

  running = () => {
      if(!this.state.isRunning) {
        this.setState({
            interval: setInterval(() => {
                this.setState({
                    watch: this.state.watch + 1
                })
            }, 1),
            isRunning: true,
        });
    } else {
        clearInterval(this.state.interval);
        this.setState({
            isRunning: false,
        })
    }
  }

  clear = () => {
    clearInterval(this.state.interval);
    this.setState({
        watch: 0,
        isRunning: false,
    })
  }
  componentWillUnmount() { //just before unmount the component, we want to make sure that the interval is clear
    clearInterval(this.state.interval);
  }

  render() {
    const { watch, isRunning } = this.state
    return (
    <div style={{ marginTop: 20 }}>
        <label style={{marginRight: 10}}> {watch} ms</label>
        <button onClick={this.running} > {isRunning ? 'Stop' : 'Start'} </button>
        <button onClick={this.clear} > Clear </button>
    </div>
    )
  }
}

class NameForm extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null,
            valueField: '',
        }
      }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('two ways to access to the value of the input');
    
    console.log('event.target[0].value: ', event.target[0].value);
    console.log('thanks to name=surname: ', event.target.elements.surname.value);
    console.log('(best one) thanks to ref props', this.name.value); // best one!!
  }

  checkErrors = (value) => {
      return value.length < 3 ? 'error' : null
  }

  checkOnChange = (event) => {
      // if you choose to put a value to your field (value='something' ou value={something}) you have to manually change the value in the field
      const { value } = event.target
      this.setState({
          valueField: value, //very important if value= ... exist
          error: this.checkErrors(value)
      })
  }
  componentDidMount() { //just before the component was mount
    this.setState({
        error: this.checkErrors('')
    })
  }
    render() {
        const {error, valueField} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label> 
            Name: 
            <input value={valueField} onChange={this.checkOnChange}type='text' name='surname' ref={node => this.name = node}/>
        </label>
        <button disabled={Boolean(error)} type='submit'> Submit </button>
      </form>
    )
  }
}


export class NewRenderEggHead2 extends React.Component {
    constructor() {
        super();
        this.state = {
            isHidden: true,
        }
      }
buttonHide = () => {
    ReactDOM.render(
        this.state.isHidden 
    ? <div>
    <StopWatch/>
</div> :
    <div>
    </div>,
    document.getElementById('toto'))
    this.setState({
        isHidden: !this.state.isHidden
    })
}

update = () => {
    ReactDOM.render(
    <div>
        <Message/>
        <Message > Bonjour </Message>
        <Box style= {{backgroundColor: 'lightblue'}}> toto </Box>
    </div>, 
    document.getElementById('toto'))
}
  render() {
    return (
        <div>
        <button onClick={this.update}> egghead course 2 : the beginner's guide to React by Kent C. Dodds
        </button>
        <button onClick={this.buttonHide}> test</button>
        <NameForm/>
      </div>
    )
  }
}

