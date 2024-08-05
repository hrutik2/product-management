import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import QuickEdit from "./components/quikEdit";
import { setFilters, setProducts } from "./redux/slice";
import axios from "axios";
import AddProductModal from "./components/addProduct";
import { products } from "./components/addProduct";
import { Filter } from "./components/filter";
import { Table } from "./components/table";

const filters = products;
const Material = [
  "Stainless Steel",
  "Aluminium",
  "Copper",
  "Brass",
  "Plastic",
  "Steel",
  "Carbon Steel",
  "Titanium",
];
const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [filterproduct, setFilterProduct] = useState("");
  const [filterMaterial, setFilterMaterial] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [product, setProduct] = useState(products);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFilterMaterial("")
    setFilterProduct("");
  };

  const handleFilterChange = (e) => {
    setFilterProduct(e.target.value);
  };

  const toggleQuickEdit = (productId) => {
    setEditingProductId(productId);
    setFilterMaterial("")
    setFilterProduct("");
  };

  useEffect(() => {
    if (filterproduct !== "") {
      console.log(filterproduct);
      const filteredProducts = products.filter(
        (product) => product.productName === filterproduct
      );
      setProduct(filteredProducts);
      if (filterMaterial !== "") {
        const filter = filteredProducts.filter(
          (product) => product.material === filterMaterial
        );
        setProduct(filter);
      }
    } else {
      setProduct(products);
    }

  }, [filterproduct, filterMaterial, products]);

  useEffect(() => {
    if (feactdata()) {
      console.log(feactdata())
    }
    else {
      let product = [{ id: "1", product: "Copper B1 Rod", material: "Copper", productName: "Rod", price: 200, shape: "round", length: "1002" }]
      dispatch(setProducts(product))
    }

  }, []);
  const feactdata = () => {
    axios.get("http://localhost:4000/Product")
      .then((response) => {
        console.log(response.data);

        dispatch(setProducts(response.data));
      })
      .catch((error) => {
        console.error("There was an error posting the data:", error);
      });
  };
  return (
    <>
      <div>
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <AddProductModal
                productsLength={products}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </div>
        )}
      </div>
      <div className={isModalOpen ? "productlisit" : "product-list"}>
        <div>
          <button onClick={toggleModal} id="Button" style={{ width: "200px" }}>
            +   Add Products
          </button>
          <span style={{ marginLeft: "10px", fontSize: "20px" }}>

            <b>
              Total Product :{product.length} /{products.length}
            </b>
          </span>
        </div>

        <Filter
          filterMaterial={filterMaterial}
          filterproduct={filterproduct}
          handleFilterChange={handleFilterChange}
          filters={filters}
          setFilterMaterial={setFilterMaterial}
          Material={Material}
        ></Filter>

        <Table
          editingProductId={editingProductId}
          product={product}
          setEditingProductId={setEditingProductId}
          toggleQuickEdit={toggleQuickEdit}
        ></Table>


      </div>
    </>
  );
};

export default ProductList;
