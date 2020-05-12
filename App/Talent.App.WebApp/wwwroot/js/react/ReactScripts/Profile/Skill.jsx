/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Table, Button, Icons } from "semantic-ui-react";
export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            showAddSection: false,
            index: -1,
            skills: {
                //id: "",
                name: "",
                level: ""
            },
            //Id: "",
            Name: '',
            Level: ''
        }
        this.AddSkill = this.AddSkill.bind(this)
        this.cancel = this.cancel.bind(this)
        this.editSkill = this.editSkill.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAdd = this.saveAdd.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.delete = this.delete.bind(this)
        this.renderAddForm = this.renderAddForm.bind(this)
    }
    componentDidMount() {

    }
    AddSkill(e) {
        e.preventDefault(e)
        this.setState({
            showAddSection: true,
            skills: {}
        });

    }
    editSkill(index) {
        var oldskills = Object.assign([], this.props.skillData)
        var name = oldskills[index].name;
        var level = oldskills[index].level;

        this.setState({
            index: index,
            Name: name,
            Level: level

        });
    }

    cancel() {
        this.setState({
            showAddSection: false,
            //index: -1
        });
    }

    cancelEdit() {
        this.setState({
            index: -1
        })
    };



    handleChange(event) {
        const data = Object.assign({}, this.state.skills)
        data[event.target.name] = event.target.value
        this.setState({
            skills: data
        })
    }

    handleNameChange(event) {
        this.setState({
            Name: event.target.value
        });
    }

    handleLevelChange(event) {
        this.setState({
            Level: event.target.value
        });
    }

    saveAdd() {
        var skillData = Object.assign([], this.props.skillData)
        var newSkills = Object.assign({}, this.state.skills)
        if (newSkills.name == "" || newSkills.level == "") {

            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
            this.cancel()
        }
        else {
            skillData.push(newSkills);

            var updateData = {
                skills: skillData
            }
            this.props.updateProfileData(updateData)
            this.cancel()
        }

    }
    saveEdit(index) {

        const data = Object.assign([], this.props.skillData)
       // data[index].id = this.state.Id
        data[index].name = this.state.Name
        data[index].level = this.state.Level
        
        if (this.state.Name == "" || this.state.Level == "") {

            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)

            this.cancelEdit();
        }
        else {
            var updateData = {
                skills: data
            }
            console.log(updateData)
            this.props.updateProfileData(updateData)
            this.cancelEdit();
            
        }
    }



    delete(skillToDelete) {
       // e.preventDefault();
        const skillData = this.props.skillData.filter(skill => skill.id != skillToDelete.id);

        var updateData = {
            skills: skillData
        }
        this.props.updateProfileData(updateData)
        this.cancel()
    };

    renderAddForm() {
        if (this.state.showAddSection) {
            return (
                <React.Fragment>
                    <Table striped>
                        < Table.Body >
                            <Table.Row>
                                <Table.Cell><input type="text" name="name" value={this.state.skills.name} onChange={this.handleChange} placeholder="Skill" /></Table.Cell>
                                <Table.Cell>
                                    <select  value={this.state.skills.level}
                                        onChange={this.handleChange} className="ui fluid dropdown">
                                        <option value="">ExperienceLevel</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Experienced">Experienced</option>

                                    </select>
                                </Table.Cell>
                                <Table.Cell><button type="button" className="ui teal button right floated" onClick={()=>this.saveAdd()}>Add</button>
                                    <button type="button" className="ui button right floated" onClick={()=>this.cancel()}>Cancel</button></Table.Cell>
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
        const editname = (
            <input type="text" name="Name" value={this.state.Name}
                onChange={(event) => this.handleNameChange(event)} placeholder="Skill" />)

        const editlevel = (
            <select name="Level" value={this.state.Level}
                onChange={(event) => this.handleLevelChange(event)} className="ui fluid dropdown">
                <option value="">ExperienceLevel</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Experienced">Experienced</option>
            </select>)

        const editbutton = index => (<button type="button" className="ui blue basic button"
            onClick={() => this.saveEdit(index)}>Save
        </button>)

        const updateBtn = index => (<i className="pencil alternate icon" onClick={() => this.editSkill(index)}>
        </i>)

        const cancelbutton = (<button type="button" className="ui red basic button"
            onClick={() =>this.cancelEdit()}>Cancel
        </button>)
        const deleteButton = skill => (<i className="close icon" onClick={() => this.delete(skill)}></i>);

        return (

            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                {this.renderAddForm()}
                <React.Fragment>
                    <Table striped className="ui sixteen wide column">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Skill</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui teal button right floated" onClick={this.AddSkill}>
                                        <i className="plus icon"></i>AddNew
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className="helo">
                            {this.props.skillData.map((lang, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{this.props.skillData.indexOf(lang) == this.state.index ? editname : lang.name}</Table.Cell>
                                    <Table.Cell>{this.props.skillData.indexOf(lang) == this.state.index ? editlevel : lang.level}</Table.Cell>
                                    <Table.Cell>
                                        {this.props.skillData.indexOf(lang) == this.state.index ? editbutton(this.props.skillData.indexOf(lang)) :
                                            updateBtn(this.props.skillData.indexOf(lang))}
                                        {this.props.skillData.indexOf(lang) == this.state.index ? cancelbutton :
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





