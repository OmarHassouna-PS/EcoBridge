
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

// Station

const getStationByEmail = 'SELECT * FROM station WHERE email = $1 AND is_delete = false';

const getAllStation = 'SELECT * FROM station WHERE is_delete = false AND active = true';

const getStationById = 'SELECT * FROM station WHERE station_id = $1 AND is_delete = false AND active = true';

const getStationByIdAny = 'SELECT * FROM station WHERE station_id = $1 AND is_delete = false';

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

const getRequestByIdAny = 'SELECT * FROM requests WHERE requests_id = $1 AND is_delete = false';

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

const getMovementCompany = `SELECT * FROM company_movements WHERE company_id = $1 AND is_delete = false AND active = true`;

const getMovementCompanyById = `SELECT * FROM company_movements WHERE company_id = $1 AND id = $2 AND is_delete = false`;

const isMovementCompanyExist = `SELECT * FROM company_movements WHERE request_id = $1 AND station_id = $2 AND company_id = $3 AND is_delete = false`;

const deleteMovementCompany = `UPDATE company_movements SET is_delete = $1 WHERE id = $2 AND company_id = $3`;

const updateMovementCompany = `UPDATE company_movements SET condition = $1 WHERE id = $2 AND company_id = $3 AND station_id = $4 AND is_delete = false`;

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

const changeActiveCompanyMovements = `UPDATE company_movements SET active = $1 WHERE request_id = $2 AND company_id = $3 AND station_id = $4`;

const getInterestedRequestsFromStations = `SELECT * FROM station_movements WHERE company_id = $1 AND is_delete = false AND active = true AND is_reject = false`;

const rejectStationInterested = `UPDATE station_movements SET is_reject = $1 WHERE id = $2 AND company_id = $3 `;

// * Station

const addMovementStation = `INSERT INTO station_movements (condition, date, request_id, company_id, station_id) VALUES ($1,$2,$3,$4,$5) RETURNING *`;

const getMovementStation = `SELECT * FROM station_movements WHERE station_id = $1 AND is_delete = false AND active = true`;

const getMovementStationById = `SELECT * FROM station_movements WHERE station_id = $1 AND id = $2 AND is_delete = false`;

const isMovementStationExist = `SELECT * FROM station_movements WHERE request_id = $1 AND station_id = $2 AND company_id = $3 AND is_delete = false`;

const updateMovementStation = `UPDATE station_movements SET condition = $1 WHERE id = $2 AND station_id = $3 AND is_delete = false`;

const deleteMovementStation = `UPDATE station_movements SET is_delete = $1 WHERE id = $2 AND station_id = $3`;

const getMovementCompanyForStation = `SELECT * FROM company_movements WHERE station_id = $1 AND is_delete = false AND active = true AND is_reject = false`;

const changeActiveStationMovements = `UPDATE station_movements SET active = $1 WHERE request_id = $2 AND company_id = $3 AND station_id = $4`;

const rejectCompanyMovements = `UPDATE company_movements SET is_reject = $1 WHERE id = $2 AND station_id = $3 `;


// Profit Info
const getProfitInfo = `SELECT * FROM earnings_information`;
const setProfitInfo = `UPDATE earnings_information SET profit_percentage = $1`;

// Capture Request
const getAllCaptureRequestCompany = `SELECT * FROM capture_request WHERE company_id = $1 AND is_delete = false`;
const getAllCaptureRequestStation = `SELECT * FROM capture_request WHERE station_id = $1 AND is_delete = false`;

// -------------------------------Start Dashboard--------------------------------- //

// * Counts
const countCompanies = `SELECT COUNT(*) AS totalCompanies FROM company WHERE is_delete = false`;
const countStations = `SELECT COUNT(*) AS totalStations FROM station WHERE is_delete = false AND active = true`;
const countRequests = `SELECT COUNT(*) AS totalRequests FROM requests WHERE is_delete = false AND active = true`;
const countCaptureRequest = `SELECT COUNT(*) AS totalCaptureRequest FROM capture_request WHERE is_delete = false`;
const countCompaniesMovements = `SELECT COUNT(*) AS totalCompaniesMovements FROM company_movements WHERE is_delete = false`;
const countStationsMovements = `SELECT COUNT(*) AS totalStationsMovements FROM station_movements WHERE is_delete = false`;

