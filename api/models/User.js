const db = require('../database/connect');

class User {

    constructor({ user_id, username, password, is_admin }) {
        this.id = user_id;
        this.username = username;
        this.password = password;
        this.isAdmin = is_admin;
    }

    static async getOneById(id) {
        const response = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async getOneByUsername(username) {
        const response = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (response.rows.length != 1) {
            throw new Error("Unable to locate user.");
        }
        return new User(response.rows[0]);
    }

    static async create(data) {

        if (!data.username) { throw new Error("username is missing") }

        if (!data.password) {
        throw new Error("password is missing")
        }

        if (!data.username || !data.password) {
        throw new Error("username or password missing")
        }
        const { username, password, is_student } = data;
        let response = await db.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;",
            [username, password]);
        const newUser = new User(response.rows[0])
        return newUser;
    }
}

module.exports = User;