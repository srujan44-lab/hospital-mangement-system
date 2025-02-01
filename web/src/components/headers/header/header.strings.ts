export const headerTitle = (url: string) => {
  switch (url) {
    case "/admin":
      return "Dashboard";
    case "/admin/doctors":
      return "Doctors";
    case "/admin/schedule":
      return "Schedule";
    case "/admin/appointment":
      return "Appointment";
    case "/admin/patients":
      return "Patients";
    case "/doctor":
      return "Dashboard";
    case "/doctor/my-appointments":
      return "My Appointments";
    case "/doctor/my-sessions":
      return "My Sessions";
    case "/doctor/my-patients":
      return "My Patients";
    case "/doctor/settings":
      return "Settings";
    case "/patient":
      return "Home";
    case "/patient/all-doctors":
      return "All Doctors";
    case "/patient/scheduled-sessions":
      return "Scheduled Sessions";
    case "/patient/my-bookings":
      return "My Bookings";
    case "/patient/settings":
      return "Settings";
  }
};
