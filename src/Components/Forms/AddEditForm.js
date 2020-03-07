import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

class AddEditForm extends Component {
  state = {
    is: 0,
    first: '',
    last: '',
    email: '',
    phone: '',
    location: '',
    hobby: '',

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
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        phone: this.state.phone,
        location: this.state.location,
        hobby: this.state.hobby
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
        id: this.state.id,
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        phone: this.state.phone,
        location: this.state.location,
        hobby: this.state.hobby
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
      const { id, first, last, email, phone, location, hobby } = this.props.item
      this.setState({ id, first, last, email, phone, location, hobby })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first">First Name</Label>
          <Input type="text" name="first" id="first" onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} />
        </FormGroup>
        <FormGroup>
          <Label for="last">Last Name</Label>
          <Input type="text" name="last" id="last" onChange={this.onChange} value={this.state.last === null ? '' : this.state.last} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email} />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone number</Label>
          <Input type="text" name="phone" id="phone" onChange={this.onChange} value={this.state.phone === null ? '' : this.state.phone} placeholder="ex. 0555 56 48 68" />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input type="text" name="location" id="location" onChange={this.onChange} value={this.state.location === null ? '' : this.state.location} placeholder="Wilaya" />
        </FormGroup>
        <FormGroup>
          <Label for="hobby">Hobby</Label>
          <Input type="text" name="hobby" id="hobby" onChange={this.onChange} value={this.state.hobby === null ? '' : this.state.hobby} />
        </FormGroup>
        <Button color="success">Submit</Button>
      </Form>
    )
  }
}

export default AddEditForm
