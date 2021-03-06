// SPDX-FileCopyrightText: 2022 Felix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
use sequent_core::ballot::*;
use sequent_core::encrypt::*;
use wasm_bindgen::prelude::*;
extern crate console_error_panic_hook;
use std::panic;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen]
    fn postMessage(s: &str);
}

#[allow(clippy::all)]
#[wasm_bindgen]
pub fn hash_ballot(val: &JsValue) -> String {
    let ballot: AuditableBallot = val.into_serde().unwrap();
    hash_to(&ballot).unwrap()
}

#[wasm_bindgen]
pub fn set_hooks() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}
