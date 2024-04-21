import './logo.css';
import face from './face.jpg';
import {Tilt} from 'react-tilt';
import React from 'react';


const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            35,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          1000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

function logo(){

      return (

         <div className='container1 f2  pa2'>
           
           <Tilt options={defaultOptions} style={{ height: 200, width: 200 }} className="pa2">
      <div className='pa2'><img src={face} alt="logo" className='responsive'/></div>
    </Tilt>
            
         </div>

      )


}

export default logo;