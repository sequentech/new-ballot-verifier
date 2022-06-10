import React from "react"
import styled from "styled-components"
import {Link} from "./Link"

const StyledHeader = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    width: 100%;
    max-width: 1100px;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
`

const LogoImg = styled.img`
    height: 20px;
`

export const Header: React.FC = () => (
    <StyledHeader>
        <Link href="https://sequentech.io/" target="_blank">
            <LogoImg src="Sequent_logo_small.png"></LogoImg>
        </Link>
    </StyledHeader>
)
