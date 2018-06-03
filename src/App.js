import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.css'
import Card from './Card'
// import { cards } from './Card'
import GuessCount from './GuessCount'
import HallOfFame, { FAKE_HOF } from './HallOfFame'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

class App extends Component {
  state = {
    cards: this.generateCards(),
    currentPair: [],
    guesses: 0,
    matchedCardIndices: []
  }

  getFeedbackForCard(index) {
    console.log('index', index);
    
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
    console.log(candidates);
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
      this.setState({ currentPair: [index] }) //re render!!
      return
    }

    this.handleNewPairClosedBy(index)
  }

  render() {
    const { cards, guesses, matchedCardIndices } = this.state
    console.log('toto');
    
    const won = matchedCardIndices.length === cards.length;
    return (
      <div className="memory">
        <GuessCount guesses={0} />
        {cards.map((card, index) => (
          <Card
            card={card}
            feedback={this.getFeedbackForCard(index)}
            onClick={this.handleCardClick}
            key={index}
            index={index}
          />
        ))}
        {won && <HallOfFame entries={FAKE_HOF} />}
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