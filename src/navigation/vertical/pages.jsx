import { CloseSquare, PaperPlus, TwoUsers } from 'react-iconly'
import IntlMessages from '../../layout/components/lang/IntlMessages'

const pages = [
  {
    header: <IntlMessages id="sidebar-pages" />,
  },
  {
    id: 'employee',
    title: 'Karyawan',
    navLink: '/pages/employee',
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
  {
    id: 'attendance',
    title: 'Absensi',
    navLink: '/pages/attendance',
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
  {
    id: 'position',
    title: 'Jabatan',
    navLink: '/pages/position',
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
  {
    id: 'payroll',
    title: 'Data Penggajian',
    navLink: '/pages/payroll',
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
  {
    id: 'report-attendance',
    title: 'Laporan Absensi',
    navLink: '/pages/report-attendance',
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
  {
    id: 'report-payroll',
    title: 'Laporan Penggajian',
    navLink: '/pages/report-payroll',
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
  {
    id: 'operator',
    title: 'Operator',
    navLink: '/pages/operator',
    icon: <TwoUsers set="curved" className="remix-icon" />,
  },
]

export default pages
