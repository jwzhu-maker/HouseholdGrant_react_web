import http from "../http-common";

class FamilyMemberDataService {
    getAll() {
        return http.get("/familyMembers");
    }

    get(id) {
        return http.get(`/familyMembers/${id}`);
    }

    create(familyMember) {
        return http.post("/familyMembers", familyMember);
    }

    update(id, familyMember) {
        return http.put(`/familyMembers/${id}`, familyMember);
    }

    delete(id) {
        return http.delete(`/familyMembers/${id}`);
    }

    deleteAll() {
        return http.delete(`/familyMembers`);
    }

    findByName(name) {
        return http.get(`/familyMembers?name=${name}`)
    }
    findByDOB(DOB) {
        return http.get(`/familyMembers?dob=${DOB}`);
    }
}

export default new FamilyMemberDataService();
