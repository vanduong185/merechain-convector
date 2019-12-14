import React from 'react';
import DOCTORS from './doctor_permitted.json';
import DoctorsList from '../../../component/doctors_list/doctorsList';

export default class DoctorPermitted extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-custom border-container">
              <DoctorsList doctors={DOCTORS}/>
            </div>
        )
    }
}
