import { Component } from 'react';
import { Fragment, useState, useEffect } from 'react';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';
import classes from './UserFinder.module.css';

import Users from './Users';


class UserFinder extends Component {

    static contextType = UsersContext ;

    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ''
        };
    }

    componentDidMount() {
        // == use effect
        this.setState({filteredUsers: this.context.users});
    }

    componentDidUpdate(prevProps, prevStates){
        if (prevStates.searchTerm !== this.state.searchTerm) {

        
        this.setState({
            filteredUsers: this.context.users.filter((user) => 
            user.name.includes(this.state.searchTerm))
            });
        }

        }


    searchChangeHandler(event) {
        this.setState({searchTerm: event.target.value});
    }

    render() {
        return (
            <Fragment>
              <div className = {classes.finder}>      
                   <input type='search' onChange={this.searchChangeHandler.bind(this)} />
               </div>
            <ErrorBoundary>
              <Users users={this.state.filteredUsers} />
            </ErrorBoundary>
            </Fragment>
          );
    }

}


// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <input type='search' onChange={searchChangeHandler} />
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
