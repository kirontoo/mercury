import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client.js";

const HeroBanner = ({ banner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{banner.smallText}</p>
      </div>
      <h3>{banner.midText}</h3>
      <h1>{banner.largeText1}</h1>
      <img
        className="hero-banner-image"
        src={urlFor(banner.image)}
        alt={banner.product}
      />
      <div>
        <Link href={`/product/${banner.product}`}>
          <button type="button">{banner.buttonText}</button>
        </Link>
        <div className="desc">
          <h5>Description</h5>
          <p>{banner.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
