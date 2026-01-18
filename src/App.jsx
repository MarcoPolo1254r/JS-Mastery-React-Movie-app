import { useState, useEffect } from "react"


const Card = ({title}) => {
  const [count, setCount] = useState (0);
  const [hasLiked, setHasLiked] = useState(false);
  
  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);    
  },[hasLiked]);
  
  return (
    <div className="card" onClick={()=> setCount((prevState) => prevState + 1)}>
      <h1> {title} <br /> {count} </h1>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? 'Liked' : "Like"}
      </button>
    </div>    
  )
}

const App = () => {

  return (
  <div className="card-container">   
    <h1>Functional</h1>
    <Card title="Better Call Saul" />
    <Card title="Star Wars" />
    <Card title="God Father" />
  </div>
  )
}

export default App
