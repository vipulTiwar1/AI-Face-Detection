import React from 'react';

class signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SigninEmail: '',
            SigninPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ SigninEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ SigninPassword: event.target.value })
    }

    onSignIn=()=>{


         fetch('http://localhost:3000/signin',{
          
            method:'post',
             headers:{
                "Content-Type":"application/json"
             },
             
             body:JSON.stringify({
                email:this.state.SigninEmail,
                password:this.state.SigninPassword
             })

         })
         .then(response=>response.json())
         .then(user=>{
 
             console.log(user);
            if(user.id)
            {
                   this.props.loadUser(user);
                this.props.handleClick('home');
            }

             else{
                
                 this.props.attemptTo('failed');

             }

         });
        
        //  this.props.handleClick('home')
    }


    render() {
        return (

            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0 ">
                        <div className='centre'>
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                             type="email"
                             name="email-address" 
                             id="email-address"
                              required
                             onChange={this.onEmailChange} />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password" 
                            id="password"
                            required 
                            onChange={this.onPasswordChange}/>
                        </div>
                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                    </fieldset>
                    <div className="centre">
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma1" type="submit" value="Sign in" onClick={this.onSignIn} />
                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib ma1" type="submit" value="Register" onClick={() => this.props.handleClick('Register')} />
                    </div>

                </div>
            </main>


        )
    }
}


export default signin;