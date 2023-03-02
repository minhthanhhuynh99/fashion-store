import HomeIcon from "@mui/icons-material/Home";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import GroupIcon from "@mui/icons-material/Group";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const StatusRole = {
  Admin: "Admin",
  User: "User",
};
export const DollarUsd = new Intl.NumberFormat("en-Us", {
  style: "currency",
  currency: "USD",
});
export const menuItem = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: <HomeIcon />,
  },
  {
    name: "Products",
    url: "/products",
    icon: <CardTravelIcon />,
  },
  {
    name: "Users",
    url: "/users",
    icon: <GroupIcon />,
  },
  {
    name: "Orders",
    url: "/orders",
    icon: <LocalShippingIcon />,
  },
  {
    name: "Categories",
    url: "/categories",
    icon: <i className="fa-solid fa-list"></i>,
  },
  {
    name: "Comments",
    url: "/*",
    icon: <i className="fa-solid fa-comment"></i>,
  },
];

export const customStyles = {
  table: {
    style: {
      maxWith: "500px",
      // backgroundColor: "#747d8c",
      // padding: "1rem",
    },
  },
  tableWrapper: {
    style: {
      maxWith: "100%",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#747d8c",
      color: "#fff",
      fontWeight: 700,
    },
  },
  rows: {
    style: {
      padding: "1rem 0",
    },
  },
  columns: {
    style: {
      with: "auto",
    },
  },
  highlightOnHover: {
    style: {
      backgroundColor: "red",
    },
  },
};
