import {
  IconDashboard,
  IconUsers,
} from "@tabler/icons-react";

export const MENU = {
  user: [],
  admin: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Usuários/Clientes",
      url: "/dashboard/users",
      icon: IconUsers,
    },
  ]
} as any;