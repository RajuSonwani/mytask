const Following = require('../models/following');

module.exports = class FollowingService {
    async createFollowing(details) {
        return await Following.query().insertGraph(details);
    }

    async getAll(id) {
        return await Following.query().where("user01",id).count().as("count");
    }

    async findAll() {
        return await Following.query();
    }

}