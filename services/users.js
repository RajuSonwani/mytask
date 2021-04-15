const Users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = class UserService {
    async findAll(id) {
        const users = await Users.query().whereNot("id",id);
        // console.log(users, "txn users")
        return users;
    }

    async createUsers(details) {
        const pass = await bcrypt.hash(details.password, 5)
        details['password'] = pass
        console.log(details)
        return await Users.query().insertGraph(details);
    }

    async checkMobile(mobile) {
        const userDetails = await Users.query().findOne({
            mobile: mobile
        })
        return userDetails;
    }

    async PassChecking(userInfo, Pass) {
        return await bcrypt.compare(Pass, userInfo.password)
    }

    async findById(userId) {
        const id = await Users.query().findById(userId);
        return id;
    }

}