import { useEffect, useRef, useState } from 'react';
import { invoke } from 'tauri/api/tauri';
import { Event, EventCallback, listen} from 'tauri/api/event';

import UserBox from '../UserBox';
import { messages } from './messages';
import svg from '../../logo/svg/bolt-icon.svg';

import './main.scss';
import { Message } from '../../types';
import TextBox from '../TextBox';

const ChatBox = () => {
  	let [editing, setEditing] = useState<string>('');
	let [messageHistory, setHistory] = useState<Message[]>([]);
	let messagesElement = useRef<HTMLDivElement>(null);

	listen<any>('message', (res) => {
		console.log('fired', res);
		// let data: Message = res.payload.d.msg;
		// data.sig = '';
		// console.log(data);
		// if (data.user.nick === 'tauri') return;
		// setHistory([...messageHistory, data]);
	})

	// useEffect(() => {
	// 	if (messagesElement.current == null) return;
	// 	messagesElement.current.scroll(0, messagesElement.current.scrollHeight);
	// }, [history])

 	const enter = () => {
  		if (editing === '') return;
		// invoke({cmd: 'send', message: editing});
		setEditing('');
		rendertext(editing);
 	}

	const rendertext = (text: string) => {
		let data = {
			body: text, 
			sig: '', 
			user: {
				nick: 'tauri',
			}
		}
		console.log(data);
		setHistory([...messageHistory, data]);
	}

	return (
		<div id="ChatBox">
			<div className="messages" ref={messagesElement}>
				{messageHistory.map((message) => {
					// if (message.user.nick === history[history.length - 1].user.nick) { 
					// 	return (
					// 		<UserBox message={message} />
					// 	)
					// }
					// return (
					// 	<TextBox text={message.body} />
					// )
					// return (
					// 	<UserBox message={message} />
					// )
					return(<p>{message.body}</p>);
				})}
			</div>

			<div className="inputBox">
				<img src={svg} alt="" className="logo"/>
					<input type="text" 
						onChange={e => { setEditing(e.target.value) }} 
						value={ editing } 
						onKeyDown={e => { if(e.key === 'Enter') enter() }}
					/>
				</div>
			</div>
  	);
}

export default ChatBox;