const countAmountWaste = `SELECT SUM(quantity) AS totalQuantity, COUNT(*) AS totalRequests FROM requests`;

const companyInfoQuery = `
SELECT COUNT(*) AS total_companies,
        SUM(CASE WHEN is_delete = false THEN 1 ELSE 0 END) AS active_companies,
        SUM(CASE WHEN is_delete = true THEN 1 ELSE 0 END) AS deleted_companies,
        ARRAY_TO_STRING(ARRAY_AGG(DISTINCT business_type), ', ') AS top_business_types,
        AVG(waste_info_range) AS avg_waste_info_range
FROM company;`;

const stationInfoQuery = `
SELECT COUNT(*) AS total_stations,
       SUM(CASE WHEN is_delete = false THEN 1 ELSE 0 END) AS active_stations,
       SUM(CASE WHEN is_delete = true THEN 1 ELSE 0 END) AS deleted_stations,
       ARRAY_TO_STRING(ARRAY_AGG(DISTINCT business_type), ', ') AS top_business_types ,
       AVG(waste_info_range) AS avg_waste_info_range
FROM station;`;

const requestsInfoQuery = `
SELECT COUNT(*) AS total_requests,
       SUM(CASE WHEN is_delete = false THEN 1 ELSE 0 END) AS active_requests,
       SUM(CASE WHEN available = true THEN 1 ELSE 0 END) AS available_requests,
       SUM(CASE WHEN available = false THEN 1 ELSE 0 END) AS completed_requests,
       SUM(CASE WHEN active = true THEN 1 ELSE 0 END) AS accepted_requests,
       SUM(CASE WHEN active = false THEN 1 ELSE 0 END) AS pending_requests,
       SUM(CASE WHEN is_delete = true THEN 1 ELSE 0 END) AS deleted_requests,
       ARRAY_TO_STRING(ARRAY_AGG(DISTINCT material_type), ', ') AS top_material_types,
       AVG(quantity) AS avg_request_quantity
FROM requests;`;

const companyMovementsInfoQuery = `
SELECT COUNT(*) AS total_company_movements,
       SUM(CASE WHEN active = true THEN 1 ELSE 0 END) AS active_company_movements,
       SUM(CASE WHEN is_reject = true THEN 1 ELSE 0 END) AS rejected_company_movements
FROM company_movements;`;

const stationMovementsInfoQuery = `
SELECT COUNT(*) AS total_station_movements,
       SUM(CASE WHEN active = true THEN 1 ELSE 0 END) AS active_station_movements,
       SUM(CASE WHEN is_reject = true THEN 1 ELSE 0 END) AS rejected_station_movements
FROM station_movements;`;

