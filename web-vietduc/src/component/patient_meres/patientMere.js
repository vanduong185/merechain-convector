import React from 'react';
// import './patien.css';

export default class PatientMere extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li style={{ marginTop: 30}}>
                <h5>{this.props.name ? this.props.name : 'Khám tổng quát'}</h5>
                <span>{"Ngày tạo: " + this.convertDate(this.props.date)}</span>
                <span>{"Bác sĩ: " + this.props.creator}</span>
                <span>{"Nội dung: " + this.props.content}</span>
            </li>
        )
    }

    convertDate(number) {
        console.log(number);
        return new Date(number).toISOString().slice(0, 10) + " " + new Date(number).toISOString().slice(11, 16);
    }
}
