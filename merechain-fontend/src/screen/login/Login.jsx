import React from 'react';
import './Login.css';
import { MDBInput, MDBBtn } from "mdbreact";

export default class Login extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			login: false,
		};
	}

	signIn() {
		window.location.href = "#/merechain";
	}

	render() {
		return (
			<div className="background">
				<div className="form-login">
					<span className="title">Merechain</span>
					<MDBInput label="Tên đăng nhập" />
					<MDBInput label="Mật khẩu" />
					<MDBBtn gradient="aqua" style={{ borderRadius: 10 }} onClick={this.signIn}>Đăng nhập</MDBBtn>
				</div>
			</div>
		);
	}
}
