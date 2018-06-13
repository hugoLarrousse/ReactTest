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


export class NewRenderEggHead2 extends React.Component {

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
        <StopWatch/>
      </div>
    )
  }
}

