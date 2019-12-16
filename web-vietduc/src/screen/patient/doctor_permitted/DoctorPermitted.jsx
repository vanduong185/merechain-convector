import React from 'react';
import DOCTORS from './doctor_permitted.json';
import DoctorsList from '../../../component/doctors_list/doctorsList';
import { MDBBtn, MDBInput } from "mdbreact";
import axios from "axios";
import { SERVER } from '../../../config.js';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

export default class DoctorPermitted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pracID: ""
        }

        this.onAddBtn = this.onAddBtn.bind(this);
    }

    handlePracIDInput = e => {
        this.setState({
            pracID: e.target.value
        })
    }

    onAddBtn() {
        console.log(this.state.pracID);

        let uid = localStorage.getItem("uid");

        axios.post(SERVER + "patient/grantPermission",
            {
                patientID: uid,
                practitionerID: this.state.pracID
            }
        ).then(res => {
            console.log(res);

            if (res.status == 200) {
                ToastsStore.success("Cấp quyền thành công");

                setTimeout(() => {
                    window.location.reload();
                }, 2000)

            }
            else {
                ToastsStore.error("Không thành công. Kiểm tra lại ID của bác sĩ");
            }
        })
    }

    render() {
        return (
            <div className="ma-50-pad-30 border-container">
                <h4 className="card-title">Danh sách bác sĩ được cấp quyền</h4>
                <div className="row">
                    <div className="col-9" style={{ float: 'left' }}>
                        <MDBInput label="Nhập id bác sĩ ..."
                            value={this.state.pracID}
                            onInput={this.handlePracIDInput}
                        />
                    </div>

                    <div className="col-3" style={{ float: 'right' }}>
                        <MDBBtn color={"cyan"}
                            onClick={this.onAddBtn}
                        >
                            {'Thêm bác sĩ'}
                        </MDBBtn>
                    </div>
                </div>
                <DoctorsList />
                <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} />
            </div>
            // <div className="container-custom border-container">
            //   <DoctorsList/>
            // </div>
        )
    }
}
