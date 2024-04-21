import React from 'react';
import './rank.css';
function rank(props){

     return (
 
        <div  className='mt2'>
          <div className="f2 container2 ">{`${props.name} ,your rank is ${props.entries}`}</div>   
        </div>

     )


 
}

export default rank;