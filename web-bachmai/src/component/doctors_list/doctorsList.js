import React from 'react';
import Doctor from './doctor';
import avatar from '../../assets/images/avatar.png';
import axios from "axios";
import { SERVER } from '../../config';

export default class DoctorsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedDoctors: []
        }
    }

    componentDidMount() {
        let uid = localStorage.getItem("uid");

        axios.get(SERVER + "patient/permitedPrac/" + uid).then(res => {
            console.log(res);
            if (res.status == 200) {
                this.setState({
                    displayedDoctors: res.data
                })
            }
        })
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

        console.log(doctors);
        
        return (
            <div>
                {/* <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                            <i className="fa fa-search prefix"></i>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Nhập id bác sĩ..." aria-label="Username" aria-describedby="basic-addon" onChange={this.searchHandler} />
                </div> */}
                
                <ul className="scroll">
                    {
                        doctors.map((el) => {
                            return <Doctor
                                key={el._id}
                                id={el._id}
                                name={el._name}
                                image={avatar}
                                workplace={el._workplace}
                                email={el._email}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
