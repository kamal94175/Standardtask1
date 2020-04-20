﻿/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Container, Table, Button, Icons } from "semantic-ui-react";
export default class Language extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            indexToEdit: -1,
            showAddSection: false,

            languages: [{
                id: '',
                name: '',
                level: ''
            }],
            Id: "",
            Name: "",
            Level: ""
        }

        this.AddLanguage = this.AddLanguage.bind(this)
        this.cancel = this.cancel.bind(this)
        this.editLanguage = this.editLanguage.bind(this)
        this.delete = this.delete.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)
        this.saveAdd = this.saveAdd.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
        this.renderAddForm = this.renderAddForm.bind(this)

    }
    componentDidMount() {

    }
    AddLanguage(e) {
        e.preventDefault();
        this.setState({
            showAddSection: true,
            languages: {}

        })
    }

    editLanguage(index) {
        var oldlanguages = Object.assign([], this.props.languageData)
        var name = oldlanguages[index].name;
        var level = oldlanguages[index].level;

        this.setState({
            indexToEdit: index,
            Name: name,
            Level: level

        });
    }

    cancel() {
        this.setState({
            showAddSection: false,
            indexToEdit: -1
        });
    }

    handleChange(event) {

        const data = Object.assign({}, this.state.languages)
        data[event.target.name] = event.target.value
        this.setState({
            languages: data
        });
    }

    handleEditChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    saveAdd(e) {
        e.preventDefault();
        console.log(this.state.languages)

        const languageData = this.props.languageData;

        this.props.languageData.push(this.state.languages);

        var updateData = {
            languages: languageData
        }
        this.props.updateProfileData(updateData)
        this.cancel()

    }
    saveEdit(index) {

        const data = Object.assign([], this.props.languageData)
        data[index].id= this.state.Id
        data[index].name = this.state.Name
        data[index].level = this.state.Level

        var updateData = {
            language: data
        }
        console.log(updateData)
        this.props.updateProfileData(updateData)
        this.cancel()
    }



    delete(languageToDelete) {

        const languageData = this.props.languageData.filter(language => language.id != languageToDelete.id);

        var updateData = {
            languages: languageData
        }
        this.props.updateProfileData(updateData)
        console.log(updateData)
        this.cancel()
    };


    renderAddForm() {
        if (this.state.showAddSection) {
            return (
                <React.Fragment>
                    <Table striped>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell><input type="text" name="name" value={this.state.languages.name || ""}
                                    onChange={this.handleChange} placeholder="Language" />
                                </Table.Cell>

                                <Table.Cell>
                                    <select name="level" value={this.state.languages.level || ""}
                                        onChange={this.handleChange} className="ui fluid dropdown">
                                        <option value="languageLevel">languageLevel</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">Conversational</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native">Native</option>
                                    </select>
                                </Table.Cell>

                                <Table.Cell>
                                    <button type="button" className="ui teal button" onClick={this.saveAdd}>Save</button>
                                    <button type="button" className="ui red button" onClick={this.cancel}>Cancel</button>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
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
                onChange={this.handleEditChange} placeholder="Language" />)

        const editlevel = (
            <select name="Level" value={this.state.Level}
                onChange={this.handleEditChange} className="ui fluid dropdown">
                <option value="LanguageLevel">languageLevel</option>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native">Native</option>

            </select>)

        const editbutton = index => (<button type="button" className="ui teal button "
            onClick={() => this.saveEdit(index)}>Save
        </button>)

        const cancelbutton = (<button type="button" className="ui red button "
            onClick={this.cancel}>Cancel
        </button>)
        const deletebutton = language => (<i className="close icon" onClick={() => this.delete(language)}></i>);

        return (

            <Container className="table-margin">
                {this.renderAddForm()}
                <React.Fragment>
                    <Table striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Language</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell>
                                    <button type="button" className="ui secondary button" onClick={this.AddLanguage}>
                                        <i className="plus icon"></i>AddNew
                                    </button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className="helo">
                            {this.props.languageData.map((lang, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{this.props.languageData.indexOf(lang) == this.state.indexToEdit ? editname : lang.name}</Table.Cell>
                                    <Table.Cell>{this.props.languageData.indexOf(lang) == this.state.indexToEdit ? editlevel : lang.level}</Table.Cell>
                                    <Table.Cell>
                                        {this.props.languageData.indexOf(lang) == this.state.indexToEdit ? editbutton(this.props.languageData.indexOf(lang)) :
                                            <i className="pencil alternate icon" onClick={() => this.editLanguage(this.props.languageData.indexOf(lang))}>
                                            </i>}
                                        {this.props.languageData.indexOf(lang) == this.state.indexToEdit ? cancelbutton :
                                           deletebutton(lang) }
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

