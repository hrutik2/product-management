import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/slice";
import axios from "axios";
import { setProducts } from "../redux/slice";
const QuickEdit = ({ product, setEditingProductId }) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    shape: product.shape || "",
    length: product.length || "",
  });

  useEffect(() => {
    setDetails({
      shape: product.shape || "",
      length: product.length || "",
    });
  }, [product]);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateProduct({ id: product.id, updatedProduct: details }));
    feactdata(product.id, details);
    setEditingProductId(null);
  };
  const feactdata = (id, obj) => {
    axios
      .patch(`http://localhost:4000/Product/${id}`, obj)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the data:", error);
      });
  };

  return (
    <tr>
      <td colSpan="4">
        <div className="quick-edit">
          <p style={{ textAlign: "left" }}>Quick Edit</p>
          <div id="productDetails">
            <p>Product Name : {product.product}</p>
            <p>Price : {product.price} / kg</p>
          </div>
          <div style={{ width: "100%", borderBottom: "1px solid black" }}></div>

          <div style={{ marginTop: "10px" }}>
            <p>
              {" "}
              <b>product Details</b>
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",

                marginTop: "30px",
              }}
            >
              <div>
                <label>
                  <b>Shape</b>
                </label>
                <input
                  name="shape"
                  value={details.shape}
                  onChange={handleChange}
                  placeholder="Shape"
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "15px",
                    width: "70%",
                  }}
                />
              </div>
              <div>
                <label>
                  <b>Length</b>
                </label>
                <input
                  name="length"
                  value={details.length}
                  onChange={handleChange}
                  placeholder="Length"
                  style={{
                    marginLeft: "10px",
                    padding: "5px",
                    borderRadius: "15px",
                    width: "60%",
                  }}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            id="Button"
            style={{ width: "150px", marginRight: "30px" }}
          >
            Update
          </button>
          <button
            onClick={() => setEditingProductId(null)}
            id="Button"
            style={{ width: "150px", marginRight: "30px" }}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default QuickEdit;
