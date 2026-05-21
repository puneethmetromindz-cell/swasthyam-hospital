import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Specialties from "./pages/Specialties";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";

// Dashboard imports
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./pages/dashboard/Login";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DoctorsDashboard from "./pages/dashboard/DoctorsDashboard";
import DashboardContact from "./pages/dashboard/DashboardContact";

export default function App() {
	return (
		<Routes>
			{/* Public routes */}
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path="specialties" element={<Specialties />} />
				<Route path="doctors" element={<Doctors />} />
				<Route path="services" element={<Services />} />
				<Route path="contact" element={<Contact />} />
				<Route path="about" element={<About />} />
			</Route>

			{/* Dashboard login (public) */}
			<Route path="/dashboard/login" element={<Login />} />

			{/* Protected dashboard routes */}
			<Route path="/dashboard" element={<ProtectedRoute />}>
				<Route element={<DashboardLayout />}>
					<Route index element={<DashboardHome />} />
					<Route path="doctors" element={<DoctorsDashboard />} />
					<Route path="contacts" element={<DashboardContact />} />
				</Route>
			</Route>
		</Routes>
	);
}
