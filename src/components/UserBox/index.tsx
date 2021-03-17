import React from 'react'
import { Message } from '../../types';
import TextBox from '../TextBox';

import './main.scss';

type props = {
	message: Message;
}

const userBox = ({ message }: props) => {
	return (
		<article className="userbox">
			<img src="https://gravatar.com/wouter173/" alt="" />
			<span className="tag">
				<span className="nick">{message.user.nick}</span>
				<span className="slug">#BigDick</span>
			</span>

			<TextBox text={message.body} />
		</article>
  	);
}

export default userBox;
