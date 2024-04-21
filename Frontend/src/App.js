import React from 'react';
import './App.css';
import Navigation from './components/Navigation/navigation';
import Logo from './components/Logo/logo';
import Rank from './components/Rank/rank';
import Signin from './components/Signin/signin';
import Register from './components/Register/register';
import ImageLinkForm from './components/ImageForm/form';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecogniton/facerecognition';
import RegisterPopup from './components/Popups/registrationPopup';
import SignInPopup from './components/Popups/SignInPopup';

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  router: 'SignIn',
   attempt:'success',
  user: {
    "id": '',
    "name": '',
    "email": '',
    "entries": 0,
    "joined": ''
  }
}
class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = (data) => {

    this.setState({
      user: {
        "id": data.id,
        "name": data.name,
        "email": data.email,
        "entries": data.entries,
        "joined": data.joined
      }
    })
  }

  
  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value });
  }
  FaceLocation = (data) => {
    // console.log(data.outputs[0].data.regions);
    //  const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width,height);
    const arr = data.outputs[0].data.regions;
    const face = [];
    arr.forEach(item => {
      face.push(item.region_info.bounding_box)
    })
    //  console.log(face);
    const boundaries = [];
    face.forEach(item => {
      const x = {
        left: item.left_col * width,
        top: item.top_row * height,
        bottom: height - (item.bottom_row * height),
        right: width - (item.right_col * width)
      }
      boundaries.push(x);
    })
    //  console.log(boundaries);
    this.setState({ box: boundaries });
  }
  handleClick = (value) => {
    if (value === 'Signout') {
      this.setState(initialState);
    }
    else {
      this.setState({ router: value });
    }
    console.log(value);
    // this.setState({ router: value === 'Signout' ? 'SignIn' : value })
    console.log(this.state.router);
  }
  OnButtonClick = () => {
    // console.log('click');
    // console.log(this.state.input);
    this.setState({ imageUrl: this.state.input });

      fetch('http://localhost:3000/detectfaces',{
          
       method:'post',
       headers:{
          "Content-Type":"application/json"
       },
      
       body:JSON.stringify({
           url:this.state.input
       })

   })
   .then(response=>response.json())
   .then(result=>{
     console.log(result);
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.user.id
      })
    }).then(response => response.json())
      .then(count => {
        console.log(count);
        this.setState(Object.assign(this.state.user, { entries: count }))
      });
      
         if(result==='No face found'||result==='Internal Server Error')
         alert(result);

          else
        this.FaceLocation(result)

    

   }).catch(console.log);

   
  }
  attemptTo=(status)=>{
     
     console.log(status);
      this.setState({attempt:status});
  }

   handleRouter=(route)=>{
    this.setState({router:route,attempt:'success'});
   }
  render() {
    if (this.state.router === 'home') {
      return (
        <div className="App">
          <ParticlesBg type="cobweb" bg={true} />
          <Navigation router={this.state.router} handleClick={this.handleClick} />
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm OnInputChange={this.onInputChange} OnButtonClick={this.OnButtonClick} />
          <FaceRecognition image={this.state.imageUrl} box={this.state.box} />
        </div>
      )
    }
    else if (this.state.router === 'SignIn') {
       
       if(this.state.attempt==='success')
      {
      return (
        <div className='App'>
          <ParticlesBg type="cobweb" bg={true} />
          <Navigation router={this.state.router} handleClick={this.handleClick} />
          <Logo />
          <Signin handleClick={this.handleClick} loadUser={this.loadUser} attemptTo={this.attemptTo} />
        </div>
      )
      }

       else if(this.state.attempt==='failed'){

        return (
          <div className='App'>
            <ParticlesBg type="cobweb" bg={true} />
            <Navigation router={this.state.router} handleClick={this.handleClick} />
            <Logo />
            <Signin handleClick={this.handleClick} loadUser={this.loadUser} attemptTo={this.attemptTo}/>
            <SignInPopup handleRouter={this.handleRouter} />
          </div>
        )
       }
    }
    else if (this.state.router === 'Register') {
      
        if(this.state.attempt==='success'){

      return (
        <div className='App'>
          <ParticlesBg type="cobweb" bg={true}  num={200}/>
          <Navigation router={this.state.router} handleClick={this.handleClick} />
          <Logo />
          <Register loadUser={this.loadUser} handleClick={this.handleClick} attemptTo={this.attemptTo}/>
        </div>
      )
    }
     else if(this.state.attempt==='failed'){
      
      return (
       <div className='App'>
       <ParticlesBg type="cobweb" bg={true} />
       <Navigation router={this.state.router} handleClick={this.handleClick} />
       <Logo /> 
       <Register loadUser={this.loadUser} handleClick={this.handleClick} attemptTo={this.attemptTo}/>
         <RegisterPopup handleRouter={this.handleRouter}/>
     </div>
      )
    }
     }
  }

  }

export default App;
