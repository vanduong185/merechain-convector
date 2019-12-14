import React from 'react';
// import './patien.css';

export default class PatientMere extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <span>{this.props.name}</span>
                <span>{this.props.date}</span>
            </li>
        )
    }
}
