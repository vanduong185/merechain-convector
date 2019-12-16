import React from 'react';
import './Login.css';
import { MDBInput, MDBBtn } from "mdbreact";
import * as axios from "axios";
import { SERVER } from "../../config";

export default class Login extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			login: false,
		};

		this.signInPatient = this.signInPatient.bind(this);
		this.signInDoctor = this.signInDoctor.bind(this);
	}

	signInDoctor() {
		var cre = {
			email: this.state.email,
			password: this.state.password
		}

		axios.post(SERVER + "practitioner/login", cre).then(res => {
			if (res.status == 200) {
				if (res.data.status == "ok") {
					let prac = res.data.data.practitioner;
					console.log(prac);
					
					localStorage.setItem('typeUser', "practitioner");
					localStorage.setItem('uid', prac._id);

					window.location.href = "#/merechain/doctor_home";
				}
				else {
					console.log("fail1");
				}
			}
			else {
				console.log("fail2");
			}
		});
	}

	signInPatient() {
		var cre = {
			email: this.state.email,
			password: this.state.password
		}
		
		axios.post(SERVER + "patient/login", cre).then(res => {
			if (res.status == 200) {
				if (res.data.status == "ok") {
					let patient = res.data.data.patient;
					console.log(patient);
					
					localStorage.setItem('typeUser', "patient");
					localStorage.setItem('uid', patient._id);

					window.location.href = "#/merechain/patient_home";
				}
				else {
					console.log("fail1");
				}
			}
			else {
				console.log("fail2");
			}
		});
	}

	onEmailChange = e => {
		this.setState({
			email: e.target.value
		})
	}

	onPasswordChange = e => {
		this.setState({
			password: e.target.value
		})
	}

	render() {
		return (
			<div className="background">
				<div className="form-login">
					{/* <span className="title">Merechain</span> */}
					<h4 style={{ fontWeight: "bold", color: "white" }}>Bệnh viện Bạch Mai</h4>
					<MDBInput label="Tên đăng nhập" value={this.state.email} onInput={this.onEmailChange}/>
					<MDBInput label="Mật khẩu" value={this.state.password} type="password" onInput={this.onPasswordChange}/>
					<MDBBtn gradient="aqua" style={{ borderRadius: 10 }} onClick={this.signInDoctor}>Đăng nhập bác sĩ</MDBBtn>
					<MDBBtn gradient="aqua" style={{ borderRadius: 10 }} onClick={this.signInPatient}>Đăng nhập bệnh nhân</MDBBtn>
				</div>
			</div>
		);
	}
}
