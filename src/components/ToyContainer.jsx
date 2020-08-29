import React from 'react';
import ToyCard from './ToyCard'

function ToyContainer (props) {

    return(
      <div id="toy-collection">
        {props.toys.map(toy => <ToyCard toyObj={toy} likeHandler={props.likeHandler} delHandler={props.delHandler}/>)}
      </div>
    );
  
}

export default ToyContainer;
