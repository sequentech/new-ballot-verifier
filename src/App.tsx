import React from "react"
import Strand, {test} from "strand"
import styled from "styled-components"

Strand().then(() => console.log("strand initialised"))

const runStrandTest = () => {
    test()
}

const Button = styled.div`
    display: flex;
    flex-grow: 0;
    background: gray;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 10px;
`

const StyledApp = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-size: 14px;
    line-height: 1.43;
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    width: 100%;
    max-width: 1100px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
`
const Footer = styled.div`
    height: 40px;
    background-color: #eee;
    padding: 40px 0;
    color: #333;
    width: 100%;
`

const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 1100px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    padding: 10px;
    align-items: center;
`

const LogoImg = styled.img`
    height: 20px;
`

const Link = styled.a`
    font-weight: 700;
    text-decoration: none;
    color: #333;
`

const SocialWrapper = styled.div`
    display: flex;
    flex-grow: 2;
    align-items: center;
    justify-content: center;
`

const StrandButton: React.FC = () => {
    return <Button onClick={runStrandTest}>Click</Button>
}

const App = () => (
    <StyledApp>
        <Header>
            <LogoImg src="Sequent_logo_small.png"></LogoImg>
        </Header>
        <Body>
            <StrandButton />
        </Body>
        <Footer>
            <FooterWrapper>
                <p>
                    Powered by{" "}
                    <Link href="https://sequentech.io/" target="_blank">
                        Sequent
                    </Link>
                </p>
                <SocialWrapper>
                    <p>Twitter</p>
                </SocialWrapper>
            </FooterWrapper>
        </Footer>
    </StyledApp>
)

export default App
