import React from 'react';
import './patient.css';
import { MDBBtn } from 'mdbreact'

export default class Patient extends React.Component {
    constructor(props) {
        super(props);
    }

    view = () => {
        window.location.href = '/#/merechain/patient_meres/' + this.props.id;
    }

    render() {
        var link = '#/merechain/patient_meres/' + this.props.id;
        return (
            <div className="row ma-top-20">
                <div className="col-9">
                    <img className="img-list" src={this.props.image} alt="img" />
                    <span>{"Bệnh nhân: " + this.props.name}</span>
                    <span>{"ID: " + this.props.id}</span>
                    <span>{"Năm sinh: " + this.props.birthYear}</span>
                    <span>{"Email: " + this.props.email}</span>
                    <span>{"Địa chỉ: " + this.props.address}</span>
                </div>
                <div className="col-3" style={{ float: 'right' }}>
                    <MDBBtn color={"green"} size="sm" onClick={this.view}>
                        {'Xem bệnh án'}
                    </MDBBtn>
                </div>
            </div>
        )
    }
}
