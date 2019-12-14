import React from 'react';
import './PatientMeres.css';
import { MDBInput } from "mdbreact";
import PatientMeresList from "../../../component/patient_meres/patientMeresList";

export default class PatientMeres extends React.Component {
	constructor() {
		super();
	}

	// getPickerValue = (value) => {
	// 	console.log(value);
	// }

	render() {
		return (
			<div className="container-custom patient-meres-list">
				<PatientMeresList />
			</div>
		);
	}
}
