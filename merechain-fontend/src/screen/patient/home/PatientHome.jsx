import React from 'react';
import './PatientHome.css';
import DoctorsList from '../../../component/doctors_list/doctorsList';
import avatar from '../../../assets/images/avatar.png';
import { MDBBtn } from "mdbreact";
import DOCTORS from './doctor_data.json';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			fullName: 'Nguyễn Văn C',
			email: 'C@gmail.com',
			dob: '21/11/1999',
			address: 'Hoàng Mai - Hà Nội'
		};
	}

	// signIn() {
	// 	window.location.href = "#/home";
	// }

	renderRedirect = () => {
		window.location.href = '/#/merechain/doctor_permitted';
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
							<div style={{ paddingBottom: 10 }}>
								<div style={{ marginBottom: 10 }}>Họ và tên: {this.state.fullName}</div>
								<div style={{ marginBottom: 10 }}>Email: {this.state.email}</div>
								<div style={{ marginBottom: 10 }}>Ngày sinh: {this.state.dob}</div>
								<div style={{ marginBottom: 10 }}>Địa chỉ: {this.state.address}</div>
							</div>
						</div>
						<MDBBtn gradient="aqua" style={{ borderRadius: 10 }} className="add-mere-btn"
							onClick={this.renderRedirect}
						>Danh sách bác sĩ được cấp quyền</MDBBtn>
					</div>
					<div className="col-8 feature-container">
						<h4 className="card-title">Danh sách bác sĩ</h4>
						<DoctorsList doctors={DOCTORS} />
					</div>
				</div>
			</div>
		);
	}
}
