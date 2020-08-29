import React, { Component } from 'react';

class ToyCard extends Component {

  
  delHandler = (e) => {
    this.props.delHandler(e.target.parentElement.dataset.setId)
  }

  likeHandler = (e) => {
    
    this.props.likeHandler(e.target.parentElement.dataset.setId)
  }
  
  render() {
    
    return (
      <div data-set-id={this.props.toyObj.id} className="card">
        <h2>{this.props.toyObj.name}</h2>
        <img src={this.props.toyObj.image} alt={this.props.toyObj.name} className="toy-avatar" />
        <p>{this.props.toyObj.likes} Likes </p>
        <button onClick={this.likeHandler} className="like-btn">Like {'<3'}</button>
        <button onClick={this.delHandler} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
