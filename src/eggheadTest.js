import React from 'react'

export const Button = (props) => <button> {props.children} </button>

 export const Heart = () => <span>&hearts;</span>

// same as

// export class Heart extends React.Component {
//     render () {
//         return <span>&hearts;</span>
//     }
// }