import React, {Component} from "react";
import HouseholdDataService from "../services/household.service";

export default class Household extends Component {
    constructor(props) {
        super(props);
        this.onChangeHousingType = this.onChangeHousingType.bind(this);
        this.onChangeHouseholdSize = this.onChangeHouseholdSize.bind(this);
        this.getHousehold = this.getHousehold.bind(this);
        this.updateHousingType = this.updateHousingType.bind(this);
        this.updateHousehold = this.updateHousehold.bind(this);
        this.deleteHousehold = this.deleteHousehold.bind(this);

        this.state = {
            currentHousehold: {
                id: null,
                housingType: "LANDED",
                householdSize: "0",
                totalIncome: "0"
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getHousehold(this.props.match.params.id);
    }

    onChangeHousingType(e) {
        const housingType = e.target.value;

        this.setState(function (prevState) {
            return {
                currentHousehold: {
                    ...prevState.currentHousehold,
                    housingType: housingType
                }
            };
        });
    }

    onChangeHouseholdSize(e) {
        const householdSize = e.target.value;

        this.setState(prevState => ({
            currentHousehold: {
                ...prevState.currentHousehold,
                householdSize: householdSize
            }
        }));
    }

    getHousehold(id) {
        HouseholdDataService.get(id)
            .then(response => {
                this.setState({
                    currentHousehold: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateHousingType(status) {
        var data = {
            id: this.state.currentHousehold.id,
            housingType: status,
            householdSize: this.state.currentHousehold.householdSize,
            totalIncome: this.state.currentHousehold.totalIncome
        };

        HouseholdDataService.update(this.state.currentHousehold.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentHousehold: {
                        ...prevState.currentHousehold,
                        housingType: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateHousehold() {
        HouseholdDataService.update(
            this.state.currentHousehold.id,
            this.state.currentHousehold
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The household was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteHousehold() {
        HouseholdDataService.delete(this.state.currentHousehold.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/households')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentHousehold} = this.state;

        return (
            <div>
                {currentHousehold ? (
                    <div className="edit-form">
                        <h4>Household</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="housingType">Housing Type</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="housingType"
                                    value={currentHousehold.housingType}
                                    onChange={this.onChangeHousingType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="householdSize">Household Size</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="householdSize"
                                    value={currentHousehold.householdSize}
                                    onChange={this.onChangeHouseholdSize}
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <strong>Total Income:</strong>
                                </label>
                                {currentHousehold.totalIncome}
                            </div>
                        </form>

                        <p>HousingType: {currentHousehold.housingType} change to:</p>
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updateHousingType("LANDED")}
                        >
                            Landed
                        </button>

                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updateHousingType("CONDOMINIUM")}
                        >
                            Condominium
                        </button>

                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => this.updateHousingType("HDB")}
                        >
                            HDB
                        </button>

                        <p>
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteHousehold}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateHousehold}
                        >
                            Update
                        </button>
                        </p>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Household...</p>
                    </div>
                )}
            </div>
        );
    }
}
