import Modal from 'react-modal';
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

import * as bulletinService from '../../services/bulletinService';

const modalStyle = {
  content : {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class EditEntry extends Component {
  constructor (props) {
    super(props);

    this.state = {
      modalIsOpen : false,
      formdata: {
        title: this.props.item.title,
        priority: this.props.item.priority,
        duration: this.props.item.duration,
        url: this.props.item.url
      }
    };
  }

  handleSubmit (event) {
    event.preventDefault();

    let params = this.state.formdata;
    params.owner = this.props.item.owner;

    bulletinService.editBulletin(this.props.item.id, params).then((response) => {
      this.closeModal();
      this.props.refreshList();
    }).catch(err => {
      swal(err.response.data.error.details[0].message);
    });
  }

  handleChange (el) {
    let inputName = el.target.name;
    let inputValue = el.target.value;
    let tempObj = Object.assign({}, this.state.formdata);

    tempObj[inputName] = inputValue;
    this.setState({
      formdata: tempObj
    });
  }

  openModal () {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal () {
    this.setState({
      modalIsOpen: false
    });
  }

  render () {
    return (
      <div className="edit-entry">
        <i className="icon ion-edit"
          onClick={() => this.openModal()}
        ></i>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={() => this.afterOpenModal()}
          onRequestCLose={() => this.closeModal()}
          style={modalStyle}
          content-label="edit entry modal"
        >
          <h2>Edit Bulletin</h2>
          <form className="add-entry-form" onSubmit={() => this.handleSubmit(event)}>
            <FormGroup>
              <ControlLabel>Segment Title</ControlLabel>
              <FormControl id="title" name="title" type="text" placeholder="segment title"
                value={this.state.formdata.title}
                onChange={() => this.handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Priority</ControlLabel>
              <FormControl id="priority" name="priority" type="text" placeholder="priority"
                value={this.state.formdata.priority}
                onChange={() => this.handleChange(event)}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Duration</ControlLabel>
              <FormControl id="duration" name="duration" type="text" placeholder="duration"
                value={this.state.formdata.duration}
                onChange={() => this.handleChange(event)}                
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Url</ControlLabel>
              <FormControl id="url" name="url" type="text" placeholder="url"
                value={this.state.formdata.url}
                onChange={() => this.handleChange(event)}                
              />
            </FormGroup>
            <Button className="submit-button" bsStyle="primary" type="submit">Submit</Button>
            <Button className="cancel-button" bsStyle="default" onClick={() => this.closeModal()}>Cancel</Button>
          </form>
        </Modal>    
      </div>
    );
  }
}

export default EditEntry;
