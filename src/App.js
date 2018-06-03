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
  cards = this.generateCards()

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

  handleCardClick(card) {
    console.log(card, 'clicked')
  }

  render() {
    const won = true;
    return (
      <div className="memory">
        <GuessCount guesses={0} />
        {this.cards.map((card,index) => (
          <Card
            card={card}
            feedback='hidden'
            onClick={this.handleCardClick}
            key={index}
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