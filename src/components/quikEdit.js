import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/slice";
import axios from "axios";

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
        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error("There was an error updating the data:", error);
      });
  };

  return (
    <tr>
      <td colSpan="4">
        <div className="quick-edit">
          <div id="productDetails">
            <h3>Product Name : {product.product}</h3>
            <h3>Price : {product.price} / kg</h3>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingLeft: "10px",
              paddingRight: "10px",
              margin: "10px",
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
                  width: "50%",
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
                  width: "50%",
                }}
              />
            </div>
          </div>
          <button onClick={handleSubmit} id="Button">
            {" "}
            Update
          </button>
          <button onClick={() => setEditingProductId(null)} id="Button">
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default QuickEdit;
