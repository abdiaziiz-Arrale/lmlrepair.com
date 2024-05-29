import { SideNavItemGroup } from "@/types/type";
import {
  BsEnvelope,
  BsGear,
  BsHouseDoor,
  BsKanban,
  BsListUl,
  BsQuestionCircle,
} from "react-icons/bs";
import { HandCoins, Users, Key } from "lucide-react";

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
        path: "/dashboard/products",
        icon: <BsKanban size={20} />,
      },
      {
        title: "Services",
        path: "/dashboard/services",
        icon: <HandCoins size={20} />,
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
