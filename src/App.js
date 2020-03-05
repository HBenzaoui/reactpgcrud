import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'
import { CSVLink } from 'react-csv'


class App extends Component {

  state = {
    items: []
  }

  getItems() {
    fetch('http://localhost:3000/pgcrud')
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}




// function App() {
//   return (
//     <>
//       Front Served
//     </>
//   );
// }

export default App;
