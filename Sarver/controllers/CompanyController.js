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

const getCaptureRequest = async (req, res, next) => {

  const movementId = req.params.movementId;
  const company = req.user;

  const movement = await db.query(queries.getMovementCompanyById, [company.company_id, movementId]);

  if (!movement.rows[0].condition) {
    return res.status(406).json({ message: 'The request is incomplete!' });
  }

  const request = await db.query(queries.getRequestByIdToCompany, [movement.rows[0].request_id, company.company_id]);
  const station = await db.query(queries.getStationById, [movement.rows[0].station_id]);

  if (!movement || !request || !station) return res.status(406).json({ message: "Something went wrong, please try again later" });

  const parsedData = station.rows[0].list_materials_and_prices.map((jsonString) => JSON.parse(jsonString));

  const materialPrice = parsedData.find((item) => item.materialType === request.rows[0].material_type);

  if (!materialPrice) {
    return res.status(406).json({ message: 'It seems that the station is no longer receiving the material of this request. Please apply to other stations!' });
  }

  const getProfitInfo = await db.query(queries.getProfitInfo);

  const priceAfterProfitRateDeduction = Number(materialPrice.price) - (getProfitInfo.rows[0].profit_percentage * Number(materialPrice.price));

  res.status(200).json({
    material_type: request.rows[0].material_type,
    material_quantity: request.rows[0].quantity,
    material_price: priceAfterProfitRateDeduction,
    total_price: priceAfterProfitRateDeduction * Number(request.rows[0].quantity),
  })
};

const addCaptureRequest = async (req, res, next) => {

  const { city, delivery_address, delivery_date, delivery_time, Account_number, payment_method, movement_id } = req.body;

  const company = req.user;

  const movement = await db.query(queries.getMovementCompanyById, [company.company_id, movement_id]);

  if (!movement.rows[0].condition)  return res.status(406).json({ message: 'The request is incomplete!' });

  const isCaptureRequestExist = await db.query(queries.isCaptureRequestExist, [movement.rows[0].request_id, movement.rows[0].station_id, company.company_id]);

  if (isCaptureRequestExist.rows.length > 0) return res.status(406).json({ message: 'A capture request has already been submitted on this request!' });

  console.log(isCaptureRequestExist.rows, movement.request_id, movement.station_id, company.company_id)

  const request = await db.query(queries.getRequestByIdToCompany, [movement.rows[0].request_id, company.company_id]);
  const station = await db.query(queries.getStationById, [movement.rows[0].station_id]);

  if (!movement || !request || !station) return res.status(406).json({ message: "Something went wrong, please try again later" });

  const parsedData = station.rows[0].list_materials_and_prices.map((jsonString) => JSON.parse(jsonString));

  const materialPrice = parsedData.find((item) => item.materialType === request.rows[0].material_type);

  if (!materialPrice) {
    return res.status(406).json({ message: 'It seems that the station is no longer receiving the material of this request. Please apply to other stations!' });
  }

  const getProfitInfo = await db.query(queries.getProfitInfo);

  const priceAfterProfitRateDeduction = Number(materialPrice.price) - (getProfitInfo.rows[0].profit_percentage * Number(materialPrice.price));

  const total_price = priceAfterProfitRateDeduction * Number(request.rows[0].quantity);

  const date = new Date(); 

  db.query(queries.addCaptureRequest,
    [
      "Underway",
      date,
      city,
      delivery_address,
      delivery_date,
      delivery_time,
      Account_number,
      payment_method,
      request.rows[0].material_type,
      request.rows[0].quantity,
      priceAfterProfitRateDeduction,
      total_price,
      getProfitInfo.rows[0].profit_percentage,
      movement.rows[0].request_id,
      company.company_id,
      movement.rows[0].station_id
    ],
    (error, results) => {
      if (error) {
        console.log(error)
        return res.status(400).json(error);
      }
      return res.status(200).json({message : 'The capture request has been sent successfully'});

    }
  );
}

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
  getCaptureRequest,
  addCaptureRequest,

}