import React from 'react';
import './DoctorHome.css';
import PatientsList from '../../../component/patiens_list/patiensList';
import avatar from '../../../assets/images/avatar.png';
import { MDBInput, MDBBtn } from "mdbreact";
import { Redirect } from 'react-router-dom'

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			fullName: 'Nguyễn Văn A',
			email: 'a@gmail.com',
			hospital: 'Bạch Mai'
		};
	}

	// signIn() {
	// 	window.location.href = "#/home";
	// }

	renderRedirect = () => {
		window.location.href = '/#/merechain/create_medical_record';
	}

	render() {
		return (
			<div>
				<div className="row container-custom container-home">
					<div className="col-3">
						<div className="profile-container">
							<div className="avatar-container">
								<img src={avatar} width={150} height={150}></img>
							</div>
							<div className="line"></div>
							<div style={{ paddingBottom: 5 }}>
								<div style={{ marginBottom: 10 }}>Họ và tên: {this.state.fullName}</div>
								<div style={{ marginBottom: 10 }}>Email: {this.state.email}</div>
								<div style={{ marginBottom: 10 }}>Nơi làm việc: {this.state.hospital}</div>
							</div>
						</div>
						<MDBBtn gradient="aqua" style={{ borderRadius: 10 }} className="add-mere-btn" onClick={this.renderRedirect}>Tạo bệnh án</MDBBtn>
					</div>
					<div className="col-8 feature-container">
						<h4 style={{ margin: 15, fontWeight: 500 }}>Danh sách bệnh nhân</h4>
						<PatientsList />
					</div>
				</div>
			</div>
		);
	}
}
