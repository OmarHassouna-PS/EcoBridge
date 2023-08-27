const { db } = require("../models/connection");
const queries = require("./queries");

const addMessage = async (req, res) => {
    const {
        username,
        email,
        message,
    } = req.body;

    
    
    const date = new Date();
    
    db.query(queries.addMessage,
        [
            date,
            username,
            email,
            message
        ],
        (error, results) => {
            if (error) {
                console.log(        username,
                    email,
                    message,);
                return res.status(401).json(error);
            }
            res.status(200).json(results.rows);
        }
    );
};

const searchForMassages = async (req, res) => {
    const { searchType: columnName, searchValue: columnValue, page, limit } = req.query;
    
    const validSearchType = [
        'message_id',
        'email',
        'username'
    ];

    const offset = (page - 1) * limit;

    if (!validSearchType.includes(columnName)) {
        return res.status(400).send('Not this time');
    }

    const query = {
        text: `SELECT * FROM messages WHERE ${columnName} = $1 And is_delete = false ORDER BY username LIMIT $2 OFFSET $3`,
        values: [columnValue, limit, offset],
    };

    const queryTotal = {
        text: `SELECT COUNT(*) AS total FROM messages WHERE ${columnName} = $1 And is_delete = false`,
        values: [columnValue],
    };

    try {
        const { rows } = await db.query(query);

        const totalItems = await db.query(queryTotal);
        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        res.status(200).json({
            items: rows,
            totalItems: totalItemCount,
            totalPages: totalPages,
        });

    } catch (error) {
        console.error('Error executing query:', error);
        res.status(400).json([]);
    }
}

const getAllMassages = async (req, res) => {
    const { page, limit } = req.query;

    try {
        // Calculate the offset based on the page and limit
        const offset = (page - 1) * limit;

        // Fetch data from the database using the custom query
        const requests = await db.query(queries.getDashboardMessages, [limit, offset]);

        // Get the total number of items in the database
        const totalItems = await db.query('SELECT COUNT(*) AS total FROM messages WHERE is_delete = false');

        const totalItemCount = totalItems.rows[0].total;
        const totalPages = Math.ceil(totalItemCount / limit); // Calculate total pages

        // Send the response with data and totalItems
        res.json({
            items: requests.rows,
            totalItems: totalItems.totalItemCount,
            totalPages: totalPages
        });

    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteMessage = async (req, res) => {

    const id = req.params.id;


    db.query(queries.dashboardDeleteMessage,
        [true, id],
        (error, results) => {
            if (error) {
                return res.status(400).json(error);
            }
            res.status(200).json({ massage: `Request with ID: ${id} deleted` });
        }
    );
};

module.exports = {
  addMessage,
  searchForMassages,
  getAllMassages,
  deleteMessage,
}
