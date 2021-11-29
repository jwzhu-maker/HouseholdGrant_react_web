import http from "../http-common";

class HouseholdDataService {
    getAll() {
        return http.get("/households");
    }

    get(id) {
        return http.get(`/households/${id}`);
    }

    create(data) {
        return http.post("/households", data);
    }

    update(id, household) {
        return http.put(`/households/${id}`, household);
    }

    delete(id) {
        return http.delete(`/households/${id}`);
    }

    deleteAll() {
        return http.delete(`/households`);
    }

    findByHousingType(housingType) {
        return http.get(`/households?housingType=${housingType}`)
    }
    findByTotalIncome(totalIncome) {
        return http.get(`/households?totalIncome<${totalIncome}`);
    }

    findByGrantType(grantType) {
        return http.get(`/households/grant?grantType=${grantType}`);
    }
}

export default new HouseholdDataService();
