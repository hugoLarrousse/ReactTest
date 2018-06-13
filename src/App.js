import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'
import Card from './Card'
// import { cards } from './Card'
import GuessCount from './GuessCount'
import HallOfFame from './HallOfFame'
import HighScoreInput from './HighScoreInput'
import { NewRender } from './eggheadCourse/eggheadCourse1'

const SIDE = 6
export const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    hallOfFame: null,
    matchedCardIndices: [],
    winner: 'aa',
  }

  getFeedbackForCard(index) {
    const { currentPair, matchedCardIndices } = this.state
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }

  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

  handleCardClick = index => {
    const { currentPair } = this.state

    if (currentPair.length === 2) {
      return
    }

    if (currentPair.length === 0) {
      this.setState({ currentPair: [index] }) //re render!! + Asynchronous 
      // if you want to wait for the asynchronous
      // this.setState(
      //   (prevState, props) => ({ currentPair: [index] })
      // )
      return
    }

    this.handleNewPairClosedBy(index)
  }

  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state

    const newPair = [currentPair[0], index]
    const newGuesses = guesses + 1
    const matched = cards[newPair[0]] === cards[newPair[1]]
    this.setState({ currentPair: newPair, guesses: newGuesses })
    if (matched) {
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), 750)
  }

  displayHallOfFame = (hallOfFame) => {
    this.setState({ hallOfFame })
  }

  render() {
    const { cards, guesses, hallOfFame } = this.state
    const won = true;
    return (
      <div className="memory">
        <GuessCount guesses={guesses} />
        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            onClick={this.handleCardClick}
            key={index}
            index={index}
          />
        ))}
        {
          won &&
            (hallOfFame ? (
              <HallOfFame entries={hallOfFame} />
            ) : (
              <HighScoreInput guesses={guesses} onStored={this.displayHallOfFame} />
            ))
        }
        <NewRender/>
      </div>
    )
  }
}


// const Greeter = ({ whom }) => (
//   <button onClick={() => console.log(`Bonjour ${whom} !`)}>
//     Vas-y, clique !
//   </button>
// )

// const Win = () => (
//  true && <p> Gagné </p>
// )


// class App extends Component {
//   handleCardClick(card) {
//     console.log(card, 'clicked')
//   }
//   render() {
//     return (
//       <div>
//       <div className="memory">
//         <GuessCount guesses={0} />
//         {cards.map((card, index) => (
//           <Card
//             card={card}
//             feedback="visible"
//             key={index}
//             onClick={this.handleCardClick}
//           />
//         ))}
//       </div>
//       <Greeter whom= "Jean"/>
//       <Win />
//       </div>
//     )
//   }
// }

export default App