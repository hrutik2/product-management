// src/components/AddProductModal/AddProductModal.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddProduct } from "../redux/slice";
import axios from "axios";
const productData = {
  Pipe: {
    materials: {
      "Stainless Steel": [
        "Stainless Steel A1 Pipe",
        "Stainless Steel A2 Pipe",
        "Stainless Steel A3 Pipe",
        "Stainless Steel B1 Pipe",
        "Stainless Steel B2 Pipe",
        "Stainless Steel B3 Pipe",
        "Stainless Steel C1 Pipe",
        "Stainless Steel C2 Pipe",
        "Stainless Steel C3 Pipe",
      ],
      Aluminium: [
        "Aluminium A1 Pipe",
        "Aluminium A2 Pipe",
        "Aluminium A3 Pipe",
        "Aluminium B1 Pipe",
        "Aluminium B2 Pipe",
        "Aluminium B3 Pipe",
        "Aluminium B4 Pipe",
      ],
    },
  },
  Rod: {
    materials: {
      "Stainless Steel": [
        "Stainless Steel A1 Rod",
        "Stainless Steel A2 Rod",
        "Stainless Steel A3 Rod",
        "Stainless Steel B1 Rod",
        "Stainless Steel B2 Rod",
      ],
      Copper: [
        "Copper A1 Rod",
        "Copper A2 Rod",
        "Copper A3 Rod",
        "Copper B1 Rod",
        "Copper B2 Rod",
        "Copper B3 Rod",
        "Copper F1 Rod",
      ],
      Brass: [
        "Brass A1 Rod",
        "Brass A2 Rod",
        "Brass A3 Rod",
        "Brass B1 Rod",
        "Brass B2 Rod",
        "Brass B3 Rod",
        "Brass C1 Rod",
        "Brass C2 Rod",
        "Brass C3 Rod",
      ],
    },
  },
  Sheet: {
    materials: {
      Plastic: ["Plastic A1 Sheet", "Plastic A2 Sheet", "Plastic A3 Sheet"],
      Steel: [
        "Steel A1 Sheet",
        "Steel A2 Sheet",
        "Steel A3 Sheet",
        "Steel B1 Sheet",
        "Steel B2 Sheet",
      ],
    },
  },
  Tube: {
    materials: {
      "Carbon Steel": [
        "Carbon Steel A1 Tube",
        "Carbon Steel A2 Tube",
        "Carbon Steel A3 Tube",
        "Carbon Steel B1 Tube",
        "Carbon Steel B2 Tube",
      ],
      Titanium: [
        "Titanium A1 Tube",
        "Titanium A2 Tube",
        "Titanium A3 Tube",
        "Titanium B1 Tube",
        "Titanium B2 Tube",
        "Titanium B3 Tube",
      ],
    },
  },
  Wire: {
    materials: {
      "Stainless Steel": [
        "Stainless Steel A1 Wire",
        "Stainless Steel A2 Wire",
        "Stainless Steel A3 Wire",
        "Stainless Steel B1 Wire",
        "Stainless Steel B2 Wire",
      ],
      Aluminium: [
        "Aluminium A1 Wire",
        "Aluminium A2 Wire",
        "Aluminium A3 Wire",
        "Aluminium B1 Wire",
        "Aluminium B2 Wire",
        "Aluminium B3 Wire",
      ],
      Copper: [
        "Copper A1 Wire",
        "Copper A2 Wire",
        "Copper A3 Wire",
        "Copper B1 Wire",
        "Copper B2 Wire",
      ],
    },
  },
};
export const products = Object.keys(productData);

const AddProductModal = ({ productsLength, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [newProducts, setNewProducts] = useState([]);
  const [Product, setProduct] = useState();
  const [Material, setMatrial] = useState();
  const [Grades, setGrades] = useState([]);
  const [availableMaterials, setAvailableMaterials] = useState([]);
  const [availableGrades, setAvailableGrades] = useState([]);
  const [Id, setid] = useState(productsLength.length + 1);
  const handleChange = (e) => {
    const { value } = e.target;
    setProduct(value);

    setAvailableMaterials(Object.keys(productData[value].materials));
    console.log(availableMaterials);
  };

  const handleMaterialChange = (e) => {
    const { value } = e.target;
    setMatrial(e.target.value);
    setAvailableGrades(productData[Product].materials[value]);
  };

  const handleGradeChange = (e) => {
    const { options } = e.target;
    const selectedGrades = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedGrades.push(options[i].value);
        let obj = {
          product: options[i].value,
          material: Material,
          productName: Product,
          price: 200,
          id: Id,
        };
        setid(Id + 1);
        setNewProducts([...newProducts, obj]);
        setGrades([...Grades, options[i].value]);
      }
    }

    console.log(newProducts);
  };

  const handleSubmit = () => {
    newProducts.forEach((product) => {
      dispatch(AddProduct(product));
      setIsModalOpen(false);
      feactdata(product);
    });
    setNewProducts([]);
    setProduct("");
    setGrades([]);
    setAvailableMaterials([]);
    setAvailableGrades([]);
    setMatrial("");
  };

  const feactdata = (obj) => {
    axios
      .post("http://localhost:4000/Product", obj)
      .then((response) => {
        console.log("Data posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error posting the data:", error);
      });
  };

  return (
    <div className="add-product-modals">
      <h3 style={{ textAlign: "left", marginLeft: "50px" }}>Add product</h3>
      <div className="add-product-modal">
        <div className="productDiv">
          <>
            <p>
              <b>Products</b>
            </p>
          </>
          <select
            name="product"
            value={Product}
            multiple
            onChange={handleChange}
          >
            {products.map((product) => (
              <option
                key={product}
                value={product}
                className={Product === product ? "select" : "nonselected"}
              >
                {product}
              </option>
            ))}
          </select>
        </div>
        <div className="materailDiv">
          <p>
            <b>Material</b>
          </p>
          <select
            name="material"
            value={Material}
            onChange={handleMaterialChange}
            multiple
            disabled={!Product}
          >
            {availableMaterials.map((material) => (
              <option
                key={material}
                value={material}
                className={Material === material ? "select" : "nonselected"}
              >
                {material}
              </option>
            ))}
          </select>
        </div>
        <div className="GradeDiv">
          <p>
            <b>Grades</b>
          </p>
          <select
            name="grade"
            multiple={true}
            value={Grades}
            onChange={handleGradeChange}
            disabled={!Material}
          >
            {availableGrades.map((grade) => (
              <option
                key={grade}
                value={grade}
                className={Grades.includes(grade) ? "selected" : "nonselected"}
              >
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div>{grade}</div>
                  <div>
                    <input
                      type="checkbox"
                      checked={Grades.includes(grade)}
                      style={{ display: "block" }}
                    ></input>
                  </div>
                </div>
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleSubmit}
        id="Button"
        style={{ width: "20%", backgroundColor: "aqua", color: "black" }}
      >
        Submit
      </button>
    </div>
  );
};

export default AddProductModal;
