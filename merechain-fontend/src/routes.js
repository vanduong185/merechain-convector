import React from 'react';
import Home from './screen/doctor/home/Home';
import CreateMedicalRecord from './screen/doctor/create_medical_record/CreateMedicalRecord';
import PatientMeres from './screen/doctor/patient_meres/PatientMeres';


function Loading() {
  return (
    <div>
      ...Loading
    </div>
  )
}

const routes = [
  {path: '/merechain/home', exact: true, name: 'Home', component: Home },
  {path: '/merechain/create_medical_record', name: 'CreateMedicalRecord', component: CreateMedicalRecord },
  {path: '/merechain/patient_meres/:id', name: 'PatientMeres', component: PatientMeres }
];

export default routes;