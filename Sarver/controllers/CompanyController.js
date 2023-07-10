const { db } = require("../models/connection");
const queries = require("./queries");
const bcrypt = require("bcrypt");

const addCompany = async (req, res, next) => {
  const {
    username,
    phone,
    email,
    password,
    businessType,
    address,
    organizationName,
    wasteInfoType,
    wasteInfoRange
  } = req.body;

  const companies = await db.query(queries.getCompanyByEmail, [email]);

  if (companies.rows.length != 0) {
    res.status(409).send("User Already Exist.");

  } else {
    const hashedPwd = await bcrypt.hash(password, 10);
    const date = new Date()
    db.query(queries.addCompany,
      [
        "company",
        username,
        phone,
        email,
        hashedPwd,
        businessType,
        address,
        organizationName,
        wasteInfoType,
        wasteInfoRange,
        date
      ],
      (error, results) => {
        if (error) {
          return res.status(400).json(error);
        }

        req.user = results?.rows[0];
        next();
      }
    );
  }
};

const getCompanyById = async (req, res) => {
  const id = req.params.id;
  db.query(queries.getCompanyById, [id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      else {
        res.status(200).json(results.rows);
      }
    });
}

const getAllCompany = async (req, res) => {
  db.query(queries.getAllCompany,
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      else {
        res.status(200).json(results.rows);
      }
    });
}

const updateCompany = async (req, res) => {
  const id = req.user.company_id;
  const { username, phone, email, password, business_type, address, organization_name, waste_info_type, waste_info_range } = req.body;

  let userData;

  try {
    const results = await db.query(queries.getCompanyById, [id]);
    const userData = results.rows[0];

    if (!userData || userData.is_delete) {
      return res.status(404).send('User not found');
    }

    if (!(await bcrypt.compare(password, userData.password))) {

      return res.status(400).send("incorrect password");
    }

  } catch (error) {
    return res.status(400).json(error);
  }



  const hashPassword = await bcrypt.hash(password, 10);

  await db.query(queries.updateCompany,
    [username, phone, email, hashPassword, business_type, address, organization_name, waste_info_type, waste_info_range, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json({ massage: `user  with ID: ${id} Updated successfully`, user: results.rows[0] });
    }
  );
};

const changePassword = async (req, res, next) => {
  const id = req.user.company_id;

  const { oldPassword, newPassword, confirmPassword } = req.body;

  let userData;

  try {
    const results = await db.query(queries.getCompanyById, [id]);
    const userData = results.rows[0];

    if (!userData || userData.is_delete) {
      return res.status(404).send('User not found');
    }

    if (!(await bcrypt.compare(oldPassword, userData.password))) {

      return res.status(400).send("incorrect password");
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send("Password does not match");
    }
  } catch (error) {
    return res.status(400).json(error);
  }

  const date = new Date();

  const hashPassword = await bcrypt.hash(newPassword, 10);

  await db.query(queries.changeCompanyPassword,
    [hashPassword, date, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      next();
    }
  );
};

const deleteCompany = async (req, res) => {
  const id = req.user.company_id;
  const { passwordDeleteAccount } = req.body


  let userData;
  try {
    const results = await db.query(queries.getCompanyById, [id]);
    const userData = results.rows[0];

    if (!userData || userData.is_delete) {
      return res.status(404).send('User not found');
    }

    if (!(await bcrypt.compare(passwordDeleteAccount, userData.password))) {

      return res.status(400).send("incorrect password");
    }

  } catch (error) {
    return res.status(400).json(error);
  }

  db.query(queries.deleteCompany,
    [true, id],
    (error, results) => {
      if (error) {
        return res.status(400).json(error);
      }
      res.status(200).json({ massage: `User with ID: ${id} deleted`, user: results.rows[0] });
    }
  );
};

module.exports = {
  addCompany,
  getCompanyById,
  getAllCompany,
  updateCompany,
  deleteCompany,
  changePassword,
}