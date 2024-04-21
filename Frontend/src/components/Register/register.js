import React from 'react';

const initialState={

    Email: '',
    Password: '',
    Name: '',
}

class register extends React.Component {

    constructor() {
        super();
        this.state = initialState;
    }

      validateEmail=(email)=>{

         console.log(email);

        const mailformat=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      
          if(email.match(mailformat))
           return true;

            else 
            return false;

      }

      validatePassword=(passwd)=>{

          return passwd.length>=6?true:false;
       

     }

     validateName=(name)=>{

      
          const nameformat=/[a-zA-Z ]+/;

          if(name.match(nameformat))
          {
            return true;
          }

           else
           return false;
        

     }

       

    onEmailChange = (event) => {

        this.setState({ Email: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ Password: event.target.value })
    }

    onNameChange = (event) => {
        this.setState({ Name: event.target.value })
    }

    

    onRegister = () => {

       const isEmailValid =this.validateEmail(this.state.Email);
       const isPasswdValid=this.validatePassword(this.state.Password);
       const isNameValid=this.validateName(this.state.Name);

           if(!isEmailValid||!isPasswdValid||!isNameValid)
           {
              
              this.props.attemptTo("failed");
           }

           else {  
        fetch('http://localhost:3000/register', {

            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.Password,
                name: this.state.Name
            })

        })
            .then(response => response.json())
            .then(user=>{
                
                 console.log(user);

                if(user.name&&user.email)
                   {
                   this.props.loadUser(user);
                   this.props.handleClick('home')
                   }

                   else{
                    alert(user)
                   }
            });

        }

        //  this.props.handleClick('home')
    }

    render() {
        return (

            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
                        <div className='centre'>
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                        </div>

                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="name"
                                id="name"
                                required
                                onChange={this.onNameChange} />
                        </div>

                        <div class="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                required
                                onChange={this.onEmailChange} />
                        </div>
                        <div class="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="current-password"
                                id="password"
                                required
                                onChange={this.onPasswordChange} />
                        </div>

                    </fieldset>
                    <div className="centre">

                        <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={this.onRegister} />
                    </div>

                </div>
            </main>


        )
    }
}


export default register;