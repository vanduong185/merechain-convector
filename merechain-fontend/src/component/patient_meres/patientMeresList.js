import React from 'react';
import { MDBInput } from "mdbreact";
import PatientMere from './patientMere';

let PATIENMERES = [
    {
        id: 1,
        name: 'Xét nghiệm máu tại Bạch mai',
        date: '20/11/2019',
    },
    {
        id: 2,
        name: 'Xét nghiệm máu tại Việt Đức',
        date: '02/10/2019',
    },
    {
        id: 3,
        name: 'Xét nghiệm máu tại Bạch mai',
        date: '25/12/2018',
    },
    {
        id: 4,
        name: 'Xét nghiệm máu tại Bạch mai',
        date: '06/09/2018',
    }
]

export default class PatientMeresList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPatientMere: PATIENMERES
        }
    }

    searchHandler = (event) => {
        let searcjQery = event.target.value.toLocaleLowerCase(),
        displayedPatientMere = PATIENMERES.filter((el) => {
                let searchValue = el.name.toLocaleLowerCase();
                return searchValue.indexOf(searcjQery) !== -1;
            })
        this.setState({
            displayedPatientMere: displayedPatientMere
        });
    }
    render() {
        let patientMeres = this.state.displayedPatientMere;
        return (
            <div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                            <i className="fa fa-search prefix"></i>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Nhập tên bệnh án..." aria-label="Username" aria-describedby="basic-addon" onChange={this.searchHandler} />
                </div>
                <ul className="scroll">
                    {
                        patientMeres.map((el) => {
                            return <PatientMere id={el.id}
                                name={el.name}
                                date={el.date}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}