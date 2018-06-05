import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './HighScoreInput.css'

import { saveHOFEntry } from './HallOfFame'



class HighScoreInput extends Component {
    state= { winner: '', test: 'this is a test'} //local state only for the class, so "this" is only for the HighScoreInput Class, that's why we have to initialize winner
    handleWinnerUpdate = (event) => {
        this.setState({ winner: event.target.value.toUpperCase() })
      }

    persistWinner = (event) => {
        event.preventDefault()
        const newEntry = { guesses: this.props.guesses, player: this.state.winner }
        saveHOFEntry(newEntry, this.props.onStored)
    }

    update( e ) {
      this.setState({ test: e.target.value})
    }
  render() {
    return (
      <form className="highScoreInput" onSubmit={this.persistWinner}>
        <p>
          <label>
            Bravo ! Entre ton prénom :
            <input 
                type="text" 
                autoComplete="given-name"
                onChange= {this.handleWinnerUpdate}
                value={this.state.winner}/>
          </label>
          <ButtonWidget text="Validation"/>
          <TestWidget update={this.update.bind(this)}/>
        </p>
        <h2> {this.state.test} </h2>
      </form>
    )
  }
}

const ButtonWidget = (props) => (
  <button type="submit">{props.text}</button>
)

const TestWidget = ({ update }) => (
  <input type="text" onChange={update} />
)

HighScoreInput.propTypes = {
  guesses: PropTypes.number.isRequired,
  onStored: PropTypes.func.isRequired,
}

export default HighScoreInput