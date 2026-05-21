import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import swasthyamlogo from "../../assets/swasthyam-logo.jpg";

export default function Login() {
	const { user, loading, signIn } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);

	if (!loading && user) {
		return <Navigate to="/dashboard" replace />;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			await signIn(email, password);
		} catch (err) {
			setError(err.message || "Invalid credentials. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div
			className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
			style={{
				background: "linear-gradient(135deg, #0e1a30 0%, #1a2340 40%, #0e1a30 100%)",
			}}
		>
			{/* Decorative blobs matching site palette */}
			<div
				className="absolute top-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full opacity-[0.07]"
				style={{ background: "radial-gradient(circle, #1a6fc4 0%, transparent 70%)" }}
			></div>
			<div
				className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] rounded-full opacity-[0.07]"
				style={{ background: "radial-gradient(circle, #e05c1a 0%, transparent 70%)" }}
			></div>

			{/* Dot pattern */}
			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
					backgroundSize: "28px 28px",
				}}
			></div>

			<div className="relative z-10 w-full max-w-[420px] animate-fade-up">
				{/* Logo + Branding */}
				<div className="text-center mb-10">
					<img
						src={swasthyamlogo}
						alt="Swasthyam Super Speciality Hospital"
						className="h-20 w-auto mx-auto mb-5 rounded-xl"
						style={{
							filter: "drop-shadow(0 8px 24px rgba(26,111,196,0.25))",
						}}
					/>
					<h1
						className="text-2xl font-bold tracking-tight mb-1"
						style={{ color: "#ffffff" }}
					>
						Admin Dashboard
					</h1>
					<p
						className="text-[11px] uppercase tracking-[0.25em] font-semibold"
						style={{ color: "#e05c1a" }}
					>
						Swasthyam Super Specialty Hospital
					</p>
				</div>

				{/* Login Card */}
				<div
					className="rounded-2xl p-8 md:p-10"
					style={{
						background: "rgba(255,255,255,0.04)",
						border: "1px solid rgba(255,255,255,0.08)",
						backdropFilter: "blur(20px)",
						boxShadow: "0 24px 64px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)",
					}}
				>
					{error && (
						<div
							className="flex items-center gap-3 p-4 rounded-xl mb-6 animate-fade-in"
							style={{
								background: "rgba(239,68,68,0.1)",
								border: "1px solid rgba(239,68,68,0.25)",
							}}
						>
							<AlertCircle className="w-5 h-5 shrink-0" style={{ color: "#f87171" }} />
							<p className="text-sm" style={{ color: "#fca5a5" }}>{error}</p>
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								className="block text-[10px] uppercase tracking-[0.2em] mb-2 font-semibold"
								style={{ color: "#7db8e8" }}
							>
								Email Address
							</label>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all placeholder:text-slate-600"
								style={{
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.1)",
									color: "#ffffff",
								}}
								placeholder="admin@swasthyam.com"
							/>
						</div>

						<div>
							<label
								className="block text-[10px] uppercase tracking-[0.2em] mb-2 font-semibold"
								style={{ color: "#7db8e8" }}
							>
								Password
							</label>
							<input
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all placeholder:text-slate-600"
								style={{
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.1)",
									color: "#ffffff",
								}}
								placeholder="••••••••"
							/>
						</div>

						<button
							type="submit"
							disabled={submitting}
							className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-[13px] uppercase tracking-[0.15em] text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
							style={{
								background: submitting
									? "#4a5a7a"
									: "linear-gradient(135deg, #e05c1a 0%, #c44e12 100%)",
								boxShadow: submitting
									? "none"
									: "0 8px 28px rgba(224,92,26,0.4)",
							}}
						>
							{submitting ? (
								<>
									<div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
									Signing in...
								</>
							) : (
								<>
									<LogIn className="w-5 h-5" />
									Sign In
								</>
							)}
						</button>
					</form>

					{/* Divider */}
					<div
						className="mt-8 pt-6 text-center"
						style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
					>
						<p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: "#4a5a7a" }}>
							Authorized personnel only
						</p>
					</div>
				</div>

				{/* Footer tagline */}
				<p
					className="text-center mt-8 text-sm italic font-light"
					style={{ color: "rgba(125,184,232,0.4)" }}
				>
					"Your Health, Our Priority"
				</p>
			</div>
		</div>
	);
}
