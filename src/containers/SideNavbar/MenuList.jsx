import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";
import StorefrontIcon from "@material-ui/icons/Storefront";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";

// const activeMenu = ["Буюртмалар", "Маҳсулотлар", "Дўконлар"];
// const nonActiveMenu = ["Созламалар", "Қўшимча"];

// function MenuList() {
//   return (
//     <List>
//       {activeMenu.map((text, index) => (
//         <ListItem button key={text} component={Link} to="/product-items">
//           <ListItemIcon>
//             {index % 2 === 0 ? <ListAltIcon /> : <ShoppingBasketIcon />}
//           </ListItemIcon>
//           <ListItemText primary={text} />
//         </ListItem>
//       ))}
//     </List>
//   );
// }

const activeMenu = ["Буюртмалар", "Маҳсулотлар", "Дўконлар"];
const nonActiveMenu = ["Созламалар", "Қўшимча"];

function MenuList(props) {
  return (
    <List>
      <ListItem button component={Link} to={props.toUrl}>
        <ListItemIcon>{props.iconName}</ListItemIcon>
        <ListItemText primary={props.title} />
      </ListItem>
    </List>
  );
}

export default MenuList;
