import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
	LayoutDashboard,
	Users,
	CalendarCheck,
	LogOut,
	Menu,
	X,
	ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import swasthyamlogo from "../assets/swasthyam-logo.jpg";

const NAV_ITEMS = [
	{ name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
	{ name: "Manage Doctors", path: "/dashboard/doctors", icon: Users },
	{ name: "Contact Submissions", path: "/dashboard/contacts", icon: CalendarCheck },
];

export default function DashboardLayout() {
	const { user, signOut } = useAuth();
	const { pathname } = useLocation();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<div className="flex min-h-screen" style={{ background: "#f4f8ff" }}>
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				></div>
			)}

			{/* Sidebar */}
			<aside
				className={cn(
					"fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col transition-transform duration-300 lg:translate-x-0",
					sidebarOpen ? "translate-x-0" : "-translate-x-full",
				)}
				style={{
					background: "linear-gradient(180deg, #1a2340 0%, #0e1a30 100%)",
				}}
			>
				{/* Sidebar header */}
				<div
					className="p-6 flex items-center justify-between"
					style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
				>
					<Link to="/dashboard" className="flex items-center gap-3 group">
						<img
							src={swasthyamlogo}
							alt="Swasthyam"
							className="h-10 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
						/>
						<div>
							<h1 className="text-white font-bold text-sm tracking-tight leading-none">
								SWASTHYAM
							</h1>
							<p
								className="text-[9px] uppercase tracking-[0.2em] font-semibold mt-0.5"
								style={{ color: "#e05c1a" }}
							>
								Admin Panel
							</p>
						</div>
					</Link>
					<button
						className="lg:hidden text-white/60 hover:text-white p-1"
						onClick={() => setSidebarOpen(false)}
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex-1 p-4 space-y-1.5 mt-2">
					<p
						className="px-4 mb-3 text-[9px] uppercase tracking-[0.2em] font-semibold"
						style={{ color: "rgba(255,255,255,0.25)" }}
					>
						Navigation
					</p>
					{NAV_ITEMS.map((item) => {
						const isActive =
							item.path === "/dashboard"
								? pathname === "/dashboard"
								: pathname.startsWith(item.path);
						const Icon = item.icon;

						return (
							<Link
								key={item.path}
								to={item.path}
								onClick={() => setSidebarOpen(false)}
								className={cn(
									"flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all group",
									isActive
										? "text-white"
										: "text-slate-400 hover:text-white hover:bg-white/5",
								)}
								style={
									isActive
										? {
												background: "linear-gradient(135deg, rgba(26,111,196,0.25) 0%, rgba(224,92,26,0.1) 100%)",
												border: "1px solid rgba(26,111,196,0.3)",
												boxShadow: "0 4px 12px rgba(26,111,196,0.15)",
											}
										: {}
								}
							>
								<Icon
									className={cn(
										"w-5 h-5 transition-colors",
										isActive ? "text-[#7db8e8]" : "text-slate-500 group-hover:text-slate-300",
									)}
								/>
								{item.name}
								{isActive && (
									<ChevronRight className="w-4 h-4 ml-auto" style={{ color: "#e05c1a" }} />
								)}
							</Link>
						);
					})}
				</nav>

				{/* User / Logout */}
				<div
					className="p-4"
					style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
				>
					<div
						className="px-4 py-3 rounded-xl mb-3"
						style={{
							background: "rgba(255,255,255,0.04)",
							border: "1px solid rgba(255,255,255,0.06)",
						}}
					>
						<p
							className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-1"
							style={{ color: "rgba(255,255,255,0.3)" }}
						>
							Signed in as
						</p>
						<p className="text-sm text-white font-medium truncate">
							{user?.email || "Admin"}
						</p>
					</div>
					<button
						onClick={handleSignOut}
						className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-medium transition-all"
						style={{
							color: "#ef4444",
							background: "rgba(239,68,68,0.06)",
							border: "1px solid rgba(239,68,68,0.1)",
						}}
					>
						<LogOut className="w-5 h-5" />
						Sign Out
					</button>
				</div>
			</aside>

			{/* Main content area */}
			<div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
				{/* Top header bar */}
				<header
					className="sticky top-0 z-30 h-16 flex items-center justify-between px-6"
					style={{
						background: "rgba(255,255,255,0.9)",
						backdropFilter: "blur(12px)",
						borderBottom: "1px solid #d5e3f5",
					}}
				>
					<div className="flex items-center gap-4">
						<button
							className="lg:hidden p-2 rounded-lg transition-colors"
							style={{ color: "#1a2340" }}
							onClick={() => setSidebarOpen(true)}
						>
							<Menu className="w-6 h-6" />
						</button>

						<div className="hidden lg:block">
							<p
								className="text-[10px] uppercase tracking-widest font-semibold"
								style={{ color: "#7a8aaa" }}
							>
								Hospital Management
							</p>
						</div>
					</div>

					<Link
						to="/"
						className="text-[11px] uppercase tracking-widest font-bold px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5"
						style={{
							color: "#1a6fc4",
							background: "rgba(26,111,196,0.06)",
							border: "1px solid rgba(26,111,196,0.15)",
						}}
					>
						← View Website
					</Link>
				</header>

				{/* Page content */}
				<main className="flex-1 p-6 lg:p-8">
					<Outlet />
				</main>

				{/* Dashboard footer */}
				<footer
					className="px-6 py-4 text-center"
					style={{ borderTop: "1px solid #e0ecf8" }}
				>
					<p className="text-[10px] uppercase tracking-widest" style={{ color: "#b0bdd0" }}>
						© {new Date().getFullYear()} Swasthyam Super Specialty Hospital — Admin Dashboard
					</p>
				</footer>
			</div>
		</div>
	);
}
