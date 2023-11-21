const dotenv = require("dotenv");
dotenv.config();

const oracledb = require("oracledb");
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

oracledb.initOracleClient();

async function runQuery(query) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: process.env.USER,
      password: process.env.PASSWORD,
      connectionString: process.env.CONNECTIONSTRING,
    });
    console.log("Successfully connected to Oracle Database"); // Create a table
    const data = await connection.execute(query, [], { autoCommit: true });
    console.log(data.rows);
    return data.rows;
  } catch (err) {
    console.log("errror");
    // console.error(err);
    return [];
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

module.exports = runQuery;
