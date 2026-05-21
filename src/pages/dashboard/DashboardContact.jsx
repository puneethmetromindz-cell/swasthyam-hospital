import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import {
	Calendar,
	Phone,
	User,
	MessageSquare,
	Clock,
	Inbox,
	RefreshCw,
	AlertCircle,
	CheckCircle2,
	Trash2,
	ChevronDown,
	Mail,
	Tag,
} from "lucide-react";
import { cn } from "../../lib/utils";

const STATUS_OPTIONS = ["new", "contacted", "confirmed", "cancelled"];

const STATUS_CONFIG = {
	new: {
		label: "New",
		color: "#1a6fc4",
		bg: "rgba(26,111,196,0.08)",
		border: "rgba(26,111,196,0.2)",
	},
	contacted: {
		label: "Contacted",
		color: "#e05c1a",
		bg: "rgba(224,92,26,0.08)",
		border: "rgba(224,92,26,0.2)",
	},
	confirmed: {
		label: "Confirmed",
		color: "#16a34a",
		bg: "rgba(22,163,74,0.08)",
		border: "rgba(22,163,74,0.2)",
	},
	cancelled: {
		label: "Cancelled",
		color: "#ef4444",
		bg: "rgba(239,68,68,0.08)",
		border: "rgba(239,68,68,0.2)",
	},
};

