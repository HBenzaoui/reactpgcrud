import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  //Confirm Delete item from DB
  deleteItem = id => {
    let confirmDelete = window.confirm('Étes-vous sûr de vouloir supprimer le produit?')
    if (confirmDelete) {
      fetch('http://localhost:3000/pgcrud', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(id)
        })
        .catch(err => console.log(err))
    }
  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.first}</td>
          <td>{item.last}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.location}</td>
          <td>{item.hobby}</td>
          <td>
            <dir style={{ width: "150px", margin: "0px", padding: "0px", alignment: "center" }}>
              <ModalForm buttonLabel="Modifier" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Suppr</Button>
            </dir>
          </td>
        </tr>
      )
    })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Prénom</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Tél</th>
            <th>Localisation</th>
            <th>Activité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
