import React from 'react';
import { MDBInput } from "mdbreact";
import Patients from './patien';

let PATIENS = [
    {
        id: 1,
        name: 'Nguyễn Thị B',
        phoneNumber: '0938073320',
        image: 'http://accounts-cdn.9gag.com/media/avatar/14368888_100_1.jpg'
    },
    {
        id: 2,
        name: 'Trần Văn C',
        phoneNumber: '0945565655',
        image: 'http://forums.animeboston.com/download/file.php?avatar=11355_1455595397.png'

    },
    {
        id: 3,
        name: 'Lê Thị D',
        phoneNumber: '0975149873',
        image: 'http://avatars-cdn.9gag.com/avatar/erickson8903_14899765_100.jpg'
    },
    {
        id: 4,
        name: 'Lại Văn S',
        phoneNumber: '0638546385',
        image: 'https://38.media.tumblr.com/4249a67e76729e9126ef3f70e741c323/tumblr_inline_mixcyvIPd81qz4rgp.jpg'
    },
    {
        id: 5,
        name: 'Nguyễn Văn D',
        phoneNumber: '0506549879',
        image: 'https://38.media.tumblr.com/4249a67e76729e9126ef3f70e741c323/tumblr_inline_mixcyvIPd81qz4rgp.jpg'
    }
]

export default class PatientsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedPatients: PATIENS
        }
    }

    searchHandler = (event) => {
        let searcjQery = event.target.value,
            displayedPatients = PATIENS.filter((el) => {
                let searchValue = el.id.toString();
                return searchValue.indexOf(searcjQery) !== -1;
            })
        this.setState({
            displayedPatients: displayedPatients
        });
    }
    render() {
        let patients = this.state.displayedPatients;
        return (
            <div>
                {/* <MDBInput label="Nhập id bệnh nhân ..." icon="search" onChange={this.searchHandler} /> */}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                            <i className="fa fa-search prefix"></i>
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Nhập id bệnh nhân..." aria-label="Username" aria-describedby="basic-addon" onChange={this.searchHandler} />
                </div>
                <ul className="scroll">
                    {
                        patients.map((el) => {
                            return <Patients id={el.id}
                                name={el.name}
                                image={el.image}
                                phoneNumber={el.phoneNumber}
                            />
                        })
                    }
                </ul>
            </div>
        )
    }
}
