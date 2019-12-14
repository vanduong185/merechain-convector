import React from 'react';
import Doctor from './doctor';

export default class DoctorsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
						displayedDoctors: this.props.doctors
				}
    }

    searchHandler = (event) => {
        let searcjQery = event.target.value,
            displayedDoctors = this.props.doctors.filter((el) => {
                let searchValue = el.id.toString();
                return searchValue.indexOf(searcjQery) !== -1;
            })
        this.setState({
            displayedDoctors: displayedDoctors
        });
    }
    render() {
        let doctors = this.state.displayedDoctors;
        return (
            <div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                            <i className="fa fa-search prefix"></i>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Nhập id bác sĩ..." aria-label="Username" aria-describedby="basic-addon" onChange={this.searchHandler} />
                </div>
                <ul className="scroll">
                    {
                        doctors.map((el) => {
														return <Doctor 
																key={el.id}
																id={el.id}
                                name={el.name}
                                image={el.image}
																phoneNumber={el.phoneNumber}
																permission={el.permission}
																email={el.email}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
