import React from 'react';
import './navigation.css';

function navigation({router,handleClick}) {


     let display='Signout';

       if(router==='SignIn')
        display='Register';
         
         else if(router==='Register')
          display='SignIn'

        

    return (

        <nav className='f3 container'>
            <p className="dim underline link pa3 pointer"  onClick={()=>handleClick(display)}>{display}</p>
        </nav>
    )




}
export default navigation;