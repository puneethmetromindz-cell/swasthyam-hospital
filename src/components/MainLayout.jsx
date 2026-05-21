import { Link, Outlet, useLocation } from "react-router-dom";
import {
	Phone,
	MapPin,
	// MessageCircle,
	Menu,
	X,
	ChevronRight,
	Mail,
} from "lucide-react";
import { useState, useEffect } from "react";
import swasthyamlogo from "../assets/swasthyam-logo.jpg";
import swasthyamlogoo from "../assets/swasthyam_logo.png";
import { cn } from "../lib/utils";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT_INFO = {
	md: ["8151938206", "7829712073", "9008608842"],
	appointments: "9901984418",
	emergency: "9008608842",
	location: "Muddinpalya, Bangalore",
	email: "swasthyamhospitals@gmail.com",
};

export default function MainLayout() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div
			className="flex flex-col min-h-screen"
			style={{ background: "#f4f8ff" }}
		>
			<TopBar />
			<Header />
			<main className="flex-1 pb-16 md:pb-0">
				<Outlet />
			</main>
			<Footer />
			<FloatingWhatsApp />

			{/* Mobile Sticky Action Bar */}
			<div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-blue-100 flex items-center z-50 shadow-lg">
				<a
					href={`tel:${CONTACT_INFO.appointments}`}
					className="flex-1 flex flex-col items-center justify-center p-3 text-slate-700 focus:bg-blue-50 active:bg-blue-100"
				>
					<Phone className="w-5 h-5 text-brand-orange mb-1" />
					<span className="text-[10px] font-bold uppercase tracking-wider">
						Call Now
					</span>
				</a>
				<div className="w-px h-10 bg-blue-100"></div>
				<a
					href={`https://wa.me/91${CONTACT_INFO.appointments}?text=I want to book an appointment`}
					target="_blank"
					rel="noopener noreferrer"
					className="flex-1 flex flex-col items-center justify-center p-3 text-slate-700 focus:bg-green-50 active:bg-green-100"
				>
					<FaWhatsapp className="w-5 h-5 text-[#25D366] mb-1" />
					<span className="text-[10px] font-bold uppercase tracking-wider">
						WhatsApp
					</span>
				</a>
			</div>
		</div>
	);
}

function TopBar() {
	return (
		<div
			className="hidden md:flex py-2 px-8 justify-between items-center z-50 relative border-b"
			style={{ background: "#1a6fc4", borderColor: "rgba(255,255,255,0.15)" }}
		>
			<div className="flex gap-6 text-[11px] uppercase tracking-widest text-white/90">
				<span className="flex items-center gap-2">
					<span className="text-yellow-200 font-semibold">MD:</span>{" "}
					{CONTACT_INFO.md.join(" / ")}
				</span>
				<span className="flex items-center gap-2">
					<span className="text-yellow-200 font-semibold">APPOINTMENTS:</span>{" "}
					{CONTACT_INFO.appointments}
				</span>
			</div>
			<div className="text-[11px] uppercase tracking-widest text-white/80 italic flex items-center gap-1">
				<MapPin className="w-3 h-3" /> {CONTACT_INFO.location}
			</div>
		</div>
	);
}

