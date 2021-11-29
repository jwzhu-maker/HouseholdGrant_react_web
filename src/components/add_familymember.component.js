import React, {Component} from "react";
import FamilyMemberDataService from "../services/familymember.service";
import HouseholdDataService from "../services/household.service";


export default class AddFamilyMember extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeMaritalStatus = this.onChangeMaritalStatus.bind(this);
        this.onChangeSpouseId = this.onChangeSpouseId.bind(this);
        this.onChangeOccupationType = this.onChangeOccupationType.bind(this);
        this.onChangeAnnualIncome = this.onChangeAnnualIncome.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeHouseholdId = this.onChangeHouseholdId.bind(this);

        this.saveFamilyMember = this.saveFamilyMember.bind(this);
        this.newFamilyMember = this.newFamilyMember.bind(this);

        this.GetHouseholds();

        this.state = {
            id: null,
            name: "",
            gender: "U",
            maritalStatus: "N",
            spouseId: "",
            occupationType: "UNEMPLOYED",
            annualIncome: 0,
            dob: "2000-01-01",

            householdId: -1,
            households: [],
        };
    }

    GetHouseholds = () => {
        HouseholdDataService.getAll()
            .then(response => {
                this.setState({
                    households: response.data,
                    householdId: response.data[0].id
                });
                console.log(response.data);
            });
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeMaritalStatus(e) {
        this.setState({
            maritalStatus: e.target.value
        });
    }

    onChangeSpouseId(e) {
        this.setState({
            spouseId: e.target.value
        })
    }

    onChangeOccupationType(e) {
        this.setState({
            occupationType: e.target.value
        })
    }

    onChangeAnnualIncome(e) {
        this.setState({
            annualIncome: e.target.value
        })
    }

    onChangeDob(e) {
        this.setState({
            dob: e.target.value
        });
    }

    onChangeHouseholdId(e) {
        this.setState({
            householdId: e.target.value
        });
    }

    saveFamilyMember() {
        const data = {
            name: this.state.name,
            gender: this.state.gender,
            maritalStatus: this.state.maritalStatus,
            spouseId: this.state.spouseId,
            occupationType: this.state.occupationType,
            annualIncome: this.state.annualIncome,
            dob: this.state.dob,
            householdId: this.state.householdId,
        };

        FamilyMemberDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    gender: response.data.gender,
                    maritalStatus: response.data.maritalStatus,
                    spouseId: response.data.spouseId,
                    occupationType: response.data.occupationType,
                    annualIncome: response.data.annualIncome,
                    dob: response.data.dob,


                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newFamilyMember() {
        this.setState({
            id: null,
            name: "",
            gender: "U",
            maritalStatus: "N",
            spouseId: "",
            occupationType: "UNEMPLOYED",
            annualIncome: 0,
            dob: "2000-01-01",

            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newFamilyMember}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="name">Family Member Name</label>
                            <input name="name"
                                   className="form-control"
                                   id="name"
                                   required
                                   value={this.state.name}
                                   onChange={this.onChangeName}
                            >

                            </input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="householdSize">FamilyMember Gender</label>
                            <input
                                type="text"
                                className="form-control"
                                id="gender"
                                required
                                value={this.state.gender}
                                onChange={this.onChangeGender}
                                name="householdSize"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <input
                                type="text"
                                className="form-control"
                                id="maritalStatus"
                                required
                                value={this.state.maritalStatus}
                                onChange={this.onChangeMaritalStatus}
                                name="maritalStatus"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="spouseId">Spouse Id</label>
                            <input
                                type="text"
                                className="form-control"
                                id="spouseId"
                                required
                                value={this.state.spouseId}
                                onChange={this.onChangeSpouseId}
                                name="spouseId"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="occupationType">Occupation Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="occupationType"
                                required
                                value={this.state.occupationType}
                                onChange={this.onChangeOccupationType}
                                name="occupationType"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="annualIncome">Annual Income</label>
                            <input
                                type="text"
                                className="form-control"
                                id="annualIncome"
                                required
                                value={this.state.annualIncome}
                                onChange={this.onChangeAnnualIncome}
                                name="annualIncome"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <input
                                type="Date"
                                className="form-control"
                                id="dob"
                                required
                                value={this.state.dob}
                                onChange={this.onChangeDob}
                                name="dob"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="householdId">Belongs to Household</label>
                            <select name="householdId"
                                    className="form-control"
                                    value={this.state.householdId}
                                    onChange={this.onChangeHouseholdId}
                                    required
                            >
                                {this.state.households &&
                                this.state.households.map((household, index) => (
                                    <option key={index} value={household.id}>
                                        {`${household.id} | ${household.housingType}`}
                                    </option>
                                ))}

                            </select>
                        </div>


                        <button onClick={this.saveFamilyMember} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
