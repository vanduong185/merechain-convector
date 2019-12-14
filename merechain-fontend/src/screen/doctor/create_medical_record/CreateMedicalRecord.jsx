import React from 'react';
import './CreateMedicalRecord.css';
import { MDBInput } from "mdbreact";

export default class CreateMedicalRecord extends React.Component {
	constructor() {
		super();
		var today = new Date(),
			date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
		this.state = {
			date: date,
			name: "Nguyễn Văn A",
			content: ''
		};
	}

	createMere = () => {
		console.log(this.state.date);
		console.log(this.state.name);
		console.log(this.state.content);
	}

	contentChange = (event) => {
		this.state.content = event.target.value;
	}

	render() {
		return (
			<div className="container-custom">
				<div className="medical-record-container" style={{ padding: 10 }}>
					<h4 className="card-title">Tạo bệnh án</h4>
					<div className="line"></div>
					<span style={{ textAlign: 'left', marginBottom: 10 }}>
						Người tạo bệnh án: {this.state.name}
					</span>
					<span style={{ textAlign: 'left', marginBottom: 10 }}>Ngày tạo bệnh án: {this.state.date}</span>
					<span style={{ textAlign: 'left', marginBottom: 10 }}>Nội dung bệnh án: </span>
					<textarea id="textarea-char-counter" className="form-control md-textarea"
						placeholder="Nhập nội dung..." rows="20" onChange={this.contentChange}></textarea>
					<MDBBtn style={{ marginTop: 20, borderRadius: 10 }} onClick={this.createMere}>Tạo bệnh án</MDBBtn>
				</div>
			</div>
		);
	}
}
