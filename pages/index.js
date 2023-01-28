export default function Home() {
  return (
    <>
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="producst-container">
        {["product1", "product2"].map((product) => product)}
      </div>
    </>
  );
}
