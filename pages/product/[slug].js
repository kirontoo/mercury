import { client, urlFor } from "../../lib/client";
import {
  AiOutlinePlus,
  AiOutlineStar,
  AiFillStar,
  AiOutlineMinus,
} from "react-icons/ai";
import { Product } from "../../components";
import { useState } from "react";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div class="product-detail-container">
        <div>
          <div class="image-container">
            <img
              src={urlFor(image && image[index])}
              alt={image[index].name}
              className="product-detail-image"
            />
          </div>
          <div class="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i == index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
                alt={item.name}
              />
            ))}
          </div>
        </div>
        <div class="product-detail-desc">
          <h1>{name}</h1>
          <div class="reviews">
            <div>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiOutlineStar></AiOutlineStar>
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p class="price">${price}</p>
          <div class="quantity">
            <h3>Quantity: </h3>
            <p class="quantity-desc">
              <span class="minus">
                <AiOutlineMinus></AiOutlineMinus>
              </span>
              <span class="num">0</span>
              <span class="plus">
                <AiOutlinePlus></AiOutlinePlus>
              </span>
            </p>
          </div>
          <div class="buttons">
            <button class="add-to-cart" type="button">
              Add to Cart
            </button>
            <button class="buy-now" type="button">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div class="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div class="marquee">
          <div class="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const productsQuery = '*[_type == "product"] { slug { current }}';

  const products = await client.fetch(productsQuery);

  const paths = products.map((p) => ({
    params: { slug: p.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return { props: { products, product } };
};

export default ProductDetails;
