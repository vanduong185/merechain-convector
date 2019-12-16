import React from 'react';
import './CreateMedicalRecord.css';
import { MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";
import { SERVER } from '../../../config';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

export default class CreateMedicalRecord extends React.Component {
	constructor() {
		super();
		var today = new Date(),
			date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
		this.state = {
			date: date,
			nameRecord: '',
			content: '',
			pracID: '',
			patientID: '',
		};
	}

	componentWillMount() {
		let uid = localStorage.getItem('uid');

		this.setState({
			pracID: uid,
			patientID: this.props.match.params.id
		})
	}

	createMere = () => {
		let record = {
			"patientID": this.state.patientID,
			"practitionerID": this.state.pracID,
			"content": this.state.content,
			"name": this.state.nameRecord
		}

		axios.post(SERVER + "record", record).then(res => {
			console.log(res);
			if (res.status == 200) {
				if (res.data.status == "ok")
					ToastsStore.success("Bệnh án đã được tạo");
				else
					ToastsStore.error("Bác sĩ không có quyền tạo bệnh án cho bệnh nhân này");
			}
		})
	}

	contentChange = (event) => {
		this.setState({
			content: event.target.value
		})
	}

	nameChange = (event) => {
		this.setState({
			nameRecord: event.target.value
		})
	}

	render() {
		return (
			<div className="container-custom">
				<div className="medical-record-container" style={{ padding: 10 }}>
					<h4 className="card-title">Tạo bệnh án</h4>
					<div className="line"></div>
					<span style={{ textAlign: 'left', marginBottom: 10 }}>
						ID người tạo bệnh án: {this.state.pracID}
					</span>
					<span style={{ textAlign: 'left', marginBottom: 10 }}>
						ID bệnh nhân: {this.state.patientID}
					</span>
					<span style={{ textAlign: 'left', marginBottom: 10 }}>Ngày tạo bệnh án: {this.state.date}</span>
					<span style={{ textAlign: 'left', marginBottom: 5 }}>Tên bệnh án:</span>
					<input className="form-control" style={{ marginBottom: 10 }} onChange={this.nameChange} placeholder="Nhập tên bệnh án ..." />
					<span style={{ textAlign: 'left', marginBottom: 10 }}>Nội dung bệnh án: </span>
					<textarea id="textarea-char-counter" className="form-control md-textarea"
						placeholder="Nhập nội dung..." rows="20" onChange={this.contentChange}></textarea>
					<MDBBtn style={{ marginTop: 20, borderRadius: 10 }} onClick={this.createMere}>Tạo bệnh án</MDBBtn>
				
				</div>
				<ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT}/>
			</div>
		);
	}
}
