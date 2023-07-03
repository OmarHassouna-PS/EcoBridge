import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import "../styles/CarLLII.css";
import axios from "axios";

const CarListing = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedEnergyType, setSelectedEnergyType] = useState("");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [carData, setCarData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars`)
      .then((response) => {
        setCarData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleEnergyTypeChange = (event) => {
    setSelectedEnergyType(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };
  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const filteredCars = carData.filter((car) => {
    if (selectedBrand && car.model !== selectedBrand) {
      return false;
    }
    if (selectedType && car.type !== selectedType) {
      return false;
    }
    if (selectedEnergyType && car.energy_type !== selectedEnergyType) {
      return false;
    }
    if (search && !car.model.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (maxPrice && car.rental_price > maxPrice) {
      return false;
    }
    if (minPrice && car.rental_price < minPrice) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const brand = queryParams.get("brand");
    const type = queryParams.get("type");
    const energyType = queryParams.get("energyType");
    // const price = queryParams.get("price");

    setSelectedBrand(brand || "");
    setSelectedType(type || "");
    setSelectedEnergyType(energyType || "");
    // setSelectedPrice(price || "");
  }, []);

  return (
      <section>

      </section>
  );
};

export default CarListing;