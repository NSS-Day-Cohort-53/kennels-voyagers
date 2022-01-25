import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        return await fetchIt(`${Settings.remoteURL}/treatments/${id}`)
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/treatments/${id}`, "DELETE")
    },
    async addTreatment(treatment) {
        return await fetchIt(`${Settings.remoteURL}/treatments`, "POST", JSON.stringify(treatment))
    },
    async getAll() {
        return await fetchIt(`${Settings.remoteURL}/treatments?_expand=animal`)
    }
}
