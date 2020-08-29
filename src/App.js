import React from 'react';
import './App.css';

import ToyHeader from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(res => {
        this.setState({
          toys: res
        })
      
    })
  }
    
  deleteHandler = (toyId) => {
    const options = {
      method: "DELETE"
    }

    fetch(`http://localhost:3000/toys/${toyId}`, options)
    .then(res => res.json)
    .then(res => {
      let newArray = this.state.toys.filter(toy => toy.id !== parseInt(toyId))
      
      this.setState({
        toys: newArray
      })
    })

  }

  likeHandler = (toyId) => {
    let toyObj = this.state.toys.filter(toy => toy.id === parseInt(toyId))[0]
    
    toyObj.likes += 1

    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          likes: parseInt(toyObj.likes)
        })
    }

    fetch(`http://localhost:3000/toys/${toyId}`, options)
    .then(res => res.json)
    .then(res => {
      let newArray = this.state.toys.filter(toy => toy.id !== parseInt(toyId))
      
      this.setState({
        toys: [...newArray, toyObj]
      })
    })

    
  }

  newToy = ({name, image}) => {
    const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({
          name: name,
          image: image,
          likes: 0
        })
    }

      fetch('http://localhost:3000/toys', options)
      .then(res => res.json())
      .then(res => {
        this.setState({
        toys: [...this.state.toys, res]
        })
      })
  }
  

  render(){
    return (
      <>
        <ToyHeader/>
        { this.state.display
            ?
          <ToyForm newToy={this.newToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer likeHandler={this.likeHandler} delHandler={this.deleteHandler} toys={this.state.toys}/>
      </>
    );
  }

}

export default App;
