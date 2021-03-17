import ChatBox from '../ChatBox';
import SideBar from '../SideBar';

import './root.scss';
import './main.scss';

const App = () => {
	return (
		<main>
			<SideBar />
			<ChatBox />
		</main>
  );
}

export default App;