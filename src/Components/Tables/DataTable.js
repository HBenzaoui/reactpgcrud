import React, { Component } from 'react'
import { Table, Button } from 'reactstrap'
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  //Confirm Delete item from DB
  deleteItem = code_p => {
    let confirmDelete = window.confirm('Étes-vous sûr de vouloir supprimer le produit?')
    if (confirmDelete) {
      fetch('http://localhost:3000/pgcrud', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code_p
        })
      })
        .then(response => response.json())
        .then(item => {
          this.props.deleteItemFromState(code_p)
        })
        .catch(err => console.log(err))
    }
  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.code_p}>
          <th scope="row">{item.code_p}</th>
          <td>{item.refer_p}</td>
          <td>{item.nom_p}</td>
          <td>{item.prixht_p}</td>
          <td>{item.prixvd_p}</td>
          <td>{item.qut_p}</td>
          <td>{item.tva_p}</td>
          <td>
            <dir style={{ width: "150px", margin: "0px", padding: "0px", alignment: "center" }}>
              <ModalForm buttonLabel="Modifier" item={item} updateState={this.props.updateState} />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.code_p)}>Suppr</Button>
            </dir>
          </td>
        </tr>
      )
    })

    return (
      <Table size="sm" responsive hover bordered>
        <thead>
          <tr>
            <th>Code</th>
            <th>Réference</th>
            <th>Designation</th>
            <th>Prix d'achat</th>
            <th>Prix de vente</th>
            <th>Qut</th>
            <th>TVA</th>
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
