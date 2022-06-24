// SPDX-FileCopyrightText: 2022 Felix Robles <felix@sequentech.io>
//
// SPDX-License-Identifier: AGPL-3.0-only
use sequent_core::ballot::*;
use sequent_core::encrypt::*;
//use sequent_core::util::*;
//use serde::{Deserialize, Serialize};
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
/*
#[wasm_bindgen]
pub fn message(s: &str) {
    log(s);
    postMessage(s);
}

#[wasm_bindgen]
pub fn test() {
    let res = sum(2, 2);
    let formatted_msg = format!("--- wasm::test.rs - {}", res.to_string());
    message(&formatted_msg.to_string())
}
*/

#[wasm_bindgen]
pub fn hash_ballot(val: &JsValue) -> String {
    let ballot: Ballot = val.into_serde().unwrap();
    hash_to(&ballot).unwrap()
}

#[wasm_bindgen]
pub fn my_init_function() {
    panic::set_hook(Box::new(console_error_panic_hook::hook));
}
