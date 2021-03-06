import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.module.css';
import  Aux from '../../../HOC/Aux';
import withClass from '../../../HOC/withClass';
import AuthContext from '../../../context/auth-context';

class Person extends Component {

    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount(){
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }

    render() {
        console.log("'[Person.js] rendering ");
        return (
            // <div className={classes.Person}>
            <React.Fragment>
                {this.context.authenticated ? <p>Authenticated</p> : <p>Please log in</p>}
                <p key="i1" onClick={this.props.click}>
                    I'm a {this.props.name} and I am {this.props.age} old.
                </p>
                <p key="i2">{this.props.children}</p>
                <input 
                    key="i3" 
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    type="text" 
                    onChange={this.props.changed} 
                    value={this.props.name} />
            </React.Fragment>
            // </div>
        );
    }

    // const random = Math.random();
    // if(random > 0.7){
    //     throw new Error('Something went wrong');
    // }

}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);