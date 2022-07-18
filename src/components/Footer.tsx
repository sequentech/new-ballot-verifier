// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React from "react"
import styled from "styled-components"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faTwitter, faYoutube, faGithub} from "@fortawesome/free-brands-svg-icons"
import {Link} from "./Link"

const StyledFooter = styled.div`
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

const SocialWrapper = styled.div`
    display: flex;
    flex-grow: 2;
    align-items: center;
    justify-content: center;
    gap: 10px;
`

export const Footer: React.FC = () => (
    <StyledFooter>
        <FooterWrapper>
            <p>
                Powered by{" "}
                <Link href="https://sequentech.io/" target="_blank">
                    Sequent
                </Link>
            </p>
            <SocialWrapper>
                <Link href="https://twitter.com/Sequent_Tech" target="_blank">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                </Link>
                <Link
                    href="https://www.youtube.com/results?search_query=sequent+tech"
                    target="_blank"
                >
                    <FontAwesomeIcon icon={faYoutube} size="lg" />
                </Link>
                <Link href="https://github.com/sequentech/" target="_blank">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                </Link>
            </SocialWrapper>
        </FooterWrapper>
    </StyledFooter>
)
