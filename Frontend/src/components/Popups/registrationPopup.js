import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './registrationPopup.css'

// const registrationPopup= () => (
//   <Popup trigger={<button> Trigger</button>} position="right center">
//     <div>Popup content here !!</div>
//   </Popup>
// );
const  registrationPopup= ({handleRouter}) => (
    
    
      <Popup
        modal
        nested
        defaultOpen={true}
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={()=>{
                close();
                handleRouter('Register');
            }}>
              &times;
            </button>
            <div className="header"> Registration Failed </div>
            <div className="content">
              
                <ol>
                <li>Name must contain Lowercase or UpperCase Letters only.</li>
                <li>Password length must be greater than 5.</li>
                <li>Email should be valid</li>

                </ol>
               
            </div>
            <div className="actions">
             
              <button
                className="button b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                onClick={() => {
                  
                  
                  close();
                   handleRouter('Register');

                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    
    
  );
export default registrationPopup;