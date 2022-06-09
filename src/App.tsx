import React from "react"
import Strand, {test} from "strand"
import styled from "styled-components"
import {Button} from "./components/Button"
import {Footer} from "./components/Footer"
import {Header} from "./components/Header"

Strand().then(() => console.log("strand initialised"))

const runStrandTest = () => {
    test()
}

const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-size: 14px;
    line-height: 1.43;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    padding: 10px;
    align-items: center;
`

const StrandButton: React.FC = () => {
    return <Button onClick={runStrandTest}>Click</Button>
}

const App = () => (
    <StyledApp>
        <Header />
        <Body>
            <StrandButton />
        </Body>
        <Footer />
    </StyledApp>
)

export default App
