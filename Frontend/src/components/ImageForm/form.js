import React from 'react';
import './form.css';
function form({OnInputChange,OnButtonClick}){

     return (
 
        <div >
           <p style={{ textAlign: 'center'}} className='f3'>This Magic Brain will Detect faces in your Picture!!!!</p>
           
            <div className='container3'>
             
            <div className="FormBox container3 pa4 shadow-5 br3">
          <input type="text" className='f3 pa1 w-70' onChange={OnInputChange}/>
          <button className='w-30 f4 link grow' onClick={OnButtonClick}>Detect</button>
        </div>
        </div>
        </div>

     )


 
}

export default form;