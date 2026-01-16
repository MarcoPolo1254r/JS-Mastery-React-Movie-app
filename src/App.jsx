const PlaceHolder = ({title,object}) => {
  return (
    <div>
      <h2>{title} and {object.name}</h2>
    </div>    
  )
}

const App = () => {
  return (
  <div>   
    <h1>Functional function </h1>

    <PlaceHolder title="Better Call Saul" object ={{name:'Jhon Paul', age: 45}} />
  </div>
  )
}

export default App
