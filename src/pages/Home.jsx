import {
	ArrowRight,
	PhoneCall,
	Clock,
	Stethoscope,
	ShieldCheck,
	AlertCircle,
	ActivitySquare,
	Bone,
	Users,
	CheckCircle2,
	Star,
	CalendarDays,
	MapPin,
	Activity,
	Zap,
	TestTube,
	Settings,
	Phone,
	Play,
	ChevronLeft,
	ChevronRight,
	
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import swasthyamimg from "../assets/swasthyam-hospital.webp";
import generalMedicineImg from "../assets/General-medicine.jpg";
import icuEmergencyImg from "../assets/icu-emergency.jpg";
import gynaecologyImg from "../assets/gynaecology.jpg";
import orthopedicsImg from "../assets/orthopedics.jpg";
import hospital from "../assets/hospital.jpeg";
import review1 from "../assets/review1.mp4";
import review2 from "../assets/review2.mp4";
import review3 from "../assets/review3.mp4";
import review4 from "../assets/review4.mp4";

function useScrollReveal() {
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					el.classList.add("in-view");
					obs.unobserve(el);
				}
			},
			{ threshold: 0.12 },
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);
	return ref;
}

const DEPARTMENT_OPTIONS = [
	{ value: "", label: "Select Department" },
	{ value: "general_medicine", label: "General Medicine" },
	{ value: "cardiology", label: "Cardiology" },
	{ value: "orthopedics", label: "Orthopedics" },
	{ value: "neurology", label: "Neurology" },
	{ value: "pediatrics", label: "Pediatrics" },
	{ value: "gynecology", label: "Gynecology & Obstetrics" },
	{ value: "ent", label: "ENT" },
	{ value: "dermatology", label: "Dermatology" },
	{ value: "urology", label: "Urology" },
	{ value: "icu_trauma", label: "ICU & Trauma" },
	{ value: "physiotherapy", label: "Physiotherapy" },
	{ value: "other", label: "Other" },
];

const inputStyle = {
	borderColor: "#d5e3f5",
	color: "#1a2340",
	background: "#f4f8ff",
};

export default function Home() {
	return (
		<div style={{ background: "#f4f8ff" }}>
			<HeroSection />
			<HighlightsBar />
			<SpecialtiesPreview />
			<WhyChooseUs />
			<FacilitiesShowcase />
			<VideoReviews />
			<Testimonials />
			<CTASection />
			
		</div>
	);
}