const captureRequestInfoQuery = `
WITH request_counts AS (
  SELECT
    COUNT(*) AS num_requests,
    SUM(material_quantity) AS total_quantity,
    SUM(total_price) AS total_price,
    SUM(material_price * profit_ratio * material_quantity) AS total_profit,
    MIN(profit_ratio) AS min_profit_ratio,
    MAX(profit_ratio) AS max_profit_ratio
  FROM capture_request
),
current_month_profit AS (
  SELECT
    COALESCE(SUM(material_price * profit_ratio * material_quantity), 0) AS current_month_profit
  FROM capture_request
  WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM NOW()) AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM NOW())
),
previous_month_profit AS (
  SELECT
    COALESCE(SUM(material_price * profit_ratio * material_quantity), 0) AS previous_month_profit
  FROM capture_request
  WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM NOW() - INTERVAL '1 month') AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM NOW() - INTERVAL '1 month')
),
material_counts AS (
  SELECT material_type AS top_material_type, COUNT(*) AS material_count
  FROM capture_request
  GROUP BY material_type
  ORDER BY material_count DESC
  LIMIT 3
),
city_counts AS (
  SELECT city AS top_cities, COUNT(*) AS city_count
  FROM capture_request
  GROUP BY city
  ORDER BY city_count DESC
  LIMIT 3
),
payment_counts AS (
  SELECT payment_method AS top_payment, COUNT(*) AS payment_count
  FROM capture_request
  GROUP BY payment_method
  ORDER BY payment_count DESC
  LIMIT 3
)
SELECT
rc.num_requests,
rc.total_quantity,
rc.total_price,
rc.total_profit,
rc.min_profit_ratio,
rc.max_profit_ratio,
mc.top_material_type,
mc.material_count,
cc.top_cities,
cc.city_count,
pc.top_payment,
pc.payment_count,
cmp.current_month_profit,
pmp.previous_month_profit,
  CASE
    WHEN cmp.current_month_profit > pmp.previous_month_profit THEN 'increase'
    WHEN cmp.current_month_profit < pmp.previous_month_profit THEN 'decrease'
    ELSE 'no change'
  END AS profit_change_status
FROM request_counts rc
CROSS JOIN material_counts mc
CROSS JOIN city_counts cc
CROSS JOIN payment_counts pc
CROSS JOIN current_month_profit cmp
CROSS JOIN previous_month_profit pmp;
`;

const allMonthProfit = `
WITH monthly_profits AS (
  SELECT
    TO_CHAR(date, 'YYYY-MM') AS month_year,
    COALESCE(SUM(material_price * profit_ratio * material_quantity), 0) AS profit
  FROM capture_request
  GROUP BY TO_CHAR(date, 'YYYY-MM')
)
SELECT
  month_year,
  SUM(profit) AS total_profit
FROM monthly_profits
GROUP BY month_year
ORDER BY month_year
`
const earningsInfoQuery = `SELECT profit_percentage FROM earnings_information;`


// * Companies
const getDashboardCompany = `SELECT * FROM company WHERE is_delete = false ORDER BY username, company_id LIMIT $1 OFFSET $2`;
const dashboardDeleteCompany = `UPDATE company SET is_delete = $1 WHERE company_id = $2`;

// * Stations
const getDashboardStation = `SELECT * FROM station WHERE is_delete = false AND active = $1 ORDER BY username, station_id LIMIT $2 OFFSET $3`;
const dashboardDeleteStation = `UPDATE station SET is_delete = $1 WHERE station_id = $2`;
const dashboardAcceptStation = `UPDATE station SET active = $1 WHERE station_id = $2`;

// * Requests
const getDashboardRequests = `SELECT * FROM requests WHERE is_delete = false AND active = $1 ORDER BY title, requests_id LIMIT $2 OFFSET $3`;
const dashboardDeleteRequest = `UPDATE requests SET is_delete = $1 WHERE requests_id = $2`;
const dashboardAcceptRequest = `UPDATE requests SET active = $1 WHERE requests_id = $2`;

// * Capture Requests
const getDashboardCaptureRequest = `SELECT * FROM capture_request WHERE is_delete = false ORDER BY date ASC LIMIT $1 OFFSET $2`;
const dashboardDeleteCaptureRequest = `UPDATE capture_request SET is_delete = $1 WHERE id = $2`;
const dashboardChangeCondition = `UPDATE capture_request SET condition = $1 WHERE id = $2`;
const getCaptureRequestById = `SELECT * FROM capture_request WHERE is_delete = false And id = $1`;

// * Message
const addMessage = `INSERT INTO messages (date, username, email, message) VALUES ($1,$2,$3,$4) RETURNING *`;
const getDashboardMessages = `SELECT * FROM messages WHERE is_delete = false ORDER BY username LIMIT $1 OFFSET $2`;
const dashboardDeleteMessage = `UPDATE messages SET is_delete = $1 WHERE message_id = $2`;

