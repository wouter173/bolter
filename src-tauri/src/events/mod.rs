use boltchat::events::Events;
use tauri::WebviewMut;

pub fn handler(event: Events, webview: &mut WebviewMut) {
    match event {
        Events::Join(_) => {}
        Events::Leave(_) => {}
        Events::Message(message) => {
            println!("{}", message.d.msg.user.nick);
            if message.d.msg.user.nick == String::from("tauri") { return };
            match tauri::event::emit(webview, r#"message"#, Some(message)) {
                Ok(_) => {}
                Err(e) => {panic!(e)}
            };
        }
        Events::Error(_) => {}
    }
}