function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ name: "Home", path: "/" },
		{ name: "About Us", path: "/about" },
		{ name: "Specialties", path: "/specialties" },
		{ name: "Doctors", path: "/doctors" },
		{ name: "Services", path: "/services" },
		{ name: "Contact", path: "/contact" },
	];

	return (
		<header
			className={cn(
				"sticky top-0 z-40 w-full transition-all duration-300",
				isScrolled
					? "bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100 h-24"
					: "bg-white h-24 shadow-sm border-b border-blue-50",
			)}
		>
			<div className="px-6 max-w-7xl mx-auto flex items-center justify-between h-full">
				<Link to="/" className="flex items-center h-full py-2">
					<img
						src={swasthyamlogoo}
						alt="Swasthyam Super Speciality Hospital"
						className="h-14 w-auto object-contain"
						style={{
							transform: "translateZ(0)",
							WebkitTransform: "translateZ(0)",
							backfaceVisibility: "hidden",
							WebkitBackfaceVisibility: "hidden",
							imageRendering: "auto",
						}}
					/>
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden lg:flex items-center gap-8">
					{navLinks.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							className={cn(
								"text-[13px] font-medium uppercase tracking-wider transition-all duration-200 relative group",
								pathname === link.path
									? "text-brand-orange"
									: "text-slate-600 hover:text-brand-blue",
							)}
						>
							{link.name}
							<span
								className={cn(
									"absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300",
									pathname === link.path
										? "w-full bg-brand-orange"
										: "w-0 group-hover:w-full bg-brand-blue",
								)}
							></span>
						</Link>
					))}
					<a
						href={`tel:${CONTACT_INFO.emergency}`}
						className="btn-secondary text-[12px]"
					>
						EMERGENCY: 24/7
					</a>
				</nav>

				{/* Mobile menu toggle */}
				<button
					className="lg:hidden p-2 text-slate-600 hover:text-brand-blue transition-colors"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? (
						<X className="w-7 h-7" />
					) : (
						<Menu className="w-7 h-7" />
					)}
				</button>
			</div>

			{/* Mobile Nav Dropdown */}
			<div
				className={cn(
					"lg:hidden absolute top-full left-0 w-full bg-white border-b border-blue-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out",
					mobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
				)}
			>
				<nav className="flex flex-col p-4">
					{navLinks.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							onClick={() => setMobileMenuOpen(false)}
							className={cn(
								"py-4 px-4 border-b border-blue-50 text-sm font-medium uppercase tracking-wider flex items-center justify-between",
								pathname === link.path ? "text-brand-orange" : "text-slate-700",
							)}
						>
							{link.name}
							<ChevronRight className="w-4 h-4 opacity-40" />
						</Link>
					))}
					<div className="p-4 flex flex-col gap-3 mt-2">
						<a
							href={`tel:${CONTACT_INFO.appointments}`}
							className="btn-primary text-center justify-center text-[11px]"
						>
							Call Appointments
						</a>
						<a
							href={`https://wa.me/91${CONTACT_INFO.appointments}?text=I want to book an appointment`}
							target="_blank"
							rel="noopener noreferrer"
							className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-lg font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-colors"
						>
							<FaWhatsapp className="w-5 h-5" />
							WhatsApp Us
						</a>
					</div>
				</nav>
			</div>
		</header>
	);
}

