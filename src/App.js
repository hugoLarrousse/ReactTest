import React, { Component } from 'react'
import './App.css'
import Card from './Card'
import { cards } from './Card'
import GuessCount from './GuessCount'

console.log(cards)


const Greeter = ({ whom }) => (
  <button onClick={() => console.log(`Bonjour ${whom} !`)}>
    Vas-y, clique !
  </button>
)

const Win = () => (
 true && <p> Gagné </p>
)


class App extends Component {
  handleCardClick(card) {
    console.log(card, 'clicked')
  }
  render() {
    return (
      <div>
      <div className="memory">
        <GuessCount guesses={0} />
        {cards.map((card, index) => (
          <Card
            card={card}
            feedback="visible"
            key={index}
            onClick={this.handleCardClick}
          />
        ))}
      </div>
      <Greeter whom= "Jean"/>
      <Win />
      </div>
    )
  }
}

export default App