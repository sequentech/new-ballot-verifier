import React from "react"
import {Button} from "../../components/Button"
import styled from "styled-components"
import {test} from "strand"

const ExtendedButton = styled(Button)`
    width: 100%;
`

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`

const StrandButton: React.FC = () => {
    return <ExtendedButton onClick={test}>Verify Ballot</ExtendedButton>
}

const HBox = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
`

const BallotBoxArea = styled.textarea`
    flex: 1;
`

const InfoBox = styled.div`
    flex: 1;
`

const ScreenshotImg = styled.img`
    flex: 1;
    max-width: 100%;
    border: 1px solid #999;
    margin: -1px;
`

export const BallotVerifierScreen: React.FC = () => (
    <>
        <h1>Audit Your Ballot</h1>
        <HBox>
            <BallotBoxArea rows={16} />
            <InfoBox>
                <span>
                    Get the ballot from the voting booth, which looks like in the picture below.
                    Copy the full text from the voting booth and paste it on the right text area.
                </span>
                <p>State: VERIFIED</p>
                <ScreenshotImg src="locator_screenshot.png"></ScreenshotImg>
            </InfoBox>
        </HBox>
        <ButtonWrapper>
            <StrandButton />
        </ButtonWrapper>
    </>
)