function Footer() {
	return (
		<footer
			className="border-t pt-12 md:pt-16"
			style={{ background: "#1a2340", borderColor: "rgba(255,255,255,0.08)" }}
		>
			<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
				{/* Brand */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					<Link to="/" className="flex items-center gap-3 mb-5">
						<img
							src={swasthyamlogo}
							alt="Swasthyam Super Speciality Hospital"
							className="h-20 w-auto object-contain rounded-lg"
						/>
					</Link>
					<p className="text-blue-200 mb-3 font-semibold italic text-lg tracking-wide">
						"Your Health, Our Priority"
					</p>
					<p className="text-slate-400 text-sm leading-relaxed">
						Advanced care meets trusted healing. We provide world-class medical
						facilities with compassionate care.
					</p>
				</div>

				{/* Quick Links */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					<h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
						<span
							className="w-6 h-1 rounded-full"
							style={{ background: "#e05c1a" }}
						></span>
						Quick Links
					</h3>
					<ul className="space-y-3 text-slate-400 text-sm">
						{[
							["About Us", "/about"],
							["Specialties", "/specialties"],
							["Our Doctors", "/doctors"],
							["Services", "/services"],
							["Contact", "/contact"],
						].map(([label, path]) => (
							<li key={path}>
								<Link
									to={path}
									className="hover:text-blue-300 transition-colors flex items-center justify-center md:justify-start gap-1.5 group"
								>
									<ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-blue-300" />
									{label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				{/* Contact info — FIX: centered icon+text block on mobile */}
				<div className="flex flex-col items-center md:items-start">
					<h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
						<span
							className="w-6 h-1 rounded-full"
							style={{ background: "#e05c1a" }}
						></span>
						Contact
					</h3>
					<ul className="space-y-4 text-slate-400 text-sm w-full">
						{/* Appointments */}
						<li className="flex items-start gap-3 justify-center md:justify-start">
							<Phone
								className="w-4 h-4 shrink-0 mt-0.5"
								style={{ color: "#e05c1a" }}
							/>
							<div className="text-center md:text-left">
								<p className="text-white font-medium mb-0.5">Appointments</p>
								<a
									href={`tel:${CONTACT_INFO.appointments}`}
									className="hover:text-blue-300 transition-colors"
								>
									{CONTACT_INFO.appointments}
								</a>
							</div>
						</li>
						{/* MD */}
						<li className="flex items-start gap-3 justify-center md:justify-start">
							<Phone
								className="w-4 h-4 shrink-0 mt-0.5"
								style={{ color: "#e05c1a" }}
							/>
							<div className="text-center md:text-left">
								<p className="text-white font-medium mb-0.5">
									Managing Director
								</p>
								<div className="flex flex-col gap-0.5">
									{CONTACT_INFO.md.map((num, idx) => (
										<a
											key={idx}
											href={`tel:${num}`}
											className="hover:text-blue-300 transition-colors"
										>
											{num}
										</a>
									))}
								</div>
							</div>
						</li>
						{/* Location */}
						<li className="flex items-start gap-3 justify-center md:justify-start">
							<MapPin
								className="w-4 h-4 shrink-0 mt-0.5"
								style={{ color: "#e05c1a" }}
							/>
							<div className="text-center md:text-left">
								<p className="text-white font-medium mb-0.5">Location</p>
								<span>{CONTACT_INFO.location}</span>
							</div>
						</li>
						{/* Email */}
						<li className="flex items-start gap-3 justify-center md:justify-start">
							<Mail
								className="w-4 h-4 shrink-0 mt-0.5"
								style={{ color: "#e05c1a" }}
							/>
							<div className="text-center md:text-left">
								<p className="text-white font-medium mb-0.5">Email</p>
								<a
									href={`mailto:${CONTACT_INFO.email}`}
									className="hover:text-blue-300 transition-colors break-all"
								>
									{CONTACT_INFO.email}
								</a>
							</div>
						</li>
					</ul>
				</div>

				{/* Emergency */}
				<div className="flex flex-col items-center md:items-start">
					<h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
						<span
							className="w-6 h-1 rounded-full"
							style={{ background: "#e05c1a" }}
						></span>
						Emergency
					</h3>
					<div
						className="p-5 rounded-xl border w-full text-center md:text-left"
						style={{
							background: "rgba(26,111,196,0.15)",
							borderColor: "rgba(26,111,196,0.3)",
						}}
					>
						<p className="font-bold text-xl mb-2" style={{ color: "#7db8e8" }}>
							24/7 Open
						</p>
						<p className="text-sm text-slate-400 mb-4">
							Our emergency and trauma center is available round the clock.
						</p>
						<a
							href={`tel:${CONTACT_INFO.emergency}`}
							className="w-full block text-center bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg text-sm"
						>
							Emergency Call: {CONTACT_INFO.emergency}
						</a>
					</div>
				</div>
			</div>

			{/* Bottom bar — FIX: pb-20 on mobile so it clears the sticky bottom action bar */}
			<div
				className="max-w-7xl mx-auto px-6 py-6 pb-24 md:pb-6 flex flex-col items-center md:flex-row md:justify-between gap-3 text-xs text-slate-500 text-center"
				style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
			>
				<p>
					&copy; {new Date().getFullYear()} Swasthyam Super Specialty Hospital.
					All rights reserved.
				</p>
				{/* FIX: flex-col on mobile so "Designed by Metromindz" is always on its own line and visible */}
				<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
					<Link to="/" className="hover:text-slate-300 transition-colors">
						Privacy Policy
					</Link>
					<Link to="/" className="hover:text-slate-300 transition-colors">
						Terms of Service
					</Link>
					<a
						href="https://metromindz.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:text-slate-300 transition-colors text-slate-400 whitespace-nowrap"
					>
						Designed by{" "}
						<span className="text-blue-400 font-semibold">Metromindz</span>
					</a>
				</div>
			</div>
		</footer>
	);
}

function FloatingWhatsApp() {
	return (
		<a
			href={`https://wa.me/91${CONTACT_INFO.appointments}?text=I want to book an appointment`}
			target="_blank"
			rel="noopener noreferrer"
			className="flex fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all group items-center justify-center"
			aria-label="Chat on WhatsApp"
		>
			<FaWhatsapp className="w-6 h-6 md:w-8 md:h-8" />
			<span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 w-max bg-white text-slate-900 px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
				Chat with us
			</span>
			<span className="absolute top-0 right-0 flex h-3 w-3">
				<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
				<span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
			</span>
		</a>
	);
}
