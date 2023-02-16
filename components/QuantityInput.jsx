import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityInput = ({ children, onDecreaseQty, onIncreaseQty }) => {
  return (
    <Stack direction="row">
      <Button size="small" onClick={onDecreaseQty}>
        <RemoveIcon />
      </Button>
      <Typography py="0.5em" px="1em">
        {children}
      </Typography>
      <Button size="small" onClick={onIncreaseQty} sx={{ color: "green" }}>
        <AddIcon />
      </Button>
    </Stack>
  );
};

export default QuantityInput;
