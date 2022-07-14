// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
import React, {useRef, useState} from "react"
import {Button} from "../../components/Button"
import styled from "styled-components"
import {hash_ballot, IBallot} from "new-ballot-verifier-lib"

const ExtendedButton = styled(Button)`
    width: 100%;
`

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 20px;
`

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

export const BallotVerifierScreen: React.FC = () => {
    const [hash, setHash] = useState<string>("")
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    const sequencer = () => {
        try {
            if (!textAreaRef.current) {
                return
            }
            const jsonBallot = JSON.parse(textAreaRef.current.value)
            const hash512 = hash_ballot(jsonBallot)
            setHash(hash512)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <h1>Audit Your Ballot</h1>
            <HBox>
                <BallotBoxArea rows={16} ref={textAreaRef} />
                <InfoBox>
                    <span>
                        Get the ballot from the voting booth, which looks like in the picture below.
                        Copy the full text from the voting booth and paste it on the right text
                        area.
                    </span>
                    <p>State: VERIFIED</p>
                    <ScreenshotImg src="locator_screenshot.png"></ScreenshotImg>
                </InfoBox>
            </HBox>
            <p>{hash}</p>
            <ButtonWrapper>
                <ExtendedButton onClick={sequencer}>Verify Ballot</ExtendedButton>
            </ButtonWrapper>
        </>
    )
}
