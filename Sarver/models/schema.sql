CREATE DATABASE EcoBradge

CREATE TABLE company  (
  company_id SERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL,
  username VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  password_changed_at TIMESTAMP,
  business_type VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  organization_name VARCHAR(50) NOT NULL,
  waste_info_type TEXT[],
  waste_info_range SMALLINT,
  avatar_image BYTEA,
  created_at TIMESTAMP NOT NULL,
  is_delete BOOLEAN DEFAULT false,
);

CREATE TABLE station  (
  station_id SERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL,
  username VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  password_changed_at TIMESTAMP,
  business_type VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  organization_name VARCHAR(50) NOT NULL,
  waste_info_type TEXT[],
  waste_info_range SMALLINT,
  list_materials_and_prices TEXT[],
  condition BOOLEAN DEFAULT true,
  avatar_image BYTEA,
  active BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL,
  is_delete BOOLEAN DEFAULT false
);

CREATE TABLE admin  (
  admin_id SERIAL PRIMARY KEY,
  role VARCHAR(20) NOT NULL,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  password_changed_at TIMESTAMP,
  phone VARCHAR(20) NOT NULL,
  address VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  is_delete BOOLEAN DEFAULT false 
);

CREATE TABLE requests  (
  requests_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  material_type TEXT NOT NULL,
  condition VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  organization_name VARCHAR(255) NOT NULL,
  additional_info TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  images BYTEA[],
  company_id INTEGER REFERENCES company(company_id) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  is_delete BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT false,
  available BOOLEAN DEFAULT true,
);

CREATE TABLE company_movements  (
  id SERIAL PRIMARY KEY,
  condition BOOLEAN NOT NULL,
  date DATE NOT NULL,
  request_id INTEGER REFERENCES request(requests_id),
  station_id INTEGER REFERENCES station(station_id),
  company_id INTEGER REFERENCES company(company_id),
  is_delete BOOLEAN DEFAULT false
);

CREATE TABLE station_movements  (
  id SERIAL PRIMARY KEY,
  condition BOOLEAN NOT NULL,
  date DATE NOT NULL,
  request_id INTEGER REFERENCES request(requests_id),
  company_id INTEGER REFERENCES company(company_id),
  station_id INTEGER REFERENCES station(station_id),
  is_delete BOOLEAN DEFAULT false
);


CREATE TABLE capture_request  (
  id SERIAL PRIMARY KEY,
  condition TEXT NOT NULL,
  date DATE NOT NULL ,
  city VARCHAR(50) NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_date DATE NOT NULL,
  delivery_time TIME NOT NULL,
  Account_number INTEGER NOT NULL,
  payment_method VARCHAR(100) NOT NULL,

  material_type VARCHAR(100) NOT NULL,
  material_quantity INTEGER NOT NULL,
  material_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  profit_ratio DECIMAL(10, 2) NOT NULL,

  request_id INTEGER REFERENCES requests(requests_id),
  company_id INTEGER REFERENCES company(company_id),
  station_id INTEGER REFERENCES station(station_id),
  is_delete BOOLEAN DEFAULT false
);

CREATE TABLE earnings_information  (
   profit_percentage DECIMAL(10, 2) NOT NULL,
);