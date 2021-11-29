import React, { Component } from "react";
import HouseholdDataService from "../services/household.service";
import { Link } from "react-router-dom";

export default class HouseholdsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchHousingType = this.onChangeSearchHousingType.bind(this);
        this.retrieveHouseholds = this.retrieveHouseholds.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveHousehold = this.setActiveHousehold.bind(this);
        this.removeHousehold = this.removeHousehold.bind(this);
        this.removeAllHouseholds = this.removeAllHouseholds.bind(this);
        this.searchHousingType = this.searchHousingType.bind(this);

        this.state = {
            households: [],
            currentHousehold: null,
            currentIndex: -1,
            searchHousingType: ""
        };
    }

    componentDidMount() {
        this.retrieveHouseholds();
    }

    onChangeSearchHousingType(e) {
        const searchHousingType = e.target.value;

        this.setState({
            searchHousingType: searchHousingType
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

    removeHousehold () {
        const id = this.state.currentHousehold.id;
        HouseholdDataService.delete(id)
            .then(response => {
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    removeAllHouseholds() {
        HouseholdDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchHousingType() {
        this.setState({
            currentHousehold: null,
            currentIndex: -1
        });

        HouseholdDataService.findByHousingType(this.state.searchHousingType)
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
        const { searchHousingType, households, currentHousehold, currentIndex } = this.state;

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
                            value={searchHousingType}
                            onChange={this.onChangeSearchHousingType}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchHousingType}
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

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeHousehold}
                    >
                        Remove
                    </button>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllHouseholds}
                    >
                        Remove All
                    </button>
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
