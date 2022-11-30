import {
  Calendar,
  CloseSquare,
  Document,
  Lock,
  Paper,
  PaperPlus,
  People,
  TwoUsers,
  User,
  Wallet,
} from "react-iconly";
import IntlMessages from "../../layout/components/lang/IntlMessages";

const pages = [
  {
    header: "Dashboard",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    navLink: "/",
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
  {
    header: "Master Data",
  },
  {
    id: "employee",
    title: "Karyawan",
    icon: <TwoUsers set="curved" className="remix-icon" />,
    children: [
      {
        id: "employee",
        title: "Karyawan",
        navLink: "/pages/employee",
        icon: <TwoUsers set="curved" className="remix-icon" />,
      },
      {
        id: "family",
        title: "Kelola Keluarga",
        navLink: "/pages/family",
        icon: <TwoUsers set="curved" className="remix-icon" />,
      },
    ],
  },
  {
    id: "attendance",
    title: "Absensi",
    navLink: "/pages/attendance",
    icon: <Calendar set="curved" className="remix-icon" />,
  },
  {
    id: "position",
    title: "Jabatan",
    navLink: "/pages/position",
    icon: <People set="curved" className="remix-icon" />,
  },
  {
    id: "user",
    title: "Pengguna",
    navLink: "/pages/user",
    icon: <Lock set="curved" className="remix-icon" />,
  },
  {
    header: "Transaksi",
  },
  {
    id: "payroll",
    title: "Data Penggajian",
    navLink: "/pages/payroll",
    icon: <Wallet set="curved" className="remix-icon" />,
  },
  {
    id: "report-attendance",
    title: "Laporan Absensi",
    navLink: "/pages/report-attendance",
    icon: <Paper set="curved" className="remix-icon" />,
  },
  {
    id: "report-payroll",
    title: "Laporan Penggajian",
    navLink: "/pages/report-payroll",
    icon: <Document set="curved" className="remix-icon" />,
  },
];

export default pages;
