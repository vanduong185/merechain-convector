import React from 'react';
import DoctorHome from './screen/doctor/home/DoctorHome';
import PatientHome from './screen/patient/home/PatientHome';
import CreateMedicalRecord from './screen/doctor/create_medical_record/CreateMedicalRecord';
import PatientMeres from './screen/doctor/patient_meres/PatientMeres';
import DoctorPermitted from './screen/patient/doctor_permitted/DoctorPermitted';

function Loading() {
  return (
    <div>
      ...Loading
    </div>
  )
}

const routes = [
  {path: '/merechain/doctor_home', exact: true, name: 'DoctorHome', component: DoctorHome },
  {path: '/merechain/patient_home', exact: true, name: 'PatientHome', component: PatientHome },
  {path: '/merechain/create_medical_record/:id', name: 'CreateMedicalRecord', component: CreateMedicalRecord },
  {path: '/merechain/patient_meres/:id', name: 'PatientMeres', component: PatientMeres },
  {path: '/merechain/doctor_permitted', name: 'DoctorPermitted', component: DoctorPermitted }
];

export default routes;