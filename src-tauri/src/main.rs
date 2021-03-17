#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::thread;

use boltchat::client::{client::Client, options::Options};

mod command;
mod events;

fn main() {
	let mut client = Client::new(Options::new(
		String::from("127.0.0.1:3300"),
		String::from("tauri"),
		String::from("keypair.pgp")
	));
	let cl = client.clone();

  	let app = tauri::AppBuilder::new()
    	.invoke_handler(move |_webview, arg| {
      		match serde_json::from_str(arg) {
        		Err(e) => {
          			Err(e.to_string())
        		}

        		Ok(command) => {
          			Ok(command::handler(command, &mut client))
        		}
      		}
    	}).setup(move | webview, _arg| {
			let mut receiver = cl.clone();
			let mut webviewmut = webview.as_mut();
			thread::spawn(move || {
				loop {
					events::handler(receiver.receive().unwrap(), &mut webviewmut);
				}
			});
		})
		.build();

	app.run();
}
