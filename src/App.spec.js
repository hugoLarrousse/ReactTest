import ReactDOM from 'react-dom';

import App, { SYMBOLS } from './App';
import Card from './Card'
import GuessCount from './GuessCount'

// describe('/App', () => {
//   it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
// })

describe('/App', () => {
  it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
      });
  it('contains a zero-guess counter', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).toContainReact(<GuessCount guesses={0} />)
    expect(wrapper.contains(<GuessCount guesses={0} />)).toBe(true)
  })
  it('has 36 cards', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Card')).toHaveLength(36)
  })
  it('should trigger its `onClick` prop when clicked', () => {
    const onClick = sinon.spy()

    const wrapper = shallow(
      <Card card="😁" feedback="hidden" index={0} onClick={onClick} />
    )

    wrapper.simulate('click')
    expect(onClick.calledOnce).toBe(true);
    // expect(onClick).toHaveBeenCalledWith(0)
  })
  it('should match its reference snapshot', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Card card="😁" feedback="hidden" index={0} onClick={onClick} />
    )

    expect(wrapper).toMatchSnapshot()
  })
  it('should match its reference snapshot 2', () => {
    const mock = sinon
      .stub(App.prototype, 'generateCards')
      .returns([...SYMBOLS.repeat(2)])
    try {
      const wrapper = shallow(<App />)
  
      expect(wrapper).toMatchSnapshot()
    } finally {
      mock.restore()
    }
  })
  
})
