import React from 'react';
import './CreateMedicalRecord.css';
import { MDBInput } from "mdbreact";

export default class CreateMedicalRecord extends React.Component {
	constructor() {
		super();
	}

	// getPickerValue = (value) => {
	// 	console.log(value);
	// }

	render() {
		return (
			<div className="row container-custom">
				<div className="col-3 infor-patient-container">
					<MDBInput hint="Tên bệnh nhân" />
					<MDBInput hint="Tuổi" />
					<MDBInput hint="Địa chỉ" />
				</div>
				<div className="col-7 medical-record-container">
					<MDBInput hint="Tình trạng bệnh" />
					<MDBInput hint="Chẩn đoán" />
				</div>
				{/* <MDBDatePicker getValue={this.getPickerValue} /> */}
			</div>
		);
	}
}
