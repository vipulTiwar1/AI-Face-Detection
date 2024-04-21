import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './registrationPopup.css';

const  SignInPopup= ({handleRouter}) => (
    
    
      <Popup
        modal
        nested
        defaultOpen={true}
      >
        {close => (
          <div className="modal">
            <button className="close" onClick={()=>{
                close();
                handleRouter('SignIn');
            }}>
              &times;
            </button>
            <div className="header"> SignIn Failed</div>
            <div className="content">
              
               <p>User Not Registered...</p>
               
            </div>
            <div className="actions">
             
              <button
                className="button b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                onClick={() => {
                  
                  
                  close();
                   handleRouter('SignIn');

                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Popup>
    
    
  );
export default SignInPopup;