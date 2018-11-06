import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Form, FormGroup, FormControl, HelpBlock, ControlLabel, Button} from 'react-bootstrap';

import {addUser} from '../actions/users';

class AddUser extends Component {
    constructor(props){
        super(props);
        this.state = {
          user: {
              firstName:"",
              lastName: "",
              email:"",
              password: "",
              confirmPassword: ""
          },
          validation: {
            firstName: {
                value: null,
                error: ""
            },
            lastName: {
                value: null,
                error: ""
            },
            email: {
                value: null,
                error: ""
            },
            password: {
                value: null,
                error: ""
            },
            confirmPassword: {
                value: null,
                error: ""
            },
          },
          disable: true
        }
      };

      handleAddUser = ()=>{
        const {addUser, users} = this.props;
        const {user} = this.state;
        user.id = users.length + 1;
        addUser(user);
      }

      handleUserAttributeChange = (event)=>{
        event.preventDefault();
        const {user:{password},validation} =  this.state;
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        const newState = {...this.state};
        // newState.user[name] = value;
        // newState.validation[name].value = value === "" ? "error" : "success";
        // newState.validation[name].error = value === "" ? "Must be not empty" : "";
        if(name === "firstName"){
            newState.user.firstName = value;
            newState.validation.firstName.value = value === "" ? "error" : "success";
            newState.validation.firstName.error = value === "" ? "First name must be not empty" : "";
        }
        if(name === "lastName"){
            newState.user.lastName = value;
            newState.validation.lastName.value = value === "" ? "error" : "success";
            newState.validation.lastName.error = value === "" ? "Last name must be not empty" : "";
        }
        if(name === "email"){
            newState.user.email = value;
            const isValidEmail = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            newState.validation.email.value = isValidEmail ? "success" : "error";
            newState.validation.email.error = value === "" ? "Email must be not empty" : isValidEmail ? "" : "Invalid email";
        }
        if(name === "password"){
            newState.user.password = value;
            const isValidPassword = value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
            newState.validation.password.value = isValidPassword ? "success" : "error";
            newState.validation.password.error = isValidPassword ? "" : "Please enter minimum eight characters, at least one letter and one number";
        }
        if(name === "confirmPassword"){
            newState.user.confirmPassword = value;
            newState.validation.confirmPassword.value = password === value ? "success" : "error";
            newState.validation.confirmPassword.error = password === value ? "" : "Password confirmation does not match";
        }
        newState.disable = !Object.keys(validation).every(item => validation[item].value === "success");
        this.setState(newState);
      }

      render() {
        const {user, validation, disable} = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <Form>
                            <FormGroup validationState={validation.firstName.value}>
                                <ControlLabel htmlFor="firstName">First name</ControlLabel>
                                <FormControl
                                    id='firstName'
                                    name='firstName'
                                    value={user.firstName}
                                    onChange={this.handleUserAttributeChange}
                                />
                                <HelpBlock>{validation.firstName.error}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={validation.lastName.value}>
                                <ControlLabel htmlFor="lastName">Last name</ControlLabel>
                                <FormControl
                                    id='lastName'
                                    name='lastName'
                                    value={user.lastName}
                                    onChange={this.handleUserAttributeChange}
                                />
                                <HelpBlock>{validation.lastName.error}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={validation.email.value}>
                                <ControlLabel htmlFor="email">Email</ControlLabel>
                                <FormControl
                                    id='email'
                                    name='email'
                                    value={user.email}
                                    onChange={this.handleUserAttributeChange}
                                    type='email'
                                />
                                <HelpBlock>{validation.email.error}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={validation.password.value}>
                                <ControlLabel htmlFor="password">Password</ControlLabel>
                                <FormControl
                                    id='password'
                                    name='password'
                                    value={user.password}
                                    onChange={this.handleUserAttributeChange}
                                    type='password'
                                />
                                <HelpBlock>{validation.password.error}</HelpBlock>
                            </FormGroup>
                            <FormGroup validationState={validation.confirmPassword.value}>
                                <ControlLabel htmlFor="confirmPassword">Confirm password</ControlLabel>
                                <FormControl
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    value={user.confirmPassword}
                                    onChange={this.handleUserAttributeChange}
                                    type='password'
                                />
                                <HelpBlock>{validation.confirmPassword.error}</HelpBlock>
                            </FormGroup>
                           <Link to='/'> <Button
                                bsStyle="info"
                                disabled={disable}
                                onClick={this.handleAddUser}
                            >Add user</Button> </Link>
                            <Link to='/'><Button>Cancel</Button></Link>
                        </Form>
                    </div>
                </div>
            </div>
            );
        }

}
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
    return {
      addUser: user => {
        dispatch(addUser(user))
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);