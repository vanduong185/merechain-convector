import React from 'react';
import './PatientMeres.css';
import { MDBInput, MDBBtn } from "mdbreact";
import PatientMeresList from "../../../component/patient_meres/patientMeresList";
import axios from "axios";
import { SERVER } from "../../../config";

export default class PatientMeres extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			patientID: this.props.match.params.id,
			isRejected: false,
			listRecord: []
		}

	}

	componentDidMount() {
		let uid = localStorage.getItem('uid');

		axios.get(SERVER + "record/getByPatientIDPracID", {
			params: {
				patientID: this.state.patientID,
				practitionerID: uid
			}
		}).then(res => {
			console.log(res);

			if (res.status == 200) {
				if (res.data.status == "ok") {
					let data = res.data.data;

					this.sortRecords(data.record);

					console.log(data.record);
					
					this.setState({
						listRecord: data.record
					})
				}
				else {
					console.log(res.data.msg);
					this.setState({
						isRejected: true
					})
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

	onAddBtn = () => {
		window.location.href = '/#/merechain/create_medical_record/' + this.state.patientID;
	}

	render() {
		return (
			<div className="ma-50-pad-30 patient-meres-list">
				{this.renderList()}
			</div>
		);
	}

	renderList() {
		if (this.state.isRejected)
			return (
				<div style={{ padding: 30 }}>
					<p>{"Bác sĩ chưa được cấp quyền từ bệnh nhân này"}</p>
				</div>
			)
		else
			return (
				<div>
					<h4 className="card-title" style={{ textAlign: "start" }}>
						{'ID: ' + this.state.patientID}
					</h4>
					<div className="row">
						<div className="col-9" style={{ float: 'left' }}>
							<h4 className="card-title" style={{ textAlign: "start" }}>
								Danh sách bệnh án
								</h4>
						</div>

						<div className="col-3" style={{ float: 'right' }}>
							<MDBBtn color={"cyan"}
								onClick={this.onAddBtn}
							>
								{'Thêm bệnh án'}
							</MDBBtn>
						</div>
					</div>

					<PatientMeresList listRecord={this.state.listRecord}/>
				</div>
			)
	}
}
