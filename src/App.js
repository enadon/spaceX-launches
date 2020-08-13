import React from 'react'
import Launches from './Launches'

import './styles/index.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const value = this.state.value;
    return (
      <div>
        <form>
          <h1>Year:</h1>
          <input maxlength='4' type="text" value={this.state.value} onChange={this.handleChange} />
      </form>
      <Launches year={value} />
    </div>
    );
  }
}

export default App;
