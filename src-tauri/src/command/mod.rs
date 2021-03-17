use boltchat::client::client::Client;
use serde::Deserialize;

mod log;

#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
  	Log { argument: String },
	Send { message: String },
}

pub fn handler(command: Cmd, client: &mut Client) { 
  	match command {
    	Cmd::Log {argument} => {
      		log::logger(argument);
    	}
  	    Cmd::Send { message } => {
            client.send_message(message);
		}
  	}
}

