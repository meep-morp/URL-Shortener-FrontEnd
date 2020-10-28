import Form from "./components/form";
import "antd/dist/antd.css";
import Header from "./components/header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Banner from "./components/banner";
import Footer from "./components/footer";

function App() {
	return (
		<div className="App">
			<Router>
				<Route path="/" exact>
					<div className="home-container">
						<Banner />
						<section>
							<Form />
						</section>
					</div>
				</Route>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
