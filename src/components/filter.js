export const Filter = ({
  filterMaterial,
  filterproduct,
  handleFilterChange,
  filters,
  setFilterMaterial,
  Material,
}) => {
  return (
    <div className="filters">
      <select
        name="product"
        value={filterproduct}
        onChange={handleFilterChange}
        style={{
          width: "300px",
          padding: "5px",
          marginLeft: "10px",
          borderRadius: "10px",
        }}
      >
        <option value="">Product</option>
        {filters.map((products) => (
          <option key={products} value={products}>
            {products}
          </option>
        ))}
      </select>
      <select
        name="material"
        value={filterMaterial}
        onChange={(e) => setFilterMaterial(e.target.value)}
        style={{
          width: "300px",
          padding: "5px",
          marginLeft: "10px",
          borderRadius: "10px",
        }}
      >
        <option value="">Material</option>
        {Material.map((material) => (
          <option key={material} value={material}>
            {material}
          </option>
        ))}
      </select>
    </div>
  );
};
