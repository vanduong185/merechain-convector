import React from 'react';
import './doctor.css';
import { MDBBtn } from 'mdbreact';
import axios from 'axios';
import { SERVER } from '../../config';

export default class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pracID: this.props.id
        }
        console.log(this.state.permission);
    }

    onHandlePermission = () => {
        console.log(this.state.pracID);
        
        let uid = localStorage.getItem("uid");

        axios.post(SERVER + "patient/revokePermission", {
            patientID: uid,
            practitionerID: this.state.pracID
        }).then(res => {
            if (res.status == 200) {
                window.location.reload()
            }
        })
    }

    render() {
        return (
            <li>
                <div className="row ma-top-20">
                    <div className="col-9">
                        <img className="img-list" src={this.props.image} alt="img"/>
                        <span>{"Bác sĩ: " + this.props.name}</span>
                        <span>{"ID: " + this.props.id}</span>
                        <span>{"Chuyên khoa: " + this.props.workplace}</span>
                        <span>{"Email: " + this.props.email}</span>
                    </div>
                    <div className="col-3" style={{float: 'right'}}>
                        <MDBBtn color={"red"} onClick={this.onHandlePermission} size="sm">
                            {'Huỷ Quyền'}
                        </MDBBtn>
                    </div>
                </div>
            </li>
        )
    }
}
