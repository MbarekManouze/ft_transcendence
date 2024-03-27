import { buttonClasses } from "@mui/base/Button";
import { Tab, tabClasses } from "@mui/base/Tab";
import { TabPanel } from "@mui/base/TabPanel";
import { TabsList } from "@mui/base/TabsList";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/system";

const StyledTab = styled(Tab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #b7b7c9;
  cursor: pointer;
  font-size: 1.075rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #f78562;
    color: #3d3c65;
  }

  &:focus {
    color: #3d3c65;
    background-color: #696693;
  }

  &.${tabClasses.selected} {
    background-color: #696693;
    color: #f78562;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const StyledTabPanel = styled(TabPanel)(
  ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    padding: 20px 12px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    border-radius: 12px;
    opacity: 0.6;
    `
);

const StyledTabsList = styled(TabsList)(
  () => `
    min-width: 400px;
    background-color: #3D3C65;
    border-radius: 12px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: space-between;
    `
);

export { StyledTab, StyledTabPanel, StyledTabsList };
