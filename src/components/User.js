import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Table, Glyphicon, Button} from 'react-bootstrap';

import {deleteUser} from '../actions/users';

class User extends React.Component {
   
    render(){
        const {users, deleteUser} = this.props;

        return (
            <div className="container-fluid">
              <div className="row">
                  <div className="col-lg-12">
                      <Table striped bordered condensed hover>
                          <thead>
                              <tr>
                                  <th/>
                                  <th>First name</th>
                                  <th>Last name</th>
                                  <th>Email</th>
                                  <th/>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                  users && users.length === 0 &&
                                  <tr>
                                      <td colSpan={5}>No result</td>
                                  </tr>
                              }
                              {
                                  users && users.length > 0 && users.map((user, i)=>{
                                      const handleUserDelete = ()=> deleteUser(user.id);
                                      return (
                                          <tr key={i}>
                                              <td>{i + 1}</td>
                                              <td>{user.firstName}</td>
                                              <td>{user.lastName}</td>
                                              <td>{user.email}</td>
                                              <td>
                                                  <Button onClick={handleUserDelete}>
                                                      <Glyphicon glyph="remove" />
                                                  </Button>
                                              </td>
                                          </tr>
                                      )
                                  })
                              }
                          </tbody>
                      </Table>
                  </div>
                  <div className="col-lg-12">
                      <Link to='/add-user'>
                          <Button>Add user</Button>
                      </Link>
                  </div>
              </div>
            </div>
          );
    }
}

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
    return {
      deleteUser: id => {
        dispatch(deleteUser(id))
      }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User);

