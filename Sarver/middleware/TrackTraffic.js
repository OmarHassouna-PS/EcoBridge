const { db } = require("../models/connection");
const { format, startOfWeek, addWeeks } = require('date-fns');

async function trackUsers(tableName) {
  try {
    const now = new Date();
    const currentWeekStart = startOfWeek(now, { weekStartsOn: 1 }); // Start of the current week (ISO week)

    // Calculate the start and end of the current ISO week
    const currentWeekStartFormatted = format(currentWeekStart, 'yyyy-MM-dd');
    const currentWeekEndFormatted = format(addWeeks(currentWeekStart, 1), 'yyyy-MM-dd');

    // Check if the row for the current week exists
    const checkRowQuery = `SELECT * FROM ${tableName}
      WHERE date >= $1 AND date < $2`;
    const checkRowValues = [currentWeekStartFormatted, currentWeekEndFormatted];
    const rowExistsResult = await db.query(checkRowQuery, checkRowValues);

    if (rowExistsResult.rows.length > 0) {
      // Update the traffic count for the current week
      const updateTrafficQuery = `UPDATE ${tableName}
        SET traffic = traffic + 1
        WHERE date >= $1 AND date < $2`;
      await db.query(updateTrafficQuery, checkRowValues);
    } else {
      // Insert a new row for the current week
      const insertTrafficQuery = `INSERT INTO ${tableName} (date, traffic)
        VALUES ($1, 1)`;
      await db.query(insertTrafficQuery, [currentWeekStartFormatted]);
    }

  } catch (error) {
    console.error("Error tracking user login:", error);
  }
}

module.exports = {
  trackUsers,
}
