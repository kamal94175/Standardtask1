import React from 'react';
import Cookies from 'js-cookie';
import { Table, Container, Form } from "semantic-ui-react";


export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAddSection: false,

            languages: {
                id:  "",
                name: "",
                level: "",
                

            },
            indexToEdit: -1,
            Level: '',
            Name: '',

        };
        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleLevelChange = this.handleLevelChange.bind(this)
        //this.renderAdd = this.renderAdd.bind(this)
    }


    editComponent(index) {
        var oldlanguages = Object.assign([], this.props.languageData)
        var name = oldlanguages[index].name;
        var level = oldlanguages[index].level;
        this.setState({
            Name: name,
            Level: level,
            indexToEdit: index
        });
    }

    cancelEdit() {
        this.setState({
            indexToEdit: -1
        })
    };

    updateLanguage(index) {
        console.log("updateComponent", index)
        var oldlanguages = Object.assign([], this.props.languageData)
        oldlanguages[index].name = this.state.Name;
        oldlanguages[index].level = this.state.Level;
        if (this.state.Name == "" || this.state.Level == "") {

            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
       
            this.cancelEdit();

        }
        else {
            console.log("newlanguage", oldlanguages)
            var updateLanguage = {
                languages: oldlanguages
            }
            this.props.updateProfileData(updateLanguage)
            this.setState({
                indexToEdit: -1
            })
        }

    };

    openAdd() {
        const languageData = Object.assign({}, this.props.languageData)
        console.log("languageData", languageData);
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
        const data = Object.assign({}, this.state.languages)
        data[event.target.name] = event.target.value
        this.setState({
            languages: data
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

    saveContact() {
        console.log(this.state.languages)
        var oldlanguages = Object.assign([], this.props.languageData)
        var newlanguage = Object.assign({}, this.state.languages)
        if (newlanguage.name == "" || newlanguage.level == "") {

            TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
            this.closeAdd();
        }

        else {
            oldlanguages.push(newlanguage );
            var updateLanguage = {
                languages: oldlanguages
            }
            this.props.updateProfileData(updateLanguage)
            this.closeAdd();
        }
    }

    DeleteLanguage(languageToDelete) {
        const updatedlanguage = this.props.languageData.filter(language => language.id != languageToDelete.id);
        var updateLanguage = {
            languages: updatedlanguage
        }
        this.props.updateProfileData(updateLanguage)

    }

    

    render() {
        let { indexToEdit } = this.state;
        let deleteBtn = language => (
            <i className="delete icon" onClick={() => this.DeleteLanguage(language)}>

            </i>
        );

        let editBtn = index => (
            <i className="pencil icon" onClick={() => this.editComponent(index)}>

            </i>
        );
        let updateBtn = index => (
            <button type="button" className="ui blue basic button" onClick={() => this.updateLanguage(index)}>
                Update
            </button>
        );
        let cancelBtn = (
            <button type="button" className="ui red basic button" onClick={() => this.cancelEdit()}>
                Cancel
            </button>
        );
        let editlevel = (

            <div>
                <select className="ui fluid" name="Level"
                    onChange={(event) => this.handleLevelChange(event)}
                    value={this.state.Level} >
                    <option value="">Select Level</option>
                    <option value="Basic">Basic</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Native">Native</option>
                </select></div>
        );
        let editname =  (<div>

            <input className="ui fluid" type="text" name="Name" value={this.state.Name}
                onChange={(event) => this.handleNameChange(event)}
                placeholder="Add Language" /></div>
        );
        return (
            <Container style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                <React.Fragment>
                    <div>

                        {
                            this.state.showAddSection ?
                                <div style={{ paddingBottom: '20px' }}>
                                    <div className="inline field">
                                        <input className="six wide field" type="text" name="name" value={this.state.languages.name}
                                            onChange={this.handleChange} placeholder="Add Language" id="languages" />

                                        <select className="six wide field" name="level"
                                            onChange={this.handleChange} value={this.state.languages.level} >
                                            <option value="" >Select Level</option>
                                            <option value="Basic" >Basic</option>
                                            <option value="Conversational">Conversational</option>
                                            <option value="Fluent">Fluent</option>
                                            <option value="Native">Native</option>
                                        </select>

                                        <button type="button" className="ui button right floated" onClick={this.closeAdd}>Cancel</button>
                                        <button type="button" className="ui teal button right floated" onClick={this.saveContact}>Add</button>
                                    </div></div>
                                : null
                        }

                        <div className="ui sixteen wide column">

                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Language</Table.HeaderCell>
                                        <Table.HeaderCell>Level</Table.HeaderCell>
                                        <Table.HeaderCell><button type="button" className="ui teal button right floated" onClick={this.openAdd}><i className="plus icon"></i>AddNew</button></Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {this.props.languageData.map((lang, index) => {
                                        return (
                                            <Table.Row key={index}>
                                                <Table.Cell className="six wide field">
                                                    {this.props.languageData.indexOf(lang) === indexToEdit ? editname : lang.name}
                                                </Table.Cell>
                                                <Table.Cell className="six wide field">
                                                    {this.props.languageData.indexOf(lang) === indexToEdit
                                                        ? editlevel
                                                        : lang.level}
                                                </Table.Cell>
                                                <Table.Cell className="right aligned">
                                                    {this.props.languageData.indexOf(lang) === indexToEdit
                                                        ? updateBtn(this.props.languageData.indexOf(lang))
                                                        : editBtn(this.props.languageData.indexOf(lang))}
                                                    {this.props.languageData.indexOf(lang) === indexToEdit
                                                        ? cancelBtn
                                                        : deleteBtn(lang)}
                                                </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table>


                        </div>
                    </div>



                </React.Fragment>

            </Container>
        );
    }
}