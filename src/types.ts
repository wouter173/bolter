export type Message = {
	body: string;
	sig: string;
	user: User
};

export type User = {
	nick: string;
};