const { db } = require("../models/connection");
const { getISOWeek } = require('date-fns');


async function trackUsers(tableName) {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentWeek = getISOWeek(now); // Use a function to get the ISO week number

    // Check if the row for the current week exists
    const checkRowQuery = `SELECT EXISTS (
      SELECT 1
      FROM ${tableName}
      WHERE date_part('year', date) = $1 AND date_part('isoyear', date) = $2 AND date_part('week', date) = $3
    )`;
    const checkRowValues = [currentYear, currentYear, currentWeek];
    const rowExistsResult = await db.query(checkRowQuery, checkRowValues);

    if (rowExistsResult.rows[0].exists) {
      // Update the traffic count for the current week
      const updateTrafficQuery = `UPDATE ${tableName}
        SET traffic = traffic + 1
        WHERE date_part('year', date) = $1 AND date_part('isoyear', date) = $2 AND date_part('week', date) = $3`;
      await db.query(updateTrafficQuery, checkRowValues);
    } else {
      // Insert a new row for the current week
      const insertTrafficQuery = `INSERT INTO ${tableName} (date, traffic)
        VALUES (CURRENT_DATE, 1)`;
      await db.query(insertTrafficQuery);
    }

  } catch (error) {
    console.error("Error tracking user login:", error);
  }
}


module.exports = {
  trackUsers,
}
