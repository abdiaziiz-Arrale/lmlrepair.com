import { SideNavItemGroup } from "@/types/type";
import { Boxes, HandCoins, Key, Users } from "lucide-react";
import {
  BsGear,
  BsHouseDoor,
  BsKanban,
  BsListUl,
  BsQuestionCircle,
} from "react-icons/bs";

export const SIDENAV_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboards",
    menuList: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <BsHouseDoor size={20} />,
      },
    ],
  },
  {
    title: "Manage",
    menuList: [
      {
        title: "Products",
        path: "/dashboard/productcategory",
        icon: <BsKanban size={20} />,
      },
      {
        title: "Services",
        path: "/services",
        icon: <BsKanban size={20} />,
        submenu: true,
        subMenuItems: [
          {
            title: "General Services",
            path: "/dashboard/services?servicetype=general_service",
          },
          {
            title: "Repair Services",
            path: "/dashboard/brands",
          },
        ],
      },
      {
        title: "Inventory",
        path: "/dashboard/inventory",
        icon: <Boxes size={20} />,
      },

      {
        title: "Orders",
        path: "/dashboard/orders",
        icon: <BsListUl size={20} />,
      },
      {
        title: "Customers",
        path: "/dashboard/customers",
        icon: <Users size={20} />,
      },
      {
        title: "Staff",
        path: "/dashboard/staff",
        icon: <Key size={20} />,
      },
    ],
  },
  {
    title: "Others",
    menuList: [
      {
        title: "Account",
        path: "/dashboard/account",
        icon: <BsGear size={20} />,
      },
      {
        title: "Help",
        path: "/dashboard/help",
        icon: <BsQuestionCircle size={20} />,
      },
    ],
  },
];
