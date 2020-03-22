import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap'

class AddEditForm extends Component {
  state = {
    code_p: '',
    refer_p: '',
    nom_p: '',
    prixht_p: '',
    prixvd_p: '',
    qut_p: '',
    tva_p: ''

  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/pgcrud', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        refer_p: this.state.refer_p,
        nom_p: this.state.nom_p,
        prixht_p: this.state.prixht_p,
        prixvd_p: this.state.prixvd_p,
        qut_p: this.state.qut_p,
        tva_p: this.state.tva_p
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('Failed to add item to state')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/pgcrud', {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        code_p: this.state.code_p,
        refer_p: this.state.refer_p,
        nom_p: this.state.nom_p,
        prixht_p: this.state.prixht_p,
        prixvd_p: this.state.prixvd_p,
        qut_p: this.state.qut_p,
        tva_p: this.state.tva_p
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('Failed to edit item in state')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    // if item exist, populate the state with proper data
    if (this.props.item) {
      const { code_p, refer_p, nom_p, prixht_p, prixvd_p, qut_p, tva_p } = this.props.item
      this.setState({ code_p, refer_p, nom_p, prixht_p, prixvd_p, qut_p, tva_p })
    }
  }

  render() {
    return (
      <Form id='my-form'
        onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="refer_p">Réference</Label>
          <Input type="text" name="refer_p" id="refer_p" onChange={this.onChange} value={this.state.refer_p === null ? '' : this.state.refer_p} />
        </FormGroup>
        <FormGroup>
          <Label for="nom_p">Designation</Label>
          <Input type="text" name="nom_p" id="nom_p" onChange={this.onChange} value={this.state.nom_p === null ? '' : this.state.nom_p} />
        </FormGroup>
        <FormGroup>
          <Label for="prixht_p">Prix d'achat</Label>
          <Input type="text" name="prixht_p" id="prixht_p" onChange={this.onChange} value={this.state.prixht_p === null ? '' : this.state.prixht_p} />
        </FormGroup>
        <FormGroup>
          <Label for="prixvd_p">>Prix de vente</Label>
          <Input type="text" name="prixvd_p" id="prixvd_p" onChange={this.onChange} value={this.state.prixvd_p === null ? '' : this.state.prixvd_p} placeholder="ex. 0555 56 48 68" />
        </FormGroup>
        <FormGroup>
          <Label for="qut_p">Qut</Label>
          <Input type="text" name="qut_p" id="qut_p" onChange={this.onChange} value={this.state.qut_p === null ? '' : this.state.qut_p} placeholder="Wilaya" />
        </FormGroup>
        <FormGroup>
          <Label for="tva_p">TVA</Label>
          <Input type="text" name="tva_p" id="tva_p" onChange={this.onChange} value={this.state.tva_p === null ? '' : this.state.tva_p} />
        </FormGroup>
      </Form>
    )
  }
}

export default AddEditForm
