import React from 'react'
import './App.css'
import Strand, {test} from 'strand'

Strand().then(() => console.log('strand initialised'))

const runStrandTest = () => {
  test()
}

const StrandButton: React.FC = () => {
  return <div style={{background: 'gray', cursor: 'pointer'}} onClick={runStrandTest}>Click</div>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Ballot verifier
        </p>
        <StrandButton />
      </header>
    </div>
  )
}

export default App
