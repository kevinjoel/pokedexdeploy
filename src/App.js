import './App.scss';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom";

//COMPONENTS
import Navbar from "./components/Navbar";

//PAGES
import HomeComponent from "./pages/Home";

function App() {
	return (
		<Router className="main-wrapper">
			<div className="header">
				<Navbar />
			</div>
			<div className="content">
				<Switch>
					<Route path="/" component={HomeComponent} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