// -------------------------------End Dashboard--------------------------------- //

module.exports = {

  // Company
  getCompanyByEmail,
  getCompanyById,
  addCompany,

  // Station
  getStationByEmail,
  getStationById,
  addStation,
  getStationByIdAny,

  // Admin
  getAdminByEmail,
  getAdminById,
  addAdmin,

  // Checker
  checkStation,
  checkCompany,
  checkAdmin,

  // Update
  updateCompany,
  updateStation,
  updateAdmin,

  // Get
  getAllCompany,
  getAllStation,
  getAllAdmin,

  // Delete
  deleteCompany,
  deleteStation,
  deleteAdmin,

  // Upload Image
  uploadImageCompany,
  uploadImageStation,

  // Get Avatar
  getCompanyAvatar,
  getStationAvatar,

  // Change Password
  changeStationPassword,
  changeCompanyPassword,

  // Request
  getRequestByIdToCompany,
  getAllRequests,
  getAllRequestsByCompanyId,
  deleteRequest,
  addRequest,
  updateRequest,
  getRequestById,
  uploadMaterialsAndPrices,
  getRequestByIdAny,

  // Movements Company
  addMovementCompany,
  getMovementCompany,
  getMovementCompanyById,
  updateMovementCompany,
  deleteMovementCompany,
  isMovementCompanyExist,

  // Movements Station
  addMovementStation,
  getMovementStation,
  getMovementStationById,
  updateMovementStation,
  deleteMovementStation,
  isMovementStationExist,
  getMovementCompanyForStation,

  // ProfitInfo
  getProfitInfo,
  setProfitInfo,

  // Capture Request
  addCaptureRequest,
  isCaptureRequestExist,
  getAllCaptureRequestCompany,
  getAllCaptureRequestStation,
  getInterestedRequestsFromStations,
  rejectStationInterested,

  // Company And Station Movements change
  changeActiveCompanyMovements,
  changeActiveStationMovements,
  rejectCompanyMovements,

  // Dashboard

  // * Companies
  getDashboardCompany,
  dashboardDeleteCompany,

  // * Stations
  getDashboardStation,
  dashboardDeleteStation,
  dashboardAcceptStation,

  // * Requests
  getDashboardRequests,
  dashboardDeleteRequest,
  dashboardAcceptRequest,

  // * Capture Request
  getDashboardCaptureRequest,
  dashboardDeleteCaptureRequest,
  dashboardChangeCondition,
  getCaptureRequestById,

  // * Message
  addMessage,
  getDashboardMessages,
  dashboardDeleteMessage,

  // Counts Dashboard
  countCompanies,
  countStations,
  countRequests,
  countCaptureRequest,
  countCompaniesMovements,
  countStationsMovements,
  companyInfoQuery,
  stationInfoQuery,
  requestsInfoQuery,
  companyMovementsInfoQuery,
  stationMovementsInfoQuery,
  captureRequestInfoQuery,
  earningsInfoQuery,
  allMonthProfit,

  // Public
  countAmountWaste,
}

// Company Table:

// Number of registered companies
// Number of active companies
// Number of deleted companies
// Top business types
// Average waste info range

// Station Table:
// Number of registered stations
// Number of active stations
// Number of deleted stations
// Top business types
// Average waste info range

// Admin Table:
// Number of registered admins
// Number of deleted admins

// Requests Table:
// Number of total requests
// Number of active requests
// Number of completed requests
// Number of rejected requests
// Top material types
// Average quantity of requests

// Company Movements Table:
// Number of total movements
// Number of active movements
// Number of rejected movements

// Station Movements Table:
// Number of total movements
// Number of active movements
// Number of rejected movements

// Capture Request Table:
// Number of total capture requests
// Number of active capture requests
// Number of completed capture requests
// Number of rejected capture requests

// Earnings Information Table:
// Current profit percentage
