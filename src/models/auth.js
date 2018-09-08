/**
 * Model for authentication
 */
// Importing bcrypt and jwt
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Importing handler and connection
const connect = require("../config/database");
const handler = require("../services/handler");

// Export functions as a module
module.exports = {
  register,
  login
};

/**
 * Register and login a user on database
 *
 * @param {Object} body
 *
 * @return {Promise<Object>}
 */
function register({ email, password }) {
  return new Promise((resolve, reject) => {
    connect()
      .then(async db => {
        // Check required fields (is good to check if is a valid email)
        if (!!email && !!password) {
          try {
            // Try to insert user on database
            await db.execute("INSERT INTO user(email, password) VALUES(?, ?)", [
              email,
              bcrypt.hashSync(password, bcrypt.genSaltSync())
            ]);
          } catch (error) {
            // Close connection
            db.end();

            // Error while inserting
            return reject({
              message: "Failed when add user",
              error,
              status: 500
            });
          }

          // Getting user registered
          const [rows] = await db.execute(
            "SELECT id, email FROM user WHERE email = ?",
            [email]
          );

          // Close connection
          db.end();

          // Get user from row 0
          const user = rows[0];

          // Return success with jwt
          return resolve({
            message: "User created successfully",
            user,
            token: jwt.sign({ ...user }, "token", { expiresIn: "1 day" }),
            status: 200
          });
        } else {
          return reject({
            message: "Missing parameters",
            status: 400
          });
        }
      })
      .catch(err => reject(handler.handleErrorConnect(err)));
  });
}

/**
 * Login a user on database
 *
 * @param {Object} body
 *
 * @return {Promise<Object>}
 */
function login({ email, password }) {
  return new Promise(async (resolve, reject) => {
    connect()
      .then(async db => {
        if (!!email && !!password) {
          // Prepare user variable
          let user;
          try {
            // Search user by email
            const [rows] = await db.execute(
              "SELECT * FROM user WHERE email = ?",
              [email]
            );

            // Get first row or null
            user = rows && rows.length > 0 ? rows[0] : null;

            // Close connection
            db.end();
          } catch (error) {
            // Close connection
            db.end();

            // Error while searching user
            return reject({
              message: "Failed on search user",
              error,
              status: 500
            });
          }

          // Check if user exists
          if (!user) {
            return reject({
              message: "User not found",
              status: 400
            });
          }

          // Compare passwords
          if (!bcrypt.compareSync(password, user.password)) {
            return reject({
              message: "Password invalid",
              status: 401
            });
          }

          // Remove password to return user
          user.password = undefined;

          // Return user and jwt
          return resolve({
            message: "Welcome " + user.email,
            user,
            token: jwt.sign({ ...user }, "token", { expiresIn: "1 day" }),
            status: 200
          });
        } else {
          return reject({
            message: "Missing parameters",
            status: 400
          });
        }
      })
      .catch(err => reject(handler.handleErrorConnect(err)));
  });
}
