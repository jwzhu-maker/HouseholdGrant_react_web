import React, { Component } from "react";
import FamilyMemberDataService from "../services/familymember.service";
import { Link } from "react-router-dom";

export default class FamilyMembersList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveFamilyMembers = this.retrieveFamilyMembers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveFamilyMember = this.setActiveFamilyMember.bind(this);
        this.removeFamilyMember = this.removeFamilyMember.bind(this);
        this.removeAllFamilyMembers = this.removeAllFamilyMembers.bind(this);
        this.searchName = this.searchName.bind(this);

        this.state = {
            familyMembers: [],
            currentFamilyMember: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveFamilyMembers();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;

        this.setState({
            searchName: searchName
        });
    }

    retrieveFamilyMembers() {
        FamilyMemberDataService.getAll()
            .then(response => {
                this.setState({
                    familyMembers: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveFamilyMembers();
        this.setState({
            currentFamilyMember: null,
            currentIndex: -1
        });
    }

    setActiveFamilyMember(familyMember, index) {
        this.setState({
            currentFamilyMember: familyMember,
            currentIndex: index
        });
    }

    removeFamilyMember () {
        const id = this.state.currentFamilyMember.id;
        FamilyMemberDataService.delete(id)
            .then(response => {
                this.refreshList();
            });
    }

    removeAllFamilyMembers() {
        FamilyMemberDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchName() {
        this.setState({
            currentFamilyMember: null,
            currentIndex: -1
        });

        FamilyMemberDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    familyMembers: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchName, familyMembers, currentFamilyMember, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <select hidden >
                            <option>Landed</option>
                            <option>Condominium</option>
                            <option>HDB</option>
                        </select>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by housingType"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>FamilyMembers List</h4>

                    <ul className="list-group">
                        {familyMembers &&
                        familyMembers.map((familyMember, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveFamilyMember(familyMember, index)}
                                key={index}
                            >
                                {index}:
                                | Name: {familyMember.name}
                                | DOB: {familyMember.dob}
                                | annual Income: {familyMember.annualIncome}
                                | HouseHoldId: {familyMember.householdId}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeFamilyMember}
                    >
                        Remove
                    </button>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllFamilyMembers}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentFamilyMember ? (
                        <div>
                            <h4>FamilyMember</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentFamilyMember.name}
                            </div>
                            <div>
                                <label>
                                    <strong>FamilyMember DOB:</strong>
                                </label>{" "}
                                {currentFamilyMember.dob}
                            </div>
                            <div>
                                <label>
                                    <strong>Annual Income:</strong>
                                </label>{" "}
                                {currentFamilyMember.annualIncome}
                            </div>

                            <div>
                                <label>
                                    <strong>Household ID:</strong>
                                </label>{" "}
                                {currentFamilyMember.householdId}
                            </div>


                            <Link
                                to={"/familyMembers/" + currentFamilyMember.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a FamilyMember...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
