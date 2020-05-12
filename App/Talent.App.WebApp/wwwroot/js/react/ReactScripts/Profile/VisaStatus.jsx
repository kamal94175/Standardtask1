import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Dropdown, Container, Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker";
import moment from 'moment';

export default class VisaStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // selectedValue: 'default',
            visaStatus: "",
            visaExpiryDate: ""
            //date: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleExpiryChange = this.handleExpiryChange.bind(this);
        this.Saveme = this.Saveme.bind(this);

    }

    componentDidMount() {

    }

    handleChange(event) {
        const data = event.target.value;
        this.setState({
            visaStatus: data
        })
        if (data == "Citizen" || data == "Permanent Resident" || data == "") {
            //document.getElementById('expiry').style.display = 'none';
            const update = {
                visaStatus: data,
                visaExpiryDate: ""
            }

            this.props.saveProfileData(update);
        }
        else {
           const update = {
                visaStatus: data,
           }
            this.props.updateProfileData(update);
        }
    }

    handleExpiryChange(date) {
        console.log("date", date);
        this.setState({
             visaExpiryDate : date
        })

        var updateData = {
             visaExpiryDate : date
        }
            console.log(updateData)
        this.props.updateProfileData(updateData);
        
    }        

    Saveme() {
        const update = {
            visaStatus: this.props.visaStatus,
            visaExpiryDate: this.props.visaExpiryDate
        }
        this.props.saveProfileData(update);
    }

    render() {
       return (
             <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              
                   <div>
                       {
                          this.props.visaStatus == "Citizen" || this.props.visaStatus == "Permanent Resident" || this.props.visaStatus == ""
                       ?
          
                       <select className="ui right labeled dropdown w-auto"
                               value={this.props.visaStatus}
                               onChange={this.handleChange}
                               name="visaStatus">
                           <option value="">Select one</option>
                           <option value="Citizen"> Citizen</option>
                           <option value="Permanent Resident"> Permanent Resident</option>
                           <option value="Work Visa"> Work Visa</option>
                           <option value="Student Visa"> Student Visa</option>
                       </select>
                        :
                       <div id="expiry" style={{ display: 'inline' }}>
                           <select className="ui right labeled dropdown w-auto"
                                   value={this.props.visaStatus}
                                   onChange={this.handleChange}
                                   name="visaStatus">
                                <option value="">Select one</option>
                                <option value="Citizen"> Citizen</option>
                                <option value="Permanent Resident"> Permanent Resident</option>
                                <option value="Work Visa"> Work Visa</option>
                                <option value="Student Visa"> Student Visa</option>
                           </select>

                            <DatePicker
                                
                                 selected={moment(this.props.visaExpiryDate).isValid() ? moment(this.props.visaExpiryDate) : null}
                                 onChange={(date)=> this.handleExpiryChange(date, "visaExpiryDate")}
                                 //value ={this.state.visaExpiryDate || this.props.visaExpiryDate}
                                 
                           />

                          <button type="button" className="ui teal button "
                                  onClick={this.Saveme}>Save
                          </button>

                       </div>}
                   </div>
              
             </Container>

        )
    }
}