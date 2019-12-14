import React, { Component } from 'react'
import routes from './../../routes.js';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export default class Layout extends Component {
	// componentDidMount() {
	//     if (!localStorage.getItem("token")) {
	//         window.localStorage.clear();
	//         window.location.href = "/#/form";
	//     }
	// }
	render() {
		return (
			<div className='main-container'>
				<div className="header">
					<Link to={"/merechain/home"}>
						<img src={logo} className="logo"></img>
					</Link>
				</div>
				<div id={"main-content"} style={{ flexGrow: 1 }}>
					<Switch>
						{routes.map((route, idx) => {
							return route.component ?
								(<Route key={idx} path={route.path} exact={route.exact} name={route.name}
									render={props => (
										<route.component {...props} />
									)} />) : (null);
						})}
					</Switch>
				</div>
				{/* <div style={{ position: "relative", zIndex: "1" }}>
                    <Footer />
                </div> */}
			</div>
		)
	}
}