function HeroSection() {
	return (
		<section
			className="relative overflow-hidden"
			style={{
				minHeight: "100vh",
				fontFamily: "'Segoe UI', system-ui, sans-serif",
			}}
		>
			<style>{`
				@keyframes heroFloatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
				@keyframes heroParticle { 0%,100%{transform:translateY(0) translateX(0);opacity:.8} 50%{transform:translateY(-20px) translateX(10px);opacity:.3} }
				@keyframes heroPulseRing { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.8);opacity:0} }
				@keyframes heroLineSlide { from{width:0;opacity:0} to{width:52px;opacity:1} }
				@keyframes heroFadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
				@keyframes heroFadeRight { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
				.h-anim-1{animation:heroFadeUp .8s cubic-bezier(0.16, 1, 0.3, 1) .10s both}
				.h-anim-2{animation:heroFadeUp .8s cubic-bezier(0.16, 1, 0.3, 1) .20s both}
				.h-anim-3{animation:heroFadeUp .8s cubic-bezier(0.16, 1, 0.3, 1) .30s both}
				.h-anim-4{animation:heroFadeUp .8s cubic-bezier(0.16, 1, 0.3, 1) .40s both}
				.h-anim-5{animation:heroFadeUp .8s cubic-bezier(0.16, 1, 0.3, 1) .50s both}
				.h-anim-r{animation:heroFadeRight .9s cubic-bezier(0.16, 1, 0.3, 1) .30s both}
				.h-line{animation:heroLineSlide 1s cubic-bezier(0.16, 1, 0.3, 1) .15s both}
				.h-pulse::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1.5px solid rgba(224,92,26,0.6);animation:heroPulseRing 2s infinite}
				.h-live::after{content:'';position:absolute;inset:-3px;border-radius:50%;border:1.5px solid rgba(16,185,129,0.5);animation:heroPulseRing 1.8s infinite}
				.h-irow{transition:background .2s}
				.h-irow:hover{background:rgba(255,255,255,0.13) !important}
				.h-btnp:hover{background:#c84d14 !important;transform:translateY(-3px);box-shadow:0 10px 20px rgba(224,92,26,0.3)}
				.h-btno:hover{background:rgba(255,255,255,0.15) !important;border-color:rgba(255,255,255,0.5) !important;transform:translateY(-3px)}
			`}</style>

			{/* FIX: background-position center center so image is fully visible on all screens */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url(${hospital})`,
					backgroundPosition: "center 30%",
					backgroundSize: "cover",
				}}
			/>

			{/* FIX: stronger overlay on mobile (left heavy) so text is readable over the full image */}
			<div
				className="absolute inset-0"
				style={{
					background: `linear-gradient(180deg, rgba(10,24,60,0.75) 0%, rgba(10,24,60,0.60) 50%, rgba(10,24,60,0.90) 100%)`,
				}}
			/>
			{/* Desktop side-gradient on top */}
			<div
				className="absolute inset-0 hidden lg:block"
				style={{
					background: `linear-gradient(90deg, rgba(10,24,60,0.95) 0%, rgba(10,24,60,0.80) 45%, rgba(10,24,60,0.3) 70%, rgba(10,24,60,0.15) 100%)`,
				}}
			/>

			<div
				className="absolute inset-0 pointer-events-none"
				style={{
					backgroundImage:
						"radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
					backgroundSize: "26px 26px",
				}}
			/>

			{/* Decorative rings — hidden on mobile to reduce clutter */}
			<div
				className="hidden lg:block absolute pointer-events-none"
				style={{
					width: 480,
					height: 480,
					borderRadius: "50%",
					border: "1px solid rgba(26,111,196,0.2)",
					top: -130,
					right: -80,
					animation: "heroFloatY 9s ease-in-out infinite",
				}}
			/>
			<div
				className="hidden lg:block absolute pointer-events-none"
				style={{
					width: 300,
					height: 300,
					borderRadius: "50%",
					border: "1px solid rgba(224,92,26,0.15)",
					top: 60,
					right: 80,
					animation: "heroFloatY 7s ease-in-out infinite 1.2s",
				}}
			/>
			<div
				className="hidden lg:block absolute pointer-events-none"
				style={{
					width: 160,
					height: 160,
					borderRadius: "50%",
					border: "1px solid rgba(26,111,196,0.12)",
					top: 140,
					right: 260,
					animation: "heroFloatY 6s ease-in-out infinite 2.4s",
				}}
			/>

			{[
				{ top: "18%", left: "12%", delay: "0s", color: "rgba(26,111,196,0.5)" },
				{ top: "40%", left: "8%", delay: "1s", color: "rgba(224,92,26,0.5)" },
				{
					top: "70%",
					left: "20%",
					delay: "2s",
					color: "rgba(26,111,196,0.45)",
				},
				{
					top: "25%",
					left: "38%",
					delay: "0.5s",
					color: "rgba(224,92,26,0.4)",
				},
			].map((p, i) => (
				<div
					key={i}
					className="absolute pointer-events-none"
					style={{
						top: p.top,
						left: p.left,
						width: 4,
						height: 4,
						borderRadius: "50%",
						background: p.color,
						animation: `heroParticle 6s ease-in-out infinite ${p.delay}`,
					}}
				/>
			))}

			{/* FIX: py-20 on mobile gives room above/below; lg:flex-row side by side on desktop */}
			<div className="relative z-10 flex items-center min-h-[100vh] px-4 sm:px-6 lg:px-12 py-20 lg:py-24">
				<div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-10 items-center justify-between">
					{/* Left: Text content */}
					<div className="flex-1 min-w-0 w-full">
						<div className="flex items-center gap-3 mb-4 h-anim-1">
							<div
								className="h-line rounded-full"
								style={{ height: 2, background: "#1a6fc4", width: 52 }}
							/>
							<span
								style={{
									fontSize: 10,
									fontWeight: 700,
									letterSpacing: ".22em",
									color: "#7db8e8",
									textTransform: "uppercase",
								}}
							>
								Swasthyam Super Speciality Hospital · Bengaluru
							</span>
						</div>
						<div
							className="inline-flex items-center gap-2 mb-5 h-anim-1"
							style={{
								background: "rgba(224,92,26,0.18)",
								border: "1px solid rgba(224,92,26,0.35)",
								borderRadius: 30,
								padding: "5px 16px",
							}}
						>
							<div
								className="h-pulse relative"
								style={{
									width: 7,
									height: 7,
									borderRadius: "50%",
									background: "#e05c1a",
								}}
							/>
							<span
								style={{
									fontSize: 10,
									fontWeight: 700,
									letterSpacing: ".14em",
									color: "#f0997b",
									textTransform: "uppercase",
								}}
							>
								Premium Healthcare Excellence
							</span>
						</div>

						<h1
							className="h-anim-2"
							style={{
								fontSize: "clamp(32px,5vw,52px)",
								fontWeight: 800,
								color: "#fff",
								lineHeight: 1.08,
								letterSpacing: "-.025em",
								marginBottom: 18,
							}}
						>
							Advanced Care.
							<br />
							<span style={{ color: "#e05c1a" }}>Trusted Healing.</span>
						</h1>

						<p
							className="h-anim-3"
							style={{
								fontSize: 15,
								color: "rgba(255,255,255,0.72)",
								lineHeight: 1.72,
								maxWidth: 420,
								marginBottom: 28,
							}}
						>
							World-class medical expertise in the heart of Muddinpalya.
							Specialty-led teams delivering compassionate care with
							cutting-edge technology.
						</p>

						<div className="flex gap-3 flex-wrap mb-8 h-anim-4">
							<Link
								to="/contact"
								className="h-btnp flex items-center gap-2"
								style={{
									background: "#e05c1a",
									color: "#fff",
									borderRadius: 9,
									padding: "13px 22px",
									fontSize: 12,
									fontWeight: 700,
									letterSpacing: ".07em",
									textTransform: "uppercase",
									textDecoration: "none",
									transition: "background .2s, transform .2s",
								}}
							>
								<CalendarDays className="w-4 h-4" /> Book Appointment
							</Link>
							<a
								href="tel:9008608842"
								className="h-btno flex items-center gap-2"
								style={{
									background: "rgba(255,255,255,0.07)",
									color: "#fff",
									border: "1px solid rgba(255,255,255,0.22)",
									borderRadius: 9,
									padding: "12px 20px",
									fontSize: 12,
									fontWeight: 700,
									letterSpacing: ".07em",
									textTransform: "uppercase",
									textDecoration: "none",
									transition: "background .2s, border-color .2s, transform .2s",
								}}
							>
								<Phone className="w-4 h-4" /> Emergency 24/7
							</a>
						</div>

						{/* Stats — 2x2 on mobile, 4 cols on sm+ */}
						<div
							className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 h-anim-5"
							style={{
								borderTop: "1px solid rgba(255,255,255,0.1)",
								paddingTop: 24,
							}}
						>
							{[
								{ val: "30+", label: "Expert Doctors" },
								{ val: "10K+", label: "Patients Served" },
								{ val: "24/7", label: "Emergency ICU" },
								{ val: "100%", label: "Transparency" },
							].map((s, i) => (
								<div key={i} style={{ paddingRight: 12 }}>
									<div
										style={{
											fontSize: 26,
											fontWeight: 800,
											color: "#fff",
											letterSpacing: "-.02em",
											lineHeight: 1,
										}}
									>
										{s.val}
									</div>
									<div
										style={{
											fontSize: 10,
											color: "rgba(255,255,255,0.42)",
											textTransform: "uppercase",
											letterSpacing: ".13em",
											marginTop: 3,
										}}
									>
										{s.label}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right: Booking form — full width on mobile, constrained on desktop */}
					<div className="h-anim-r w-full lg:flex-shrink-0 lg:w-[380px]">
						<HeroBookingForm dark />
					</div>
				</div>
			</div>
		</section>
	);
}

function HeroBookingForm()  {
	const [form, setForm] = useState({
		name: "",
		phone: "",
		email: "",
		department: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const validate = () => {
		const errs = {};
		if (!form.name.trim()) errs.name = "Name is required";
		else if (form.name.trim().length < 2)
			errs.name = "Name must be at least 2 characters";
		else if (!/^[a-zA-Z\s.'-]+$/.test(form.name.trim()))
			errs.name = "Only letters, spaces, dots, hyphens allowed";
		const phoneDigits = form.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
		if (!form.phone.trim()) errs.phone = "Phone number is required";
		else if (!/^\d{10}$/.test(phoneDigits))
			errs.phone = "Enter a valid 10-digit number";
		if (
			form.email.trim() &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
		)
			errs.email = "Enter a valid email address";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (!validate()) return;
		const phoneClean = form.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
		setLoading(true);
		const { error } = await supabase.from("contactdetails").insert([
			{
				full_name: form.name.trim(),
				phone_number: phoneClean,
				department: form.department || "General Inquiry",
				date: new Date().toISOString(),
				message: "Quick booking from homepage",
				status: "new",
			},
		]);
		setLoading(false);
		if (error) {
			console.error("Supabase insert error:", error);
			alert("Failed to submit: " + error.message);
		} else {
			setSuccess(true);
			setForm({ name: "", phone: "", email: "", department: "" });
			setErrors({});
			setSubmitted(false);
			setTimeout(() => setSuccess(false), 4000);
		}
	};

	const fi = {
		width: "100%",
		background: "rgba(255,255,255,0.06)",
		border: "1px solid rgba(255,255,255,0.15)",
		borderRadius: 12,
		padding: "14px 16px",
		fontSize: 14,
		color: "#fff",
		marginBottom: 4,
		outline: "none",
		fontFamily: "inherit",
		boxSizing: "border-box",
		transition: "all 0.3s ease",
	};

	return (
		<form
			onSubmit={handleSubmit}
			noValidate
			className="backdrop-blur-xl transition-all duration-300 hover:shadow-2xl"
			style={{
				background: "rgba(10, 24, 60, 0.72)",
				border: "1px solid rgba(224, 92, 26, 0.4)",
				boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
				borderRadius: 20,
				padding: "28px 20px",
			}}
		>
			<div
				style={{
					fontSize: 20,
					fontWeight: 800,
					color: "#fff",
					marginBottom: 4,
					letterSpacing: "0.5px",
				}}
			>
				Quick Booking
			</div>
			<div
				style={{
					fontSize: 13,
					color: "#7db8e8",
					marginBottom: 20,
					fontWeight: 500,
				}}
			>
				Schedule your visit in seconds
			</div>
			{success && (
				<div
					style={{
						background: "rgba(16,185,129,0.15)",
						border: "1px solid rgba(16,185,129,0.3)",
						borderRadius: 8,
						padding: "10px 12px",
						fontSize: 12,
						color: "#6ee7b7",
						marginBottom: 12,
						textAlign: "center",
					}}
				>
					✓ Booking submitted! We'll contact you shortly.
				</div>
			)}
			<input
				type="text"
				value={form.name}
				onChange={(e) => setForm({ ...form, name: e.target.value })}
				placeholder="Patient name *"
				style={{
					...fi,
					borderColor:
						submitted && errors.name ? "#ef4444" : "rgba(255,255,255,0.15)",
				}}
			/>
			{submitted && errors.name && (
				<div style={{ fontSize: 10, color: "#f87171", marginBottom: 6 }}>
					{errors.name}
				</div>
			)}

			<input
				type="tel"
				value={form.phone}
				onChange={(e) => setForm({ ...form, phone: e.target.value })}
				placeholder="Phone number *"
				style={{
					...fi,
					borderColor:
						submitted && errors.phone ? "#ef4444" : "rgba(255,255,255,0.15)",
					marginTop: 8,
				}}
			/>
			{submitted && errors.phone && (
				<div style={{ fontSize: 10, color: "#f87171", marginBottom: 6 }}>
					{errors.phone}
				</div>
			)}

			<input
				type="email"
				value={form.email}
				onChange={(e) => setForm({ ...form, email: e.target.value })}
				placeholder="Email (optional)"
				style={{
					...fi,
					borderColor:
						submitted && errors.email ? "#ef4444" : "rgba(255,255,255,0.15)",
					marginTop: 8,
				}}
			/>
			{submitted && errors.email && (
				<div style={{ fontSize: 10, color: "#f87171", marginBottom: 6 }}>
					{errors.email}
				</div>
			)}

			<select
				value={form.department}
				onChange={(e) => setForm({ ...form, department: e.target.value })}
				style={{
					...fi,
					color: "rgba(255,255,255,0.7)",
					appearance: "none",
					marginTop: 8,
					marginBottom: 12,
				}}
			>
				{DEPARTMENT_OPTIONS.map((opt) => (
					<option
						key={opt.value}
						value={opt.value}
						style={{ background: "#0d1b3e", color: "#fff" }}
					>
						{opt.label}
					</option>
				))}
			</select>

			<button
				type="submit"
				disabled={loading}
				style={{
					width: "100%",
					background: loading ? "#9a3d10" : "#e05c1a",
					color: "#fff",
					border: "none",
					borderRadius: 8,
					padding: 12,
					fontSize: 12,
					fontWeight: 700,
					letterSpacing: ".07em",
					textTransform: "uppercase",
					cursor: loading ? "not-allowed" : "pointer",
					fontFamily: "inherit",
					transition: "background .2s",
				}}
			>
				{loading ? "Submitting..." : "Book Appointment"}
			</button>
			<div
				style={{
					textAlign: "center",
					marginTop: 12,
					fontSize: 10,
					color: "rgba(255,255,255,0.35)",
					letterSpacing: ".05em",
				}}
			>
				Need help? Call{" "}
				<span style={{ color: "#e05c1a", fontWeight: 700 }}>9008608842</span>
			</div>
		</form>
	);
}

function HighlightsBar() {
	return (
		<section style={{ background: "#1a6fc4" }}>
			{/* FIX: divide-x doesn't work on 2-col grid on mobile — removed divide, use gap instead */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
				{[
					[Clock, "Open 24/7", "Emergency & ICU always ready"],
					[ShieldCheck, "Certified Doctors", "30+ expert specialists"],
					[ActivitySquare, "Advanced Tech", "State-of-the-art equipment"],
					[Users, "10,000+ Patients", "Trusted by families across Bangalore"],
				].map(([Icon, title, sub], i) => (
					<div
						key={i}
						className="px-2 animate-fade-up"
						style={{ animationDelay: `${i * 0.1}s` }}
					>
						<Icon
							className="w-7 h-7 sm:w-8 sm:h-8 text-white/80 mx-auto mb-2"
							strokeWidth={1.5}
						/>
						<p className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
							{title}
						</p>
						<p className="text-white/70 text-[11px] sm:text-xs mt-1 leading-tight">
							{sub}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}

function SpecialtiesPreview() {
	const ref = useScrollReveal();
	const specialties = [
		{
			name: "General Medicine",
			desc: "Diagnosis and treatment of adult diseases and preventive care.",
			icon: Stethoscope,
			color: "#10b981",
			bg: "rgba(16,185,129,0.08)",
			image: generalMedicineImg,
		},
		{
			name: "ICU & Trauma",
			desc: "24/7 access to trauma experts and intensive care specialists.",
			icon: AlertCircle,
			color: "#ef4444",
			bg: "rgba(239,68,68,0.08)",
			image: icuEmergencyImg,
		},
		{
			name: "Gynecology & Obstetrics",
			desc: "Complete women's healthcare and high-risk pregnancy management.",
			icon: Users,
			color: "#8b5cf6",
			bg: "rgba(139,92,246,0.08)",
			image: gynaecologyImg,
		},
		{
			name: "Orthopedics",
			desc: "Comprehensive care for bones, joints, and spine injuries.",
			icon: Bone,
			color: "#f97316",
			bg: "rgba(249,115,22,0.08)",
			image: orthopedicsImg,
		},
	];
	return (
		<section
			className="py-16 sm:py-24 relative overflow-hidden"
			style={{ background: "#f4f8ff" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="text-center mb-10 sm:mb-16" ref={ref}>
					<p
						className="text-[12px] uppercase tracking-widest font-semibold mb-3"
						style={{ color: "#e05c1a" }}
					>
						What We Treat
					</p>
					<h2
						className="text-3xl md:text-5xl font-bold mb-4"
						style={{ color: "#1a2340" }}
					>
						Our <span style={{ color: "#e05c1a" }}>Specialties</span>
					</h2>
					<p
						className="text-base sm:text-lg max-w-2xl mx-auto"
						style={{ color: "#4a5a7a" }}
					>
						Comprehensive care across multiple disciplines, all under one roof.
					</p>
				</div>
				{/* FIX: grid-cols-2 on mobile with reduced gap, full 4 cols on md+ */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
					{specialties.map((spec, i) => (
						<Link
							to="/specialties"
							key={i}
							className="card-lift rounded-2xl overflow-hidden flex flex-col items-center text-center group animate-fade-up"
							style={{
								background: "#ffffff",
								border: "1px solid #e0ecf8",
								boxShadow: "0 2px 12px rgba(26,111,196,0.06)",
								animationDelay: `${i * 0.1}s`,
							}}
						>
							{/* FIX: shorter image on mobile */}
							<div className="w-full h-24 sm:h-36 overflow-hidden">
								<img
									src={spec.image}
									alt={spec.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
							</div>
							<div className="p-3 sm:p-5 flex flex-col items-center">
								<div
									className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 transition-transform group-hover:scale-110 -mt-6 sm:-mt-8 relative z-10 border-2 border-white shadow-md"
									style={{ background: spec.bg }}
								>
									<spec.icon
										className="w-4 h-4 sm:w-5 sm:h-5"
										style={{ color: spec.color }}
										strokeWidth={1.5}
									/>
								</div>
								<h3
									className="font-bold text-[11px] sm:text-sm uppercase tracking-wide mb-1 sm:mb-2"
									style={{ color: "#1a2340" }}
								>
									{spec.name}
								</h3>
								{/* FIX: hide description on mobile to keep cards compact */}
								<p
									className="hidden sm:block text-xs leading-relaxed"
									style={{ color: "#6a7a99" }}
								>
									{spec.desc}
								</p>
							</div>
						</Link>
					))}
				</div>
				<div className="mt-8 sm:mt-12 text-center">
					<Link
						to="/specialties"
						className="btn-secondary inline-flex items-center gap-2"
					>
						View All Specialties <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}

function WhyChooseUs() {
	return (
		<section
			className="py-16 sm:py-24 relative overflow-hidden"
			style={{ background: "#eaf1fb" }}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
				<div className="relative animate-fade-left">
					<div
						className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
						style={{
							background:
								"radial-gradient(circle, #1a6fc4 0%, transparent 70%)",
						}}
					/>
					<img
						src={swasthyamimg}
						alt="Excellent Care"
						className="rounded-2xl relative z-10 w-full"
						style={{
							boxShadow: "0 20px 60px rgba(26,111,196,0.18)",
							border: "1px solid #d5e3f5",
						}}
					/>
					<div
						className="absolute -bottom-6 -right-2 sm:-right-6 z-20 rounded-xl p-4 sm:p-5 hidden md:block animate-float"
						style={{
							background: "#ffffff",
							border: "1px solid #d5e3f5",
							boxShadow: "0 10px 30px rgba(26,111,196,0.12)",
						}}
					>
						<div className="flex gap-1 mb-2" style={{ color: "#f59e0b" }}>
							{[...Array(5)].map((_, i) => (
								<Star key={i} className="w-4 h-4 fill-current" />
							))}
						</div>
						<p
							className="font-bold text-sm leading-tight"
							style={{ color: "#1a2340" }}
						>
							Best Hospital in Muddinpalya
						</p>
					</div>
				</div>
				<div className="animate-fade-right">
					<p
						className="text-[12px] uppercase tracking-widest font-semibold mb-3"
						style={{ color: "#e05c1a" }}
					>
						Our Legacy
					</p>
					<h2
						className="text-3xl md:text-4xl font-bold mb-5 sm:mb-6"
						style={{ color: "#1a2340" }}
					>
						Why Choose <span style={{ color: "#1a6fc4" }}>Swasthyam?</span>
					</h2>
					<p
						className="text-base sm:text-lg mb-8 sm:mb-10 leading-relaxed"
						style={{ color: "#4a5a7a" }}
					>
						We bring together specialized doctors, advanced technology, and a
						healing environment to provide you with the best possible care.
					</p>
					<div className="space-y-4 sm:space-y-5">
						{[
							{
								title: "Patient-Centric Approach",
								desc: "Every treatment plan is tailored to the individual's specific health needs and situation.",
							},
							{
								title: "Highly Experienced Doctors",
								desc: "Our specialists have decades of experience from top institutions across India.",
							},
							{
								title: "Transparent Pricing",
								desc: "Ethical medical practice with no hidden costs across all our services and procedures.",
							},
						].map((item, i) => (
							<div
								key={i}
								className="flex items-start gap-3 sm:gap-4 p-4 rounded-xl transition-all group card-lift animate-fade-up"
								style={{
									background: "#ffffff",
									border: "1px solid #e0ecf8",
									animationDelay: `${i * 0.15}s`,
								}}
							>
								<div
									className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
									style={{ background: "rgba(26,111,196,0.08)" }}
								>
									<CheckCircle2
										className="w-4 h-4 sm:w-5 sm:h-5"
										style={{ color: "#1a6fc4" }}
									/>
								</div>
								<div>
									<h4
										className="font-bold text-sm sm:text-base mb-1"
										style={{ color: "#1a2340" }}
									>
										{item.title}
									</h4>
									<p
										className="text-xs sm:text-sm leading-relaxed"
										style={{ color: "#6a7a99" }}
									>
										{item.desc}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

function FacilitiesShowcase() {
	return (
		<section className="py-16 sm:py-24" style={{ background: "#f4f8ff" }}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div className="text-center mb-10 sm:mb-16">
					<p
						className="text-[12px] uppercase tracking-widest font-semibold mb-3"
						style={{ color: "#e05c1a" }}
					>
						World Class
					</p>
					<h2
						className="text-3xl md:text-5xl font-bold mb-4"
						style={{ color: "#1a2340" }}
					>
						Our <span style={{ color: "#1a6fc4" }}>Facilities</span>
					</h2>
					<p
						className="text-base sm:text-lg max-w-2xl mx-auto"
						style={{ color: "#4a5a7a" }}
					>
						State-of-the-art infrastructure built to deliver the highest
						standards of healthcare.
					</p>
				</div>
				{/* FIX: 2 cols on mobile, 4 on lg */}
				<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
					{[
						{
							title: "Modern ICU",
							sub: "Multi-disciplinary intensive care",
							color: "#ef4444",
							bg: "rgba(239,68,68,0.07)",
							Icon: Activity,
						},
						{
							title: "Operation Theatres",
							sub: "Ultra-clean modular OTs",
							color: "#1a6fc4",
							bg: "rgba(26,111,196,0.07)",
							Icon: Zap,
						},
						{
							title: "24/7 Diagnostics",
							sub: "MRI, CT, X-Ray, Pathology",
							color: "#8b5cf6",
							bg: "rgba(139,92,246,0.07)",
							Icon: TestTube,
						},
						{
							title: "Modern Equipment",
							sub: "Best in class technology",
							color: "#10b981",
							bg: "rgba(16,185,129,0.07)",
							Icon: Settings,
						},
					].map((f, i) => (
						<div
							key={i}
							className="card-lift rounded-2xl p-5 sm:p-6 text-center animate-fade-up"
							style={{
								background: "#ffffff",
								border: "1px solid #e0ecf8",
								animationDelay: `${i * 0.1}s`,
							}}
						>
							<div
								className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center"
								style={{ background: f.bg }}
							>
								<f.Icon
									className="w-5 h-5 sm:w-6 sm:h-6"
									style={{ color: f.color }}
									strokeWidth={1.5}
								/>
							</div>
							<h4
								className="font-bold text-sm mb-1"
								style={{ color: "#1a2340" }}
							>
								{f.title}
							</h4>
							<p className="text-xs sm:text-sm" style={{ color: "#6a7a99" }}>
								{f.sub}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function VideoReviews() {
	const [activeVideo, setActiveVideo] = useState(null);
	const [current, setCurrent] = useState(0);
	const videoRefs = useRef([]);

	const videos = [
		{ src: review1 },
		{ src: review2 },
		{ src: review3 },
		{ src: review4 },
	];

	const pauseAll = () => {
		videoRefs.current.forEach((ref) => {
			if (ref) {
				ref.pause();
				ref.currentTime = 0;
			}
		});
		setActiveVideo(null);
	};

	const handlePlay = (i) => {
		pauseAll();
		setActiveVideo(i);
		setTimeout(() => videoRefs.current[i]?.play(), 50);
	};
	const goTo = (idx) => {
		pauseAll();
		setCurrent(idx);
	};
	const prev = () => goTo((current - 1 + videos.length) % videos.length);
	const next = () => goTo((current + 1) % videos.length);

	// FIX: on mobile show 1 card, on md show 3
	const visibleIndices = [
		current % videos.length,
		(current + 1) % videos.length,
		(current + 2) % videos.length,
	];

	return (
		<section
			className="py-16 sm:py-20 relative overflow-hidden"
			style={{ background: "#0d1b3e" }}
		>
			<style>{`
				.vr-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
				.vr-card:hover { transform: translateY(-4px); }
				.vr-nav-btn { transition: background .2s, transform .2s; }
				.vr-nav-btn:hover { background: rgba(224,92,26,0.9) !important; transform: scale(1.08); }
				.vr-dot { transition: all .3s; cursor: pointer; }
			`}</style>
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
					backgroundSize: "28px 28px",
				}}
			/>
			<div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
				<div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
					<div>
						<p
							className="text-[12px] uppercase tracking-widest font-semibold mb-3"
							style={{ color: "#e05c1a" }}
						>
							Real Experiences
						</p>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
							Video <span style={{ color: "#7db8e8" }}>Reviews</span>
						</h2>
						<p className="text-sm mt-2 max-w-md" style={{ color: "#8a9ab8" }}>
							Watch our patients share their recovery journeys.
						</p>
					</div>
					<div className="flex gap-3 flex-shrink-0">
						<button
							onClick={prev}
							className="vr-nav-btn flex items-center justify-center rounded-xl"
							style={{
								width: 44,
								height: 44,
								background: "rgba(255,255,255,0.08)",
								border: "1px solid rgba(255,255,255,0.15)",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							<ChevronLeft className="w-5 h-5" />
						</button>
						<button
							onClick={next}
							className="vr-nav-btn flex items-center justify-center rounded-xl"
							style={{
								width: 44,
								height: 44,
								background: "#e05c1a",
								border: "none",
								color: "#fff",
								cursor: "pointer",
							}}
						>
							<ChevronRight className="w-5 h-5" />
						</button>
					</div>
				</div>

				{/* FIX: 1 col on mobile, 3 cols on md */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
					{visibleIndices.map((vi, slot) => {
						const v = videos[vi];
						const isActive = activeVideo === vi;
						const isFocused = slot === 0;
						// FIX: on mobile, only render the first card (current); hide slot 1 & 2
						const hiddenOnMobile = slot > 0 ? "hidden md:block" : "";
						return (
							<div
								key={`${vi}-${slot}`}
								className={`vr-card rounded-2xl overflow-hidden ${hiddenOnMobile}`}
								style={{
									background: "#000",
									border: isFocused
										? "1.5px solid rgba(224,92,26,0.6)"
										: "1px solid rgba(255,255,255,0.1)",
									boxShadow: isFocused
										? "0 0 0 3px rgba(224,92,26,0.1), 0 16px 36px rgba(0,0,0,0.4)"
										: "0 6px 20px rgba(0,0,0,0.2)",
								}}
							>
								<div
									className="relative w-full"
									style={{ paddingBottom: "72%" }}
								>
									<video
										ref={(el) => (videoRefs.current[vi] = el)}
										src={v.src}
										onPause={() => setActiveVideo(null)}
										onEnded={() => setActiveVideo(null)}
										controls={isActive}
										playsInline
										className="absolute inset-0 w-full h-full object-cover"
									/>
									{!isActive && (
										<>
											<div
												className="absolute inset-0"
												style={{
													background:
														"linear-gradient(to top, rgba(10,24,60,0.75) 0%, transparent 60%)",
												}}
											/>
											<button
												onClick={() => handlePlay(vi)}
												className="absolute inset-0 flex items-center justify-center"
												style={{
													background: "transparent",
													border: "none",
													cursor: "pointer",
												}}
											>
												<div
													className="flex items-center justify-center transition-all duration-300 hover:scale-110"
													style={{
														width: 52,
														height: 52,
														borderRadius: "50%",
														background: "#e05c1a",
														boxShadow:
															"0 0 0 10px rgba(224,92,26,0.18), 0 6px 20px rgba(224,92,26,0.45)",
													}}
												>
													<Play
														className="w-5 h-5 text-white"
														fill="white"
														style={{ marginLeft: 3 }}
													/>
												</div>
											</button>
										</>
									)}
								</div>
								<div
									className="flex items-center justify-center gap-1 py-3"
									style={{ background: "rgba(255,255,255,0.04)" }}
								>
									{[...Array(5)].map((_, j) => (
										<Star
											key={j}
											className="w-4 h-4 fill-current"
											style={{ color: "#f59e0b" }}
										/>
									))}
								</div>
							</div>
						);
					})}
				</div>

				<div className="flex justify-center gap-2 mt-5 sm:mt-6">
					{videos.map((_, i) => (
						<button
							key={i}
							onClick={() => goTo(i)}
							className="vr-dot rounded-full"
							style={{
								width: i === current ? 24 : 8,
								height: 8,
								background: i === current ? "#e05c1a" : "rgba(255,255,255,0.2)",
								border: "none",
								cursor: "pointer",
								padding: 0,
							}}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function Testimonials() {
	const reviews = [
		{
			name: "Sahana Kantharaju",
			init: "S",
			text: "Dr. Nirajan Murthy truly understands his patients — he focuses on diagnosing the root cause rather than just treating symptoms. His treatment is so effective that you feel relief very early, and the need for frequent follow-up visits is minimal. Highly recommended.",
		},
		{
			name: "Indira Priyadharsini",
			init: "I",
			text: "Decent hospital with a caring and professional team. Special thanks to Dr. Shwetha and nurses Ms. Divya and Ms. Sumathi for the exceptional care and support they provided throughout our stay. We felt looked after every step of the way.",
		},
		{
			name: "Sreenatha Setty Balaganoor",
			init: "S",
			text: "Took treatment recently for my family member and had a positive experience overall. The doctors and staff coordinate seamlessly, and the facilities are well-maintained. It's reassuring to find a hospital where the entire team works together so efficiently.",
		},
	];
	return (
		<section
			className="py-16 sm:py-24 relative overflow-hidden"
			style={{ background: "#1a2340" }}
		>
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
					backgroundSize: "30px 30px",
				}}
			/>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
				<div className="text-center mb-10 sm:mb-16">
					<p
						className="text-[12px] uppercase tracking-widest font-semibold mb-3"
						style={{ color: "#e05c1a" }}
					>
						Voices of Trust
					</p>
					<h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
						Patient <span style={{ color: "#7db8e8" }}>Stories</span>
					</h2>
					<p
						className="text-base sm:text-lg max-w-2xl mx-auto"
						style={{ color: "#8a9ab8" }}
					>
						Hear what our patients have to say about their experience at
						Swasthyam.
					</p>
				</div>
				{/* FIX: 1 col on mobile, 3 on md */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
					{reviews.map((p, i) => (
						<div
							key={i}
							className="rounded-2xl p-6 sm:p-8 card-lift animate-fade-up"
							style={{
								background: "rgba(255,255,255,0.06)",
								border: "1px solid rgba(255,255,255,0.1)",
								animationDelay: `${i * 0.15}s`,
							}}
						>
							<div
								className="flex gap-1 mb-5 sm:mb-6"
								style={{ color: "#f59e0b" }}
							>
								{[...Array(5)].map((_, j) => (
									<Star key={j} className="w-4 h-4 fill-current" />
								))}
							</div>
							<p
								className="italic mb-6 sm:mb-8 leading-relaxed text-sm"
								style={{ color: "rgba(255,255,255,0.7)" }}
							>
								"{p.text}"
							</p>
							<div className="flex items-center gap-3 sm:gap-4">
								<div
									className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg"
									style={{
										background: "rgba(26,111,196,0.3)",
										color: "#7db8e8",
									}}
								>
									{p.init}
								</div>
								<div>
									<h4 className="text-white font-bold text-[11px] sm:text-[12px] uppercase tracking-widest">
										{p.name}
									</h4>
									<p
										className="text-[10px] uppercase tracking-widest mt-1"
										style={{ color: "rgba(255,255,255,0.4)" }}
									>
										Verified Patient
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section className="py-16 sm:py-24" style={{ background: "#f4f8ff" }}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6">
				<div
					className="rounded-3xl p-6 sm:p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-12 relative overflow-hidden"
					style={{
						background: "linear-gradient(135deg, #1a6fc4, #0e4a8a)",
						boxShadow: "0 20px 60px rgba(26,111,196,0.3)",
					}}
				>
					<div
						className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10"
						style={{
							background:
								"radial-gradient(circle, #ffffff 0%, transparent 70%)",
							transform: "translate(30%, -30%)",
						}}
					/>
					<div className="w-full md:w-1/2 relative z-10">
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
							Need Immediate Assistance?
						</h2>
						<p
							className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
							style={{ color: "rgba(255,255,255,0.8)" }}
						>
							Our expert medical team is available 24/7. Request a callback or
							walk into our emergency department.
						</p>
						<div className="space-y-3 sm:space-y-4">
							{[
								[PhoneCall, "Emergency Helpline", "9008608842"],
								[MapPin, "Visit Us At", "Muddinpalya, Bangalore"],
							].map(([Icon, label, val], i) => (
								<div
									key={i}
									className="flex items-center gap-3 sm:gap-4 text-white"
								>
									<div
										className="p-2.5 sm:p-3 rounded-xl"
										style={{ background: "rgba(255,255,255,0.15)" }}
									>
										<Icon
											className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-200"
											strokeWidth={1.5}
										/>
									</div>
									<div>
										<p className="text-[10px] uppercase tracking-widest text-yellow-200">
											{label}
										</p>
										<p className="text-lg sm:text-xl font-bold">{val}</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<CTACallbackForm />
				</div>
			</div>
		</section>
	);
}

function CTACallbackForm() {
	const [form, setForm] = useState({
		name: "",
		phone: "",
		email: "",
		department: "",
	});
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const validate = () => {
		const errs = {};
		if (!form.name.trim()) errs.name = "Name is required";
		else if (form.name.trim().length < 2)
			errs.name = "Name must be at least 2 characters";
		else if (!/^[a-zA-Z\s.'-]+$/.test(form.name.trim()))
			errs.name = "Only letters, spaces, dots, hyphens allowed";
		const phoneDigits = form.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
		if (!form.phone.trim()) errs.phone = "Phone number is required";
		else if (!/^\d{10}$/.test(phoneDigits))
			errs.phone = "Enter a valid 10-digit number";
		if (
			form.email.trim() &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
		)
			errs.email = "Enter a valid email address";
		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		if (!validate()) return;
		const phoneClean = form.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
		setLoading(true);
		const { error } = await supabase.from("contactdetails").insert([
			{
				full_name: form.name.trim(),
				phone_number: phoneClean,
				department: form.department || "Callback Request",
				date: new Date().toISOString(),
				message: "Callback request from homepage",
				status: "new",
			},
		]);
		setLoading(false);
		if (error) {
			console.error("Supabase insert error:", error);
			alert("Failed to submit: " + error.message);
		} else {
			setSuccess(true);
			setForm({ name: "", phone: "", email: "", department: "" });
			setErrors({});
			setSubmitted(false);
			setTimeout(() => setSuccess(false), 4000);
		}
	};

	return (
		<div
			className="w-full md:w-5/12 rounded-2xl p-6 sm:p-8 relative z-10"
			style={{
				background: "#ffffff",
				boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
			}}
		>
			<h3
				className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-center"
				style={{ color: "#1a2340" }}
			>
				Request Callback
			</h3>
			{success && (
				<div
					className="mb-4 p-3 rounded-lg text-sm font-medium text-center"
					style={{
						background: "rgba(16,185,129,0.1)",
						color: "#10b981",
						border: "1px solid rgba(16,185,129,0.2)",
					}}
				>
					✓ Request received! We'll call you back soon.
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				noValidate
				className="space-y-3 sm:space-y-4"
			>
				<div>
					<input
						type="text"
						value={form.name}
						onChange={(e) => setForm({ ...form, name: e.target.value })}
						placeholder="Your Name *"
						className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${submitted && errors.name ? "border-red-400" : ""}`}
						style={inputStyle}
					/>
					{submitted && errors.name && (
						<p className="text-red-500 text-xs mt-1">{errors.name}</p>
					)}
				</div>
				<div>
					<input
						type="tel"
						value={form.phone}
						onChange={(e) => setForm({ ...form, phone: e.target.value })}
						placeholder="Phone Number * (+91 9XXXXXXXXX)"
						className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${submitted && errors.phone ? "border-red-400" : ""}`}
						style={inputStyle}
					/>
					{submitted && errors.phone && (
						<p className="text-red-500 text-xs mt-1">{errors.phone}</p>
					)}
				</div>
				<div>
					<input
						type="email"
						value={form.email}
						onChange={(e) => setForm({ ...form, email: e.target.value })}
						placeholder="Email (optional)"
						className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${submitted && errors.email ? "border-red-400" : ""}`}
						style={inputStyle}
					/>
					{submitted && errors.email && (
						<p className="text-red-500 text-xs mt-1">{errors.email}</p>
					)}
				</div>
				<select
					value={form.department}
					onChange={(e) => setForm({ ...form, department: e.target.value })}
					className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all appearance-none"
					style={inputStyle}
				>
					{DEPARTMENT_OPTIONS.map((opt) => (
						<option key={opt.value} value={opt.value}>
							{opt.label}
						</option>
					))}
				</select>
				<button
					type="submit"
					disabled={loading}
					className="btn-primary w-full justify-center mt-1 sm:mt-2 text-sm py-3 sm:py-4 disabled:opacity-60"
				>
					{loading ? "Submitting..." : "Request Callback"}
				</button>
			</form>
		</div>
	);
}
