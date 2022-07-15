// SPDX-FileCopyrightText: 2022 Félix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only

describe('wasm test local', () => {
  it('tests pass', async () => {
    //const ballotFixture = await fetch('../fixtures/ballot.json').then(res => res.json());
    const { default: ballotFixture } = await import("../../../fixtures/ballot.json", {assert: {type: "json"}});
    await browser.url("http://localhost:8080/");
    await browser.waitUntil(
      async () => (await browser.getTitle()).match("Ballot Verifier"),
      20000,
      "Title didn't match"
    );

    const ballotBoxArea = await $('#ballotbox-area');
    const verifyButton = await $('#verify-button');
    const calculatedHash = await $('#calculated-hash');
    const expectedHash = "bc15bf91def8033b8b586e929335c40e23ffc576a1bcb469909646222abcf6858e290b52f836cbb9744462c6869788878d88b22c8b4d9efd7cb750b700dba3e8";

    ballotBoxArea.textContent = ballotFixture;
    verifyButton.click();

    await browser.waitUntil(
      async () => calculatedHash.textContent === expectedHash,
      { 
        timeout: 20000,
        timeoutMsg: 'Get hash timeout' 
      }
    );
  
  });
});
