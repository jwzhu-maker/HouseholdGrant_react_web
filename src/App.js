import React, {Component} from "react";
import {Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Household from "./components/household.component";
import AddHousehold from "./components/add-household.component";
import HouseholdsList from "./components/households_list.component";
import FamilyMembersList from "./components/familymembers_list.component";
import AddFamilyMember from "./components/add_familymember.component";
import SearchHouseholds from "./components/searchHouseholds.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/households"} className="navbar-brand">
                        Grants
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/households"} className="nav-link">
                                Households
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/addHousehold"} className="nav-link">
                                Add household
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/familyMembers"} className="nav-link">
                                Family Members
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/addFamilyMember"} className="nav-link">
                                Add family member
                            </Link>
                        </li>
                        {/*<li className="nav-item">*/}
                        {/*    <Link to={"/grants"} className="nav-link">*/}
                        {/*        Grants*/}
                        {/*    </Link>*/}
                        {/*</li>*/}
                        <li className="nav-item">
                            <Link to={"/searchHouseholds"} className="nav-link">
                                Search households
                            </Link>
                        </li>

                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/households"]} component={HouseholdsList}/>
                        <Route exact path={"/addHousehold"} component={AddHousehold}/>
                        <Route path={"/households/:id"} component={Household}/>
                        <Route exact path={"/familyMembers"} component={FamilyMembersList}/>
                        <Route exact path={"/addFamilyMember"} component={AddFamilyMember}/>
                        <Route exact path={"/searchHouseholds"} component={SearchHouseholds} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
