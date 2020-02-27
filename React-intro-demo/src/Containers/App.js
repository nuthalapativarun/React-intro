import React, { Component } from 'react';
import classes from './App.module.css';
import Persons from '../Components/Persons/Persons';
import Cockpit from '../Components/Cockpit/Cockpit';
import withClass from '../HOC/withClass';
import AuthContext from '../context/auth-context';


class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id: 'one', name: 'Max', age: 28 },
      { id: 'two', name: 'Manu', age: 29 },
      { id: 'three', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  deletePersonHandler = (index) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(index, 1);
    this.setState({
      persons: persons
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
      name: event.target.value
    };

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter+1
      }
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }

  loginHandler = () => {
    this.setState({
      authenticated: true
    })
  }

  render() {
    console.log("[App.js] render");
    let persons = null;
    if (this.state.showPersons) {
      persons = <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} 
            isAuthenticated={this.state.authenticated}
          />
    }

    return (
      <React.Fragment>
        <button onClick={() => {
          this.setState({showCockpit: false});
        }}>
          Remove Cockpit
        </button>
        <AuthContext.Provider value={{
          authenticated: this.state.authenticated,
          login: this.loginHandler
        }}
        >
          {this.state.showCockpit ? (
          <Cockpit 
            title = {this.props.appTitle}
            showPersons={this.state.showPersons} 
            personsLength={this.state.persons.length} 
            clicked={this.togglePersonsHandler} 
            login={this.loginHandler} />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </React.Fragment>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);








//Using hook, useState

// import React, { useState } from 'react';
// import './App.css';
// import Person from './Person/Person';

// const App = props => {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       {name:' Max', age: 28},
//       {name: 'Manu', age: 29},
//       {name: "Aish", age: 20}
//     ],
//   });

//   const [otherState, setOtherState] = useState('some other state');

//   console.log(personsState, otherState)

//   const switchNameHandler = () => {
//     // console.log("Was clicked");
//     setPersonsState({
//       persons : [
//         {name: "Wick", age: 28},
//         {name: 'Manu', age: 29},
//         {name: "Aish", age: 20}
//       ]
//     })
//   }

//   return (
//     <div className="App">
//       <h1> I'm a react app</h1>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person 
//         name={personsState.persons[0].name} 
//         age={personsState.persons[0].age}/>
//       <Person 
//         name={personsState.persons[1].name} 
//         age={personsState.persons[1].age}>My Hobbies: Racing</Person>
//       <Person 
//         name={personsState.persons[2].name} 
//         age={personsState.persons[2].age}/>
//     </div>
//   );
//     // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi I\'m a React App'));
// }


// export default App;


