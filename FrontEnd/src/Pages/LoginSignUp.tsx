import "./CSS/LoginSignUp.css"
import {ChangeEvent, useState} from 'react'
function LoginSignUp(){

  const [state,setState] = useState("Sign Up")
  const [formData,setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandler = (e : ChangeEvent<HTMLInputElement>) =>{
    setFormData({...formData,[e.target.name] : e.target.value})
  }

  const login = async () =>{
    console.log("Login Function Executed",formData)
    let responseData; 
    await fetch("http://localhost:4000/login")
  }

  const signup = async() =>{
    const response = await fetch("http://localhost:4000/signup",{
      method: 'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const responseData = await response.json();
    
    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
    }

    window.location.replace("/")
  }


  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up"  ? <input  onChange={changeHandler} name="username" value={formData.username} type="text" placeholder="Your Name" /> : <></>} 
          <input type="email" onChange={changeHandler} name="email" value={formData.email} placeholder="Email Address" />
          <input type="password" onChange={changeHandler} name="password" value={formData.password} placeholder="Password"/>
        </div>
        <button onClick={()=>{state==="Login"? login(): signup()}}>Continue</button>
        {state === "Sign Up" ? 
        <p className="loginsignup-login"> Already have an account? <span onClick={() => {setState("Login")} }>Login here</span></p> 
        : <p className="loginsignup-login"> Create an account? <span onClick={() => {setState("Sign Up")}}>Click here</span> </p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id=""/>
          <p>By continuing. i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
};

export default LoginSignUp;
