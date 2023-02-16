import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Custom404 = () => {
  return (
    <Stack justifyContent="center" alignItems="center" minHeight="60vh" spacing={1}>
      <Typography variant="h3" component="span" color="primary">
        404
      </Typography>
    <Typography variant="h6" component="span">This page could not be found</Typography>
    </Stack>
  );
};

export default Custom404;
