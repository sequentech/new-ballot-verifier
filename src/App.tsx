import React from "react"
import "./App.css"
import Strand, {test} from "strand"
import styled from "styled-components"

Strand().then(() => console.log("strand initialised"))

const runStrandTest = () => {
    test()
}

const StyledButton = styled.div`
    background: gray;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 10px;
`

const StrandButton: React.FC = () => {
    return <StyledButton onClick={runStrandTest}>Click</StyledButton>
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Ballot verifier</p>
                <StrandButton />
            </header>
        </div>
    )
}

export default App
