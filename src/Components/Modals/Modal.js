import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import AddEditForm from '../Forms/AddEditForm'

class ModalForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    const closeBtn = <Button className="close" onClick={this.toggle} >&times;</Button>
    const label = this.props.buttonLabel
    let button = ''
    let title = ''

    if (label === 'Modifier') {
      button = <Button
        color="warning"
        onClick={this.toggle}
        style={{ float: "left", marginRight: "10px" }}>
        {label}
      </Button>
      title = 'Modifier Produit'
    } else {
      button = <Button
        color="success"
        onClick={this.toggle}
        style={{ float: "left", marginRight: "10px" }}>
        {label}
      </Button>
      title = 'Nouveau Produit'
    }

    return (
      <>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
            <Button color="success" form='my-form' type="submit">Sauvegarder</Button>
          </ModalFooter>

        </Modal>
      </>
    )
  }
}

export default ModalForm