export default function AppointmentsDashboard() {
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filterStatus, setFilterStatus] = useState("all");
	const [toast, setToast] = useState(null);
	const [deleteConfirm, setDeleteConfirm] = useState(null);
	const [updatingId, setUpdatingId] = useState(null);

	const showToast = (message, type = "success") => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3500);
	};

	const fetchAppointments = async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("contactdetails")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) {
			showToast("Failed to load contacts: " + error.message, "error");
		} else {
			setAppointments(data || []);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchAppointments();
	}, []);

	const handleStatusChange = async (id, newStatus) => {
		setUpdatingId(id);
		const { error } = await supabase
			.from("contactdetails")
			.update({ status: newStatus })
			.eq("id", id);

		if (error) {
			showToast("Failed to update status: " + error.message, "error");
		} else {
			setAppointments((prev) =>
				prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
			);
			showToast("Status updated successfully!");
		}
		setUpdatingId(null);
	};

	const handleDelete = async (appointment) => {
		const { error } = await supabase
			.from("contactdetails")
			.delete()
			.eq("id", appointment.id);

		if (error) {
			showToast("Failed to delete: " + error.message, "error");
		} else {
			showToast("Appointment removed.");
			setDeleteConfirm(null);
			setAppointments((prev) => prev.filter((a) => a.id !== appointment.id));
		}
	};

	const filtered =
		filterStatus === "all"
			? appointments
			: appointments.filter((a) => a.status === filterStatus);

	const countByStatus = (status) =>
		appointments.filter((a) => a.status === status).length;

	return (
		<div>
			{/* Toast */}
			{toast && (
				<div
					className={cn(
						"fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl animate-fade-up",
						toast.type === "error" ? "bg-red-500" : "bg-emerald-500",
					)}
					style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.2)" }}
				>
					{toast.type === "error" ? (
						<AlertCircle className="w-5 h-5 text-white shrink-0" />
					) : (
						<CheckCircle2 className="w-5 h-5 text-white shrink-0" />
					)}
					<p className="text-white font-medium text-sm">{toast.message}</p>
				</div>
			)}

			{/* Page Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
				<div>
					<h1
						className="text-3xl font-bold tracking-tight"
						style={{ color: "#1a2340" }}
					>
						Contact Submissions
					</h1>
					<p className="text-sm mt-1" style={{ color: "#7a8aaa" }}>
						View and manage all incoming contact form submissions from the
						website.
					</p>
				</div>
				<button
					onClick={fetchAppointments}
					className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
					style={{
						color: "#1a6fc4",
						background: "rgba(26,111,196,0.06)",
						border: "1px solid rgba(26,111,196,0.15)",
					}}
				>
					<RefreshCw className="w-4 h-4" />
					Refresh
				</button>
			</div>

			{/* Stats Row — clickable filters */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
				{STATUS_OPTIONS.map((status) => {
					const cfg = STATUS_CONFIG[status];
					const count = countByStatus(status);
					const active = filterStatus === status;
					return (
						<button
							key={status}
							onClick={() => setFilterStatus(active ? "all" : status)}
							className="p-4 rounded-2xl text-left transition-all hover:-translate-y-0.5"
							style={{
								background: active ? cfg.bg : "#ffffff",
								border: `1px solid ${active ? cfg.border : "#e0ecf8"}`,
								boxShadow: active
									? `0 4px 16px ${cfg.border}`
									: "0 2px 8px rgba(26,111,196,0.04)",
							}}
						>
							<p
								className="text-2xl font-bold"
								style={{ color: active ? cfg.color : "#1a2340" }}
							>
								{count}
							</p>
							<p
								className="text-[10px] uppercase tracking-widest font-semibold mt-1"
								style={{ color: active ? cfg.color : "#7a8aaa" }}
							>
								{cfg.label}
							</p>
						</button>
					);
				})}
			</div>

			{/* Active filter pill */}
			{filterStatus !== "all" && (
				<div className="mb-4 flex items-center gap-2">
					<span className="text-sm" style={{ color: "#7a8aaa" }}>
						Showing:
					</span>
					<span
						className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
						style={{
							color: STATUS_CONFIG[filterStatus].color,
							background: STATUS_CONFIG[filterStatus].bg,
							border: `1px solid ${STATUS_CONFIG[filterStatus].border}`,
						}}
					>
						{STATUS_CONFIG[filterStatus].label}
					</span>
					<button
						onClick={() => setFilterStatus("all")}
						className="text-xs underline"
						style={{ color: "#7a8aaa" }}
					>
						Clear
					</button>
				</div>
			)}

			{/* Appointments List */}
			{loading ? (
				<div className="flex items-center justify-center py-20">
					<div
						className="w-10 h-10 rounded-full border-4 animate-spin"
						style={{ borderColor: "#1a6fc4", borderTopColor: "transparent" }}
					></div>
				</div>
			) : filtered.length === 0 ? (
				<div
					className="rounded-2xl p-16 text-center"
					style={{ background: "#ffffff", border: "1px solid #e0ecf8" }}
				>
					<Inbox
						className="w-16 h-16 mx-auto mb-4"
						style={{ color: "#d5e3f5" }}
					/>
					<h3 className="text-xl font-bold mb-2" style={{ color: "#1a2340" }}>
						No appointments found
					</h3>
					<p className="text-sm" style={{ color: "#7a8aaa" }}>
						{filterStatus === "all"
							? "Appointment requests will appear here once submitted."
							: `No appointments with status "${STATUS_CONFIG[filterStatus].label}".`}
					</p>
				</div>
			) : (
				<div className="grid gap-4">
					{filtered.map((appt) => {
						const cfg = STATUS_CONFIG[appt.status] || STATUS_CONFIG["new"];
						return (
							<div
								key={appt.id}
								className="p-5 rounded-2xl transition-all hover:shadow-md"
								style={{
									background: "#ffffff",
									border: "1px solid #e0ecf8",
									boxShadow: "0 2px 8px rgba(26,111,196,0.04)",
								}}
							>
								<div className="flex flex-col sm:flex-row sm:items-start gap-4">
									{/* Avatar */}
									<div
										className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg"
										style={{
											background: "rgba(26,111,196,0.08)",
											color: "#1a6fc4",
										}}
									>
										{appt.full_name?.charAt(0)?.toUpperCase() || "?"}
									</div>

									{/* Info */}
									<div className="flex-1 min-w-0 space-y-2">
										<div className="flex flex-wrap items-center gap-3">
											<h3
												className="font-bold text-base"
												style={{ color: "#1a2340" }}
											>
												{appt.full_name}
											</h3>
											<span
												className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider"
												style={{
													color: cfg.color,
													background: cfg.bg,
													border: `1px solid ${cfg.border}`,
												}}
											>
												{cfg.label}
											</span>
										</div>

										<div className="flex flex-wrap gap-x-5 gap-y-1">
											<span
												className="flex items-center gap-1.5 text-xs"
												style={{ color: "#7a8aaa" }}
											>
												<Phone className="w-3.5 h-3.5" />
												<a
													href={`tel:${appt.phone_number}`}
													className="hover:underline"
													style={{ color: "#1a6fc4" }}
												>
													{appt.phone_number}
												</a>
											</span>

											{appt.email && (
												<span
													className="flex items-center gap-1.5 text-xs"
													style={{ color: "#7a8aaa" }}
												>
													<Mail className="w-3.5 h-3.5" />
													<a
														href={`mailto:${appt.email}`}
														className="hover:underline"
														style={{ color: "#1a6fc4" }}
													>
														{appt.email}
													</a>
												</span>
											)}

											{appt.source && (
												<span
													className="flex items-center gap-1.5 text-xs"
													style={{ color: "#b0bdd0" }}
												>
													<Tag className="w-3.5 h-3.5" />
													{appt.source === "hero_quick_booking" ? "Hero Booking" : appt.source === "cta_callback_request" ? "Callback Request" : appt.source === "contact_page" ? "Contact Page" : appt.source}
												</span>
											)}

											{appt.department && (
												<span
													className="flex items-center gap-1.5 text-xs capitalize"
													style={{ color: "#7a8aaa" }}
												>
													<User className="w-3.5 h-3.5" />
													{appt.department}
												</span>
											)}

											{appt.date && (
												<span
													className="flex items-center gap-1.5 text-xs"
													style={{ color: "#7a8aaa" }}
												>
													<Calendar className="w-3.5 h-3.5" />
													{new Date(appt.date).toLocaleDateString(
														"en-IN",
														{ day: "numeric", month: "short", year: "numeric" },
													)}
												</span>
											)}

											<span
												className="flex items-center gap-1.5 text-xs"
												style={{ color: "#b0bdd0" }}
											>
												<Clock className="w-3.5 h-3.5" />
												{new Date(appt.created_at).toLocaleString("en-IN", {
													day: "numeric",
													month: "short",
													hour: "2-digit",
													minute: "2-digit",
												})}
											</span>
										</div>

										{appt.message && (
											<div
												className="flex items-start gap-1.5 text-xs rounded-lg px-3 py-2 mt-1"
												style={{
													color: "#7a8aaa",
													background: "#f8fafd",
													border: "1px solid #e0ecf8",
												}}
											>
												<MessageSquare
													className="w-3.5 h-3.5 mt-0.5 shrink-0"
													style={{ color: "#b0bdd0" }}
												/>
												<span>{appt.message}</span>
											</div>
										)}
									</div>

									{/* Actions */}
									<div className="flex items-center gap-2 shrink-0">
										{/* Status change dropdown */}
										<div className="relative">
											<select
												value={appt.status}
												disabled={updatingId === appt.id}
												onChange={(e) =>
													handleStatusChange(appt.id, e.target.value)
												}
												className="appearance-none pl-3 pr-7 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all focus:outline-none cursor-pointer disabled:opacity-50"
												style={{
													color: cfg.color,
													background: cfg.bg,
													border: `1px solid ${cfg.border}`,
												}}
											>
												{STATUS_OPTIONS.map((s) => (
													<option key={s} value={s}>
														{STATUS_CONFIG[s].label}
													</option>
												))}
											</select>
											<ChevronDown
												className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none"
												style={{ color: cfg.color }}
											/>
										</div>

										{/* Reply via Email button */}
										{appt.email && (
											<a
												href={`mailto:${appt.email}?subject=Re: Your Appointment Request at Swasthyam Hospital&body=Dear ${appt.full_name},%0D%0A%0D%0AThank you for reaching out to Swasthyam Super Specialty Hospital.%0D%0A%0D%0A`}
												className="p-2.5 rounded-xl transition-all hover:-translate-y-0.5"
												style={{
													color: "#1a6fc4",
													background: "rgba(26,111,196,0.06)",
													border: "1px solid rgba(26,111,196,0.12)",
												}}
												title="Reply via Email"
											>
												<Mail className="w-4 h-4" />
											</a>
										)}

										{/* Delete button */}
										<button
											onClick={() => setDeleteConfirm(appt)}
											className="p-2.5 rounded-xl transition-all hover:-translate-y-0.5"
											style={{
												color: "#ef4444",
												background: "rgba(239,68,68,0.06)",
												border: "1px solid rgba(239,68,68,0.12)",
											}}
											title="Delete appointment"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{deleteConfirm && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={() => setDeleteConfirm(null)}
					></div>
					<div
						className="relative z-10 w-full max-w-sm rounded-2xl p-8 text-center animate-scale-in"
						style={{
							background: "#ffffff",
							boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
						}}
					>
						<div
							className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
							style={{ background: "rgba(239,68,68,0.08)" }}
						>
							<Trash2 className="w-8 h-8 text-red-500" />
						</div>
						<h3 className="text-xl font-bold mb-2" style={{ color: "#1a2340" }}>
							Delete Contact?
						</h3>
						<p className="text-sm mb-8" style={{ color: "#7a8aaa" }}>
							Are you sure you want to remove the request from{" "}
							<strong style={{ color: "#1a2340" }}>{deleteConfirm.full_name}</strong>
							? This cannot be undone.
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => setDeleteConfirm(null)}
								className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider"
								style={{
									color: "#7a8aaa",
									background: "#f0f4fa",
									border: "1px solid #e0ecf8",
								}}
							>
								Cancel
							</button>
							<button
								onClick={() => handleDelete(deleteConfirm)}
								className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all hover:-translate-y-0.5"
								style={{
									background: "linear-gradient(135deg, #ef4444, #dc2626)",
									boxShadow: "0 6px 20px rgba(239,68,68,0.3)",
								}}
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
