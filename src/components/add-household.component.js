import React, {Component} from "react";
import HouseholdDataService from "../services/household.service";

export default class AddHousehold extends Component {
    constructor(props) {
        super(props);
        this.onChangeHousingType = this.onChangeHousingType.bind(this);
        this.onChangeHouseholdSize = this.onChangeHouseholdSize.bind(this);
        this.saveHousehold = this.saveHousehold.bind(this);
        this.newHousehold = this.newHousehold.bind(this);

        this.state = {
            id: null,
            housingType: "LANDED",
            householdSize: 0,
            totalIncome: 0
        };
    }

    onChangeHousingType(e) {
        this.setState({
            housingType: e.target.value
        });
    }

    onChangeHouseholdSize(e) {
        this.setState({
            householdSize: e.target.value
        });
    }

    saveHousehold() {
        const data = {
            housingType: this.state.housingType,
            householdSize: this.state.householdSize,
            totalIncome: this.state.totalIncome
        };

        HouseholdDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    housingType: response.data.housingType,
                    householdSize: response.data.householdSize,
                    totalIncome: response.data.totalIncome,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newHousehold() {
        this.setState({
            id: null,
            housingType: "LANDED",
            householdSize: 0,
            totalIncome: 0,

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newHousehold}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="housingType">Housing Type</label>
                            <select name="housingType"
                                    className="form-control"
                                    id="housingType"
                                    required
                                    value={this.state.housingType}
                                    onChange={this.onChangeHousingType}
                            >
                                <option value={"LANDED"}>Landed</option>
                                <option value={"CONDOMINIUM"}>Condominium</option>
                                <option value={"HDB"}>HDB</option>

                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="householdSize">Household Size</label>
                            <input
                                type="text"
                                className="form-control"
                                id="householdSize"
                                required
                                value={this.state.householdSize}
                                onChange={this.onChangeHouseholdSize}
                                name="householdSize"
                            />
                        </div>

                        <button onClick={this.saveHousehold} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
