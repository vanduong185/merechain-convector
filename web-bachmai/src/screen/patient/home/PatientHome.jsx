import React from 'react';
import './PatientHome.css';
import DoctorsList from '../../../component/doctors_list/doctorsList';
import PatientMeresList from "../../../component/patient_meres/patientMeresList";
import avatar from '../../../assets/images/avatar.png';
import { MDBBtn } from "mdbreact";
import DOCTORS from './doctor_data.json';
import * as axios from "axios";
import { SERVER } from '../../../config';

export default class Home extends React.Component {
	constructor() {
		super();

		this.state = {
			uid: '',
			fullName: '',
			email: '',
			dob: '',
			address: '',
			listRecord: []
		};
	}

	componentWillMount() {
		let uid = localStorage.getItem("uid");	

		this.setState({
			uid: uid
		});

		axios.get(SERVER + "patient/" + uid).then(res => {
			console.log(res);
			if (res.status == 200) {
				let patient = res.data
				this.setState({
					fullName: patient._name,
					email: patient._email,
					dob: patient._birthyear,
					address: patient._address
				})
			}
		})
	}

	componentDidMount() {
		let uid = localStorage.getItem('uid');

		axios.get(SERVER + "record/getByPatientID/" + uid).then(res => {
			console.log(res);

			if (res.status == 200) {
				if (res.data.status == "ok") {
					let data = res.data.data;

					this.sortRecords(data.record);

					this.setState({
						listRecord: data.record
					})
				}
				else {
					console.log(res.data.msg);
				}
			}
			else {
				console.log("err");
			}
		})
	}

	sortRecords(records) {
		for (var i = 0; i < records.length; i++) {
			for (var j=i+1; j < records.length; j++) {
				if (records[i]._createdDate < records[j]._createdDate) {
					var tmp = records[i];
					records[i] = records[j];
					records[j] = tmp;
				}
			}
		}
	}

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
					{/* <div className="col-8 feature-container">
						<h4 className="card-title">Danh sách bác sĩ</h4>
						<DoctorsList doctors={DOCTORS} />
					</div> */}
					<div className="col-8 feature-container">
						<h4 className="card-title">Danh sách bệnh án</h4>
						<PatientMeresList listRecord={this.state.listRecord}/>
					</div>
				</div>
			</div>
		);
	}
}
