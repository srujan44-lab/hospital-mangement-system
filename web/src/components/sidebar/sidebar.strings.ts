import { sidebarListType } from "./sidebar.types";

export const sidebarList = (email: string): sidebarListType[] => {
  if (email.endsWith("@admin.com"))
    return [
      {
        url: "/admin",
        value: "Dashboard",
      },
      {
        url: "/admin/doctors",
        value: "Doctors",
      },
      {
        url: "/admin/schedule",
        value: "Schedule",
      },
      {
        url: "/admin/appointment",
        value: "Appointment",
      },
      {
        url: "/admin/patients",
        value: "Patients",
      },
    ];

  if (email.endsWith("@doctor.com")) return [
    {
      url: "/doctor",
      value: "Dashboard",
    },
    {
      url: "/doctor/my-appointments",
      value: "My Appointments",
    },
    {
      url: "/doctor/my-sessions",
      value: "My Sessions",
    },
    {
      url: "/doctor/my-patients",
      value: "My Patients",
    },
    // {
    //   url: "/doctor/settings",
    //   value: "Settings",
    // },
  ];

  return [
    {
      url: "/patient",
      value: "Home",
    },
    {
      url: "/patient/all-doctors",
      value: "All Doctors",
    },
    {
      url: "/patient/scheduled-sessions",
      value: "Scheduled Sessions",
    },
    {
      url: "/patient/my-bookings",
      value: "My Bookings",
    },
    // {
    //   url: "/patient/settings",
    //   value: "Settings",
    // },
  ];
};
