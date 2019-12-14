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

	signInDoctor() {
		window.location.href = "#/merechain/doctor_home";
	}

	signInPatient() {
		window.location.href = "#/merechain/patient_home";
	}

	render() {
		return (
			<div className="background">
				<div className="form-login">
					<span className="title">Merechain</span>
					<MDBInput label="Tên đăng nhập" />
					<MDBInput label="Mật khẩu" />
					<MDBBtn gradient="aqua" style={{ borderRadius: 10 }} onClick={this.signInDoctor}>Đăng nhập bác sĩ</MDBBtn>
					<MDBBtn gradient="aqua" style={{ borderRadius: 10 }} onClick={this.signInPatient}>Đăng nhập bệnh nhân</MDBBtn>
				</div>
			</div>
		);
	}
}
