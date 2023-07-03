
// Companies
const getCompanyByEmail = 'SELECT * FROM company WHERE email = $1 AND is_delete = false';

const getAllCompany = 'SELECT * FROM company WHERE is_delete = false';

const getCompanyById = 'SELECT * FROM company WHERE company_id = $1 AND is_delete = false';

const updateCompany = `UPDATE company SET username= $1, phone= $2, email= $3, password= $4,

business_type= $5, address= $6, organization_name= $7, waste_info_type= $8, waste_info_range =$9 WHERE company_id = $10`;

const deleteCompany = 'UPDATE company SET is_delete = $1 WHERE company_id = $2';

const uploadImageCompany = `UPDATE company SET avatar_image = $1 WHERE company_id = $2`

const getCompanyAvatar = 'SELECT avatar_image FROM company WHERE company_id = $1';

const changeCompanyPassword = `UPDATE company SET password = $1, password_changed_at = $2 WHERE company_id = $3`;

const addCompany = `INSERT INTO company (
    role,
    username,
    phone,
    email,
    password,
    business_type,
    address,
    organization_name,
    waste_info_type,
    waste_info_range,
    created_at

  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;


// Stations

const getStationByEmail = 'SELECT * FROM station WHERE email = $1 AND is_delete = false AND active = true';

const getAllStation = 'SELECT * FROM station WHERE is_delete = false AND active = true';

const getStationById = 'SELECT * FROM station WHERE station_id = $1 AND is_delete = false AND active = true';

const updateStation = `UPDATE station SET username= $1, phone= $2, email= $3, password= $4,
 business_type= $5, address= $6, organization_name= $7, waste_info_type= $8, waste_info_range =$9, list_materials_and_prices=$10 WHERE station_id = $11`;

const deleteStation = 'UPDATE station SET is_delete = $1 WHERE station_id = $2';

const uploadImageStation = `UPDATE station SET avatar_image = $1 WHERE station_id = $2`;

const uploadMaterialsAndPrices = `UPDATE station SET list_materials_and_prices = $1 WHERE station_id = $2`;

const getStationAvatar = 'SELECT avatar_image FROM station WHERE station_id = $1';

const addStation = `INSERT INTO station (
    role,
    username,
    phone,
    email,
    password,
    business_type,
    address,
    organization_name,
    waste_info_type,
    waste_info_range,
    created_at,
    list_materials_and_prices

  ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`;

const changeStationPassword = `UPDATE station SET password = $1, password_changed_at = $2 WHERE station_id = $3`;

// Admin

const getAdminByEmail = 'SELECT * FROM admin WHERE email = $1 AND is_delete = false';

const getAllAdmin = 'SELECT * FROM admin WHERE is_delete = false';

const getAdminById = 'SELECT * FROM admin WHERE admin_id = $1 AND is_delete = false';

const updateAdmin = "UPDATE admin SET username= $1, phone= $2, email= $3, password= $4, address= $5 WHERE admin_id = $6";

const deleteAdmin = 'UPDATE admin SET is_delete = $1 WHERE admin_id = $2';

const addAdmin = `INSERT INTO admin (
    role,
    username,
    phone,
    email,
    password,
    address,
    created_at
  ) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

// Authentication

const checkStation = `SELECT * FROM station WHERE is_delete = false AND email = $1`;

const checkCompany = `SELECT * FROM company WHERE is_delete = false AND email = $1`;

const checkAdmin = `SELECT * FROM admin WHERE is_delete = false AND email = $1`;


// Request
const getAllRequests = 'SELECT * FROM requests WHERE is_delete = false AND active = true';

const getRequestById = 'SELECT * FROM requests WHERE requests_id = $1 AND is_delete = false AND active = true';

const getRequestByIdToCompany = 'SELECT * FROM requests WHERE requests_id = $1 AND company_id =$2 AND is_delete = false AND active = true';

const getAllRequestsByCompanyId = 'SELECT * FROM requests WHERE company_id = $1 AND is_delete = false AND active = true';

const deleteRequest = 'UPDATE requests SET is_delete = $1 WHERE requests_id = $2 AND company_id = $3';

const addRequest = `INSERT INTO requests ( title, material_type, condition, location, organization_name, additional_info, quantity, images, company_id, created_at)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10) RETURNING *`;

const updateRequest = `UPDATE requests SET title= $1, material_type= $2, condition= $3, location= $4, organization_name = $5,
additional_info= $6, quantity= $7 WHERE requests_id = $8 AND company_id = $9`;

// Movements

  // * Company

const addMovementCompany = `INSERT INTO company_movements (condition, date, request_id, station_id, company_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`;

const getMovementCompany = `SELECT * FROM company_movements WHERE company_id = $1 AND is_delete = false`;

const getMovementCompanyById = `SELECT * FROM company_movements WHERE company_id = $1 AND id = $2 AND is_delete = false`;

const isMovementCompanyExist = `SELECT * FROM company_movements WHERE request_id = $1 AND station_id = $2 AND company_id = $3 AND is_delete = false`;

const deleteMovementCompany = `UPDATE company_movements SET is_delete = $1 WHERE id = $2 AND company_id = $3`;

const addCaptureRequest = `INSERT INTO capture_request (
  condition,
  date,
  city,
  delivery_address,
  delivery_date,
  delivery_time,
  Account_number,
  payment_method,
  material_type,
  material_quantity,
  material_price,
  total_price,
  profit_ratio,
  request_id,
  company_id,
  station_id

) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`;

const isCaptureRequestExist = `SELECT * FROM capture_request WHERE request_id = $1 AND station_id = $2 AND company_id = $3 AND is_delete = false`;

  // * Station

const addMovementStation = `INSERT INTO station_movements (condition, date, request_id, company_id, station_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`;

const getMovementStation = `SELECT * FROM station_movements WHERE station_id = $1 AND is_delete = false`;

const getMovementStationById = `SELECT * FROM station_movements WHERE station_id = $1 AND id = $2 AND is_delete = false`;

const isMovementStationExist = `SELECT * FROM station_movements WHERE request_id = $1 AND station_id = $2 AND company_id = $3 AND is_delete = false`;

const updateMovementStation = `UPDATE station_movements SET condition = $1 WHERE id = $2 AND station_id = $3 AND is_delete = false`;

const deleteMovementStation = `UPDATE station_movements SET is_delete = $1 WHERE id = $2 AND station_id = $3`;

const getMovementCompanyForStation = `SELECT * FROM company_movements WHERE station_id = $1 AND is_delete = false`;

const updateMovementCompany = `UPDATE company_movements SET condition = $1 WHERE id = $2 AND company_id = $3 AND station_id = $4 AND is_delete = false`;


// Profit Info
const getProfitInfo = `SELECT * FROM earnings_information`;

module.exports = {
  getCompanyByEmail,
  getCompanyById,
  addCompany,

  getStationByEmail,
  getStationById,
  addStation,

  getAdminByEmail,
  getAdminById,
  addAdmin,

  checkStation,
  checkCompany,
  checkAdmin,

  updateCompany,
  updateStation,
  updateAdmin,

  getAllCompany,
  getAllStation,
  getAllAdmin,

  deleteCompany,
  deleteStation,
  deleteAdmin,

  uploadImageCompany,
  uploadImageStation,

  getCompanyAvatar,
  getStationAvatar,

  changeStationPassword,
  changeCompanyPassword,

  getRequestByIdToCompany,
  getAllRequests,
  getAllRequestsByCompanyId,
  deleteRequest,
  addRequest,
  updateRequest,
  getRequestById,
  uploadMaterialsAndPrices,

  addMovementCompany,
  getMovementCompany,
  getMovementCompanyById,
  updateMovementCompany,
  deleteMovementCompany,
  isMovementCompanyExist,
  
  addMovementStation,
  getMovementStation,
  getMovementStationById,
  updateMovementStation,
  deleteMovementStation,
  isMovementStationExist,

  getMovementCompanyForStation,
  
  getProfitInfo,
  addCaptureRequest,
  isCaptureRequestExist,
}