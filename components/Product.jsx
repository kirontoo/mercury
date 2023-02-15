import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { urlFor } from "../lib/client";
import Link from "next/link";

const Product = ({ product: { image, name, slug, price, rating } }) => {
  return (
    <li className="product-item zoom-animation">
      <Link href={`/products/${slug.current}`}>
        <Card sx={{ width: "min-content" }}>
          <CardMedia
            sx={{ height: 250, width: 250, bgcolor: "grey.300" }}
            image={urlFor(image && image[0])}
            title="green iguana"
          />
          <CardContent sx={{ display: "flex", flexDirection: "column" }}>
            <Typography component="span">{name}</Typography>
            <Typography color="text.primary" fontWeight="bold" component="span">
              ${price}
            </Typography>
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
          </CardContent>
        </Card>
      </Link>
    </li>
  );
};

export default Product;
