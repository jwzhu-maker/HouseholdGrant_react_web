import React, { Component } from "react";
import HouseholdDataService from "../services/household.service";
import { Link } from "react-router-dom";

export default class SearchHouseholds extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchGrantType = this.onChangeSearchGrantType.bind(this);
        this.retrieveHouseholds = this.retrieveHouseholds.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveHousehold = this.setActiveHousehold.bind(this);
        this.searchGrantType = this.searchGrantType.bind(this);

        this.state = {
            households: [],
            currentHousehold: null,
            currentIndex: -1,
            searchGrantType: "Student_Encouragement_Bonus",
        };
    }

    componentDidMount() {
        // this.retrieveHouseholds();
    }

    onChangeSearchGrantType(e) {
        this.setState({
            searchGrantType: e.target.value
        });
    }

    retrieveHouseholds() {
        HouseholdDataService.getAll()
            .then(response => {
                this.setState({
                    households: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveHouseholds();
        this.setState({
            currentHousehold: null,
            currentIndex: -1
        });
    }

    setActiveHousehold(household, index) {
        this.setState({
            currentHousehold: household,
            currentIndex: index
        });
    }


    searchGrantType() {
        this.setState({
            currentHousehold: null,
            currentIndex: -1
        });

        HouseholdDataService.findByGrantType(this.state.searchGrantType)
            .then(response => {
                this.setState({
                    households: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchGrantType, households, currentHousehold, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <select
                        className="form-control"
                        onChange={this.onChangeSearchGrantType}>
                            <option value={"Student_Encouragement_Bonus"}>Student Encouragement Bonus</option>
                            <option value={"Family_Togetherness_Scheme"}>Family Togetherness Scheme</option>
                            <option value={"Elder_Bonus"}>Elder Bonus</option>
                            <option value={"Baby_Sunshine_Grant"}>Baby Sunshine Grant</option>
                            <option value={"YOLO_GST_Grant"}>YOLO GST Grant</option>
                        </select>
                        <input hidden
                            type="text"
                            className="form-control"
                            placeholder="Search by housingType"
                            value={searchGrantType}
                            onChange={this.onChangeSearchGrantType}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchGrantType}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Households List</h4>

                    <ul className="list-group">
                        {households &&
                        households.map((household, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveHousehold(household, index)}
                                key={index}
                            >
                                {index}:
                                | Household ID: {household.id}
                                | HousingType: {household.housingType}
                                | Size: {household.householdSize}
                                | Total Income: {household.totalIncome}
                            </li>
                        ))}
                    </ul>


                </div>
                <div className="col-md-6">
                    {currentHousehold ? (
                        <div>
                            <h4>Household</h4>
                            <div>
                                <label>
                                    <strong>HousingType:</strong>
                                </label>{" "}
                                {currentHousehold.housingType}
                            </div>
                            <div>
                                <label>
                                    <strong>Household Size:</strong>
                                </label>{" "}
                                {currentHousehold.householdSize}
                            </div>
                            <div>
                                <label>
                                    <strong>Total Income:</strong>
                                </label>{" "}
                                {currentHousehold.totalIncome}
                            </div>

                            <Link
                                to={"/households/" + currentHousehold.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Household...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
