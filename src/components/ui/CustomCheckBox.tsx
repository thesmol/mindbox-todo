import React from "react";
import { styled } from "@mui/material/styles";
import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";

const CustomCheckboxIcon = styled("span")(({ theme }) => ({
  borderRadius: 100,
  width: 35,
  height: 35,
  boxShadow:
    "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
  backgroundColor: "#ffffff",
  backgroundImage:
    "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2,
  },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
    ...theme.applyStyles("dark", {
      backgroundColor: "#30404d",
    }),
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background: "rgba(206,217,224,.5)",
    ...theme.applyStyles("dark", {
      background: "rgba(57,75,89,.5)",
    }),
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 0 1px rgb(16 22 26 / 40%)",
    backgroundColor: "#394b59",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))",
  }),
}));

const CheckedCustomCheckboxIcon = styled(CustomCheckboxIcon)({
  "&::before": {
    display: "block",
    width: 35,
    height: 35,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%2334A860' d='M35.506 86.242a1.454 1.454 0 0 1-1.03-.427L.427 51.771a1.458 1.458 0 0 1 0-2.06 1.46 1.46 0 0 1 2.059 0l32.959 32.955 62.012-69.458a1.456 1.456 0 0 1 2.057-.116 1.455 1.455 0 0 1 .117 2.056L36.593 85.754a1.453 1.453 0 0 1-1.046.486l-.041.002z'/%3E%3C/svg%3E")`,
    backgroundSize: "25px 25px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    content: '""',
  },
});

function CustomCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{ "&:hover": { bgcolor: "transparent" } }}
      disableRipple
      color="default"
      checkedIcon={<CheckedCustomCheckboxIcon />}
      icon={<CustomCheckboxIcon />}
      inputProps={{ "aria-label": "Checkbox demo" }}
      {...props}
    />
  );
}

export default CustomCheckbox;
