// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import NewBallotVerifierLib, {setHooks} from "new-ballot-verifier-lib"
import styled from "styled-components"
import {Footer} from "./components/Footer"
import {Header} from "./components/Header"
import {BallotVerifierScreen} from "./screens/ballot-verifier/BallotVerifierScreen"

NewBallotVerifierLib().then(setHooks)

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
