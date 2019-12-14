import React from 'react';
import './doctor.css';
import { MDBBtn } from 'mdbreact';

export default class Patient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: this.props.permission
        }
        console.log(this.state.permission);
    }

    onHandlePermission = () => {
        this.setState({permission: !this.state.permission});
    }

    render() {
        var link = '#/merechain/patient_meres/' + this.props.id;
        return (
            <li>
                <div className="row">
                    <div className="col-9">
                        <img className="img-list" src={this.props.image} alt="img" />
                        <span><a href={link}>{this.props.name}</a></span>
                        <span>{this.props.phoneNumber}</span>
                        <span>{this.props.email}</span>
                    </div>
                    <div className="col-3" style={{float: 'right'}}>
                        <MDBBtn onClick={this.onHandlePermission}>
                            {this.state.permission ? 'Tước Quyền' : 'Cấp quyền'}
                        </MDBBtn>
                    </div>
                </div>
            </li>
        )
    }
}
