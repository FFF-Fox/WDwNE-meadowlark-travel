/** This file should not be known to 3rd parties. In a production
 * environment it should be added to .gitignore file.
 */

module.exports = {
    cookieSecret: 'Your cookie secret goes here',
    mongo: {
        development: {
            connectionString: 'dev_connection_string'
        },
        production: {
            connectionString: 'prod_connection_string'
        },
    },
};
