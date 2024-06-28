const Sequelize = require("sequelize");
const Model = require("sequelize").Model;

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING
        }, {
            sequelize
        })
    }
}

export default User;