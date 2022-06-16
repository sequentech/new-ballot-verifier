import Strand from "strand"
import SequentCore, {my_init_function} from "sequent-core"
import styled from "styled-components"
import {Footer} from "./components/Footer"
import {Header} from "./components/Header"
import {BallotVerifierScreen} from "./screens/ballot-verifier/BallotVerifierScreen"

Strand().then(() => console.log("strand initialised"))
SequentCore().then(my_init_function)

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
    width: 100%;
    max-width: 1100px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
`

const App = () => (
    <StyledApp>
        <Header />
        <Body>
            <BallotVerifierScreen />
        </Body>
        <Footer />
    </StyledApp>
)

export default App
