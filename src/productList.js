import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import QuickEdit from './components/quikEdit';
import { setFilters } from './redux/slice';
import AddProductModal from './components/addProduct';
import { products } from './components/addProduct';
const filters=products
const Material=["Stainless Steel","Aluminium","Copper","Brass","Plastic","Steel","Carbon Steel"," Titanium"]
const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [filterproduct,setFilterProduct]=useState("")
  const [filterMaterial,setFilterMaterial]=useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [product,setProduct]=useState(products)
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFilterChange = (e) => {
    setFilterProduct(e.target.value)
  };

  const toggleQuickEdit = (productId) => {
    setEditingProductId(productId);
  };

  useEffect(()=>{
    if(filterproduct!==""){
      console.log(filterproduct)
      const filteredProducts = products.filter(product => product.productName === filterproduct);
      setProduct(filteredProducts)
      if(filterMaterial!==""){
      const filter = filteredProducts.filter(product => product.material === filterMaterial);
      setProduct(filter)
      }
   }
   
   else{
    setProduct(products)
   }
   console.log(products)
  },[filterproduct,products,filterMaterial])
  return (
    <>
    <div>
   
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddProductModal productsLength={products} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
    <div className={isModalOpen?"productlisit":"product-list"}>
    <div>
      <button onClick={toggleModal} id="Button">Add Products</button>
      <span style={{marginLeft:"10px", fontSize:"20px"}}> <b>Total Product :{product.length} /{products.length} </b> </span>
      </div>
      <div className="filters">
        <select name="product" value={filterproduct} onChange={handleFilterChange}>
          <option value="">Select Product</option>
          {filters.map(products=>(
            <option key={products} value={products}>{products}</option>
          ))

          }
        </select>
        <select name="material" value={filterMaterial} onChange={(e)=>setFilterMaterial(e.target.value)}>
          <option value="">Select Material</option>
          {Material.map(material=>(
            <option key={material} value={material}>{material}</option>
          ))
          }
        </select>
      </div>
     
      <table id='productTable'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Actions</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <React.Fragment key={product.id}>
              {editingProductId === product.id? (
                <QuickEdit
                  product={product}
                 
                  setEditingProductId={setEditingProductId}
                />
              ) : (
                <tr>
                  <td> {product.product}</td>
                  <td>
                    <button onClick={() => toggleQuickEdit(product.id)} id="button">Quick Edit | Add product details</button>
                  </td>
                  <td id="description">
                  Material : {product.material}
                    <br></br>
                    {product.length ? (
                      <>Product Length: {product.length}</>
                    ) : (
                      ""
                    )}
                    <br></br>
                    {product.shape? (
                      <>Product shape: {product.shape}</>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{product.price}/kg</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default ProductList;


