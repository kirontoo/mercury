import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { urlFor } from "../lib/client";
import Link from "next/link";

const ProductItem = ({ product: { image, name, slug, price } }) => {
  return (
    <li class="product-item">
      <Link href={`/product/${slug.current}`}>
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
          </CardContent>
        </Card>
      </Link>
    </li>
  );
};

export default ProductItem;
