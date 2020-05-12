/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Container, Form } from "semantic-ui-react";


export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,

            experience: {
                id: "",
                company: "",
                position: "",
                responsibilities: "",
                start: moment(),
                end: moment()
            },

            indexToEdit: -1,
            Company: '',
            Position: '',
            Responsibilities: '',
            Start: moment(),
            End: moment()

        };
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCompChange = this.handleCompChange.bind(this)
        this.handlePosiChange = this.handlePosiChange.bind(this)
        this.handleRespChange = this.handleRespChange.bind(this)
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.renderAddForm = this.renderAddForm.bind(this)
        
    }


    editComponent(index) {
        //console.log(Company)
        var oldexperiences = Object.assign([], this.props.experienceData)

        var company = oldexperiences[index].company;
        var position = oldexperiences[index].position;
        var responsibilities = oldexperiences[index].responsibilities;
        var start = oldexperiences[index].start;
        var end = oldexperiences[index].end;
        this.setState({
            Company: company,
            Position: position,
            Responsibilities: responsibilities,
            Start: start,
            End: end,
            indexToEdit: index
        });
        console.log(oldexperiences)
    }

    cancelEdit() {
        this.setState({
            indexToEdit: -1
        })
    };

    updateExperience(index) {
        
        console.log("updateExperience", index)
        var oldExperiences = Object.assign([], this.props.experienceData)
        oldExperiences[index].company = this.state.Company;
        oldExperiences[index].position = this.state.Position;
        oldExperiences[index].responsibilities = this.state.Responsibilities;
        oldExperiences[index].start = this.state.Start;
        oldExperiences[index].end = this.state.End;
        if (this.state.Company == "" || this.state.Position == "" || this.state.Responsibilities == "" || this.state.Start == "" || this.state.End == "") {

            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)

            this.cancelEdit();

        }
        else {
            console.log("newexperience", oldExperiences)
            var updateExperience = {
                experience: oldExperiences
            }
            this.props.updateProfileData(updateExperience)
            this.setState({
                indexToEdit: -1
            })
        }

    };

    openAdd() {
        const experienceData = Object.assign({}, this.props.experienceData)
        console.log("experienceData", experienceData);
        this.setState({
            showAddSection: true,
        })
    }

    closeAdd() {
        this.setState({
            showAddSection: false,
        })
    }
      
    handleChange(event) {
          const data = Object.assign({}, this.state.experience)
          data[event.target.name] = event.target.value
          this.setState({
               experience: data
           })
    }
    
    handleCompChange(e) {
        //console.log(this.state.experience)
        this.setState({
            Company: e.target.value
        })
    }
    handlePosiChange(e) {
        this.setState({
            Position: e.target.value
        })
    }
    handleRespChange(e) {
        this.setState({
            Responsibilities: e.target.value
        })
    }
    handleStartChange(event) {
        this.setState({
            Start: event.target.value
        })
    }
    handleEndChange(event) {
        this.setState({
            End: event.target.value
        })
    }
    

    saveContact() {
        
        console.log(this.state.experience)
        var oldExperiences = Object.assign([], this.props.experienceData)
        var newExperience = Object.assign({}, this.state.experience)
        if (this.state.experience == "" ) {

            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
            this.closeAdd();
        }
        else {
            oldExperiences.push(newExperience);
            var updateExperience = {
                experience: oldExperiences,
                //oldExperiences: moment(newExperience.start || newExperience.end).format('ll'),
            }
            console.log(oldExperiences)
            this.props.updateProfileData(updateExperience)
            this.closeAdd();
        }
    }

    delete(experienceToDelete) {
        const updatedExperience = this.props.experienceData.filter(experience => experience.id != experienceToDelete.id);
        var updateExperience = {
            experience: updatedExperience
        }
        this.props.updateProfileData(updateExperience)

    }
    renderAddForm() {
       // const { experienceData } = this.props;
        if (this.state.showAddSection) {
            return (
                <React.Fragment>
                    <Table striped>
                        < Table.Body >
                            <Table.Row className ="inline field">
                                <Table.Cell><ChildSingleInput className="four wide field" inputType="text" name="company" value={this.state.experience.company}
                                    onChange={this.props.controlFunc} controlFunc={this.handleChange} placeholder="Company" />
                                </Table.Cell>
                                <Table.Cell><ChildSingleInput className="four wide field" inputType="text" name="position" value={this.state.experience.position}
                                    onChange={this.props.controlFunc} controlFunc={this.handleChange} placeholder="Position" />
                                </Table.Cell>
                                <Table.Cell><ChildSingleInput className="eight wide field" inputType="text" name="responsibilities" value={this.state.experience.responsibilities}
                                    onChange={this.props.controlFunc} controlFunc={this.handleChange} placeholder="Responsibilities" />
                                </Table.Cell>
                                <Table.Cell><ChildSingleInput className="four wide field" inputType="date" name="start" value={this.state.experience.start}
                                    onChange={this.props.controlFunc} controlFunc={this.handleChange} />
                                </Table.Cell>
                                <Table.Cell><ChildSingleInput className="four wide field" inputType="date" name= "end" value={this.state.experience.end}
                                    onChange={this.props.controlFunc} controlFunc={this.handleChange} />
                                </Table.Cell>
                                

                                <Table.Cell><button type="button" className="ui teal button " onClick={this.saveContact}>Save</button>
                                    <button type="button" className="ui red button " onClick={this.closeAdd}>Cancel</button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body >
                    </Table>
                </React.Fragment>
            )
        } else {
            return null
        }
    }

    render() {
        const editcompany = company =>(
            <ChildSingleInput className="four wide field" inputType="text" name="Company" value={this.state.Company}
                onChange={this.props.controlFunc} controlFunc={(e)=>this.handleCompChange(e)} placeholder="Company" />)

        const editposition = position => (
            <ChildSingleInput className="four wide field" inputType="text" name="Position" value={this.state.Position}
                onChange={this.props.controlFunc} controlFunc={(e)=>this.handlePosiChange(e)} placeholder="Position" />)

        const editresponsibilities = responsibilities =>(
            <ChildSingleInput className="four wide field" inputType="text" name="Responsibilities" value={this.state.Responsibilities}
                onChange={this.props.controlFunc} controlFunc={(e)=>this.handleRespChange(e)} placeholder="Responsibilities" />)

        const editstart = start =>  (
            <ChildSingleInput className="four wide field" inputType="date" name="Start" value={this.state.Start }
                onChange={this.props.controlFunc} controlFunc={(event)=>this.handleStartChange(event)} />)

        const editend = end => (
            <ChildSingleInput className="four wide field" inputType="date" name="End" value={this.state.End}
                onChange={this.props.controlFunc} controlFunc={(event)=>this.handleEndChange(event)} />)

        const editbutton = index => (<button type="button" className="ui blue basic button"
            onClick={() => this.updateExperience(index)}>Update
        </button>)

        const updateBtn = index => (<i className="pencil alternate icon" onClick={()=> this.editComponent(index)}>
        </i>)

        const cancelbutton = (<button type="button" className="ui red basic button"
            onClick={() => this.cancelEdit()}>Cancel
        </button>)
        const deleteButton = experience => (<i className="close icon" onClick={() => this.delete(experience)}></i>);

        return (

            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                {this.renderAddForm()}
                <React.Fragment>
                    <Table striped className="ui sixteen wide column">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui teal button right floated" onClick={this.openAdd}>
                                        <i className="plus icon"></i>AddNew
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className="helo">
                            {this.props.experienceData.map((lang, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{this.props.experienceData.indexOf(lang) == this.state.indexToEdit ? editcompany(lang.company) : lang.company}</Table.Cell>
                                    <Table.Cell>{this.props.experienceData.indexOf(lang) == this.state.indexToEdit ? editposition(lang.position) : lang.position}</Table.Cell>
                                    <Table.Cell>{this.props.experienceData.indexOf(lang) == this.state.indexToEdit ? editresponsibilities(lang.responsibilities) : lang.responsibilities}</Table.Cell>
                                    <Table.Cell>{this.props.experienceData.indexOf(lang) == this.state.indexToEdit ? editstart(lang.start) : moment(lang.start).format('ll')}</Table.Cell>
                                    <Table.Cell>{this.props.experienceData.indexOf(lang) == this.state.indexToEdit ? editend(lang.end): moment(lang.end).format('ll')}</Table.Cell>
                                    <Table.Cell>
                                        {this.props.experienceData.indexOf(lang) == this.state.indexToEdit ? editbutton(this.props.experienceData.indexOf(lang)) :
                                            updateBtn(this.props.experienceData.indexOf(lang))}
                                        {this.props.experienceData.indexOf(lang) == this.state.indexToEdit ? cancelbutton :
                                            deleteButton(lang)}
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </React.Fragment>
            </Container >

        )
    }


}
