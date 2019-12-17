import React from 'react';
import './patien.css';

export default class Patient extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var link = '#/merechain/patient_meres/' + this.props.id;
        return (
            <li>
                <img className="img-list" src={this.props.image} alt="img" />
                <span><a href={link}>{this.props.name}</a></span>
                <span>{this.props.phoneNumber}</span>
            </li>
        )
    }
}
