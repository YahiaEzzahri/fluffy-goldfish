import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";

const API_GITHUB = "https://api.github.com/users/"

const status = {
  INIT:0,
  LOADING:1,
  SUCCESS:2,
  ERRO:3
}

function App({display,child}) {
  const nameRef = useRef()
  const [email,setEmail] = useState(null)
  const [state,setState] = useState(status.INIT)
  const [data,setData] = useState({})

  const handleSubmit = () =>{
    setState(status.LOADING)
    let username = nameRef.current.value
    if(username){
      fetch(API_GITHUB+username).then(res=>res.json()).then(data=>{
        setData(data);
        console.log(data);
        setState(status.SUCCESS)
      }).catch(err=>console.log(err))
    }
  }

  return (
   <Fragment>
    <div style={{display:"grid",placeItems:"center",height:"100dvh"}}>
    <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}} className="flex row">
     <div>
      <input ref={nameRef} placeholder="enter your user name"  type="text" name="name" id="name" />
     </div>
     <button>Submit</button>
    </form>
    {
      state===status.LOADING?
      <p>Loading.....</p>:state===status.SUCCESS?
      <div className="flex row">
        <div>
          <img src={data.avatar_url} style={{width:"100px"}} alt="avatar" />
        </div>
        <div>
        <h5>{data.name}</h5>
        <p>{data.bio}</p>
        <a href={data.html_url}>Link to profile</a>
        <p>followers: {data.followers}</p>
        </div>
      </div>:""}
    </div>

    
   </Fragment>
  );
}

export default App;
