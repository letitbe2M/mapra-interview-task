import { CircularProgress, Typography, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box className="flex flex-col items-center justify-center h-[60vh]">
      <CircularProgress color="primary" />
      <Typography className="mt-4" variant="body1">
        در حال بارگذاری اطلاعات ...
      </Typography>
    </Box>
  );
}
