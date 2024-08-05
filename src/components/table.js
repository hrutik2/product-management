import QuickEdit from "./quikEdit";
import React from "react";
export const Table = ({
  editingProductId,
  product,
  setEditingProductId,
  toggleQuickEdit,
}) => {
  return (
    <table id="productTable">
      <thead>
        {editingProductId ? (
          <tr>
            <th>Product</th>
            <th>Actions</th>
            <th>Price</th>
          </tr>
        ) : (
          <tr>
            <th>Product</th>
            <th>Actions</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        )}
      </thead>
      <tbody>
        {product.map((product) => (
          <React.Fragment key={product.id}>
            {editingProductId === product.id ? (
              <QuickEdit
                product={product}
                setEditingProductId={setEditingProductId}
              />
            ) : (
              <tr>
                <td>
                  <b>{product.product}</b>
                </td>
                <td>
                  <button
                    onClick={() => toggleQuickEdit(product.id)}
                    id="button"
                  >
                    Quick Edit | Add product details
                  </button>
                </td>
                {!editingProductId && (
                  <td id="description">
                    Material: {product.material}
                    <br />
                    {product.length && (
                      <>
                        Product Length: {product.length}
                        <br />
                      </>
                    )}
                    {product.shape && (
                      <>
                        Product Shape: {product.shape}
                        <br />
                      </>
                    )}
                  </td>
                )}
                <td>{product.price}/kg</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};
