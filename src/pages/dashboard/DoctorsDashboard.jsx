import { useEffect, useState, useRef } from "react";
import { supabase } from "../../supabase";
import {
	Plus,
	Pencil,
	Trash2,
	X,
	Upload,
	Save,
	AlertCircle,
	CheckCircle2,
	ImageIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";

const SPECIALTY_SUGGESTIONS = [
	"General Physician",
	"Gynecologist",
	"Orthopedic Surgeon",
	"Pediatrician",
	"Cardiologist",
	"Neurologist",
	"Urologist",
	"Nephrologist",
	"Pulmonologist",
	"Dermatologist",
	"ENT Specialist",
	"Ophthalmologist",
	"Psychiatrist",
	"Surgeon",
	"Anesthesiologist",
];

const EMPTY_FORM = {
	name: "",
	qualification: "",
	speciality: "",
	experience: "",
};

export default function DoctorsDashboard() {
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingDoctor, setEditingDoctor] = useState(null);
	const [formData, setFormData] = useState(EMPTY_FORM);
	const [imageFile, setImageFile] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [saving, setSaving] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState(null);
	const [toast, setToast] = useState(null);
	const [useCustomSpecialty, setUseCustomSpecialty] = useState(false);
	const fileInputRef = useRef(null);

	// Fetch doctors
	const fetchDoctors = async () => {
		setLoading(true);
		const { data, error } = await supabase
			.from("doctors")
			.select("*")
			.order("id", { ascending: true });

		if (error) {
			showToast("Failed to load doctors: " + error.message, "error");
		} else {
			setDoctors(data || []);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchDoctors();
	}, []);

	// Toast helper
	const showToast = (message, type = "success") => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3500);
	};

	// Open modal for add
	const openAddModal = () => {
		setEditingDoctor(null);
		setFormData(EMPTY_FORM);
		setImageFile(null);
		setImagePreview(null);
		setUseCustomSpecialty(false);
		setModalOpen(true);
	};

	// Open modal for edit
	const openEditModal = (doctor) => {
		setEditingDoctor(doctor);
		setFormData({
			name: doctor.name,
			qualification: doctor.qualification,
			speciality: doctor.speciality,
			experience: doctor.experience,
		});
		setImageFile(null);
		setImagePreview(doctor.image_url || null);
		// Check if specialty is custom (not in suggestions list)
		setUseCustomSpecialty(!SPECIALTY_SUGGESTIONS.includes(doctor.speciality));
		setModalOpen(true);
	};

	// Close modal
	const closeModal = () => {
		setModalOpen(false);
		setEditingDoctor(null);
		setFormData(EMPTY_FORM);
		setImageFile(null);
		setImagePreview(null);
		setUseCustomSpecialty(false);
	};

	// Handle image selection
	const handleImageChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 2 * 1024 * 1024) {
			showToast("Image must be under 2MB", "error");
			return;
		}

		if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
			showToast("Only JPEG, PNG, and WebP images allowed", "error");
			return;
		}

		setImageFile(file);
		setImagePreview(URL.createObjectURL(file));
	};

	// Upload image to Supabase Storage
	const uploadImage = async (file) => {
		const fileExt = file.name.split(".").pop();
		const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

		const { error: uploadError } = await supabase.storage
			.from("doctor-images")
			.upload(fileName, file);

		if (uploadError) throw uploadError;

		const { data } = supabase.storage
			.from("doctor-images")
			.getPublicUrl(fileName);

		return data.publicUrl;
	};

	// Delete image from storage
	const deleteImage = async (url) => {
		if (!url) return;
		try {
			const parts = url.split("/doctor-images/");
			if (parts.length > 1) {
				const fileName = parts[1];
				await supabase.storage.from("doctor-images").remove([fileName]);
			}
		} catch (err) {
			console.error("Error deleting image:", err);
		}
	};

	// Save doctor (add or edit)
	const handleSave = async (e) => {
		e.preventDefault();
		setSaving(true);

		try {
			let imageUrl = editingDoctor?.image_url || "";

			// Upload new image if selected
			if (imageFile) {
				if (editingDoctor?.image_url) {
					await deleteImage(editingDoctor.image_url);
				}
				imageUrl = await uploadImage(imageFile);
			}

			const doctorData = {
				name: formData.name,
				qualification: formData.qualification,
				speciality: formData.speciality,
				experience: formData.experience,
				image_url: imageUrl,
			};

			if (editingDoctor) {
				const { error } = await supabase
					.from("doctors")
					.update(doctorData)
					.eq("id", editingDoctor.id);

				if (error) throw error;
				showToast("Doctor updated successfully!");
			} else {
				const { error } = await supabase
					.from("doctors")
					.insert([doctorData]);

				if (error) throw error;
				showToast("Doctor added successfully!");
			}

			closeModal();
			fetchDoctors();
		} catch (err) {
			showToast(err.message || "Failed to save doctor", "error");
		} finally {
			setSaving(false);
		}
	};

	// Delete doctor
	const handleDelete = async (doctor) => {
		try {
			if (doctor.image_url) {
				await deleteImage(doctor.image_url);
			}

			const { error } = await supabase
				.from("doctors")
				.delete()
				.eq("id", doctor.id);

			if (error) throw error;

			showToast("Doctor removed successfully!");
			setDeleteConfirm(null);
			fetchDoctors();
		} catch (err) {
			showToast(err.message || "Failed to delete doctor", "error");
		}
	};

	return (
		<div>
			{/* Toast notification */}
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

			{/* Page header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
				<div>
					<h1 className="text-3xl font-bold tracking-tight" style={{ color: "#1a2340" }}>
						Manage Doctors
					</h1>
					<p className="text-sm mt-1" style={{ color: "#7a8aaa" }}>
						Add, edit, or remove doctor profiles displayed on the website.
					</p>
				</div>
				<button
					onClick={openAddModal}
					className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all hover:-translate-y-0.5"
					style={{
						background: "linear-gradient(135deg, #e05c1a, #c44e12)",
						boxShadow: "0 6px 20px rgba(224,92,26,0.3)",
					}}
				>
					<Plus className="w-5 h-5" />
					Add Doctor
				</button>
			</div>

			{/* Doctors list */}
			{loading ? (
				<div className="flex items-center justify-center py-20">
					<div
						className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
						style={{ borderColor: "#1a6fc4", borderTopColor: "transparent" }}
					></div>
				</div>
			) : doctors.length === 0 ? (
				<div
					className="rounded-2xl p-16 text-center"
					style={{
						background: "#ffffff",
						border: "1px solid #e0ecf8",
					}}
				>
					<ImageIcon className="w-16 h-16 mx-auto mb-4" style={{ color: "#d5e3f5" }} />
					<h3 className="text-xl font-bold mb-2" style={{ color: "#1a2340" }}>
						No doctors yet
					</h3>
					<p className="text-sm mb-6" style={{ color: "#7a8aaa" }}>
						Add your first doctor to get started.
					</p>
					<button
						onClick={openAddModal}
						className="btn-primary inline-flex items-center gap-2"
					>
						<Plus className="w-4 h-4" />
						Add First Doctor
					</button>
				</div>
			) : (
				<div className="grid gap-4">
					{doctors.map((doctor) => (
						<div
							key={doctor.id}
							className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-5 rounded-2xl transition-all hover:shadow-md group"
							style={{
								background: "#ffffff",
								border: "1px solid #e0ecf8",
								boxShadow: "0 2px 8px rgba(26,111,196,0.04)",
							}}
						>
							{/* Image */}
							<div
								className="w-16 h-16 rounded-xl overflow-hidden shrink-0"
								style={{
									background: "#f0f4fa",
									border: "1px solid #e0ecf8",
								}}
							>
								{doctor.image_url ? (
									<img
										src={doctor.image_url}
										alt={doctor.name}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-full h-full flex items-center justify-center">
										<ImageIcon className="w-6 h-6" style={{ color: "#d5e3f5" }} />
									</div>
								)}
							</div>

							{/* Info */}
							<div className="flex-1 min-w-0">
								<h3 className="font-bold text-base" style={{ color: "#1a2340" }}>
									{doctor.name}
								</h3>
								<p className="text-sm" style={{ color: "#7a8aaa" }}>
									{doctor.speciality} — {doctor.experience}
								</p>
								<p className="text-xs mt-0.5" style={{ color: "#b0bdd0" }}>
									{doctor.qualification}
								</p>
							</div>

							{/* Specialty badge */}
							<div
								className="hidden md:block px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
								style={{
									color: "#e05c1a",
									background: "rgba(224,92,26,0.06)",
									border: "1px solid rgba(224,92,26,0.12)",
								}}
							>
								{doctor.speciality}
							</div>

							{/* Actions */}
							<div className="flex items-center gap-2">
								<button
									onClick={() => openEditModal(doctor)}
									className="p-2.5 rounded-xl transition-all hover:-translate-y-0.5"
									style={{
										color: "#1a6fc4",
										background: "rgba(26,111,196,0.06)",
										border: "1px solid rgba(26,111,196,0.12)",
									}}
									title="Edit doctor"
								>
									<Pencil className="w-4 h-4" />
								</button>
								<button
									onClick={() => setDeleteConfirm(doctor)}
									className="p-2.5 rounded-xl transition-all hover:-translate-y-0.5"
									style={{
										color: "#ef4444",
										background: "rgba(239,68,68,0.06)",
										border: "1px solid rgba(239,68,68,0.12)",
									}}
									title="Delete doctor"
								>
									<Trash2 className="w-4 h-4" />
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* ────────── ADD/EDIT MODAL ────────── */}
			{modalOpen && (
				<div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={closeModal}
					></div>

					<div
						className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-8 animate-scale-in"
						style={{
							background: "#ffffff",
							boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
						}}
					>
						<button
							onClick={closeModal}
							className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
						>
							<X className="w-5 h-5" />
						</button>

						<h2 className="text-2xl font-bold mb-1" style={{ color: "#1a2340" }}>
							{editingDoctor ? "Edit Doctor" : "Add New Doctor"}
						</h2>
						<p className="text-sm mb-8" style={{ color: "#7a8aaa" }}>
							{editingDoctor
								? "Update the doctor's profile information."
								: "Fill in the details to add a new doctor profile."}
						</p>

						<form onSubmit={handleSave} className="space-y-5">
							{/* Image upload */}
							<div>
								<label
									className="block text-[10px] uppercase tracking-widest font-semibold mb-2"
									style={{ color: "#1a6fc4" }}
								>
									Photo
								</label>
								<div className="flex items-center gap-4">
									<div
										className="w-20 h-20 rounded-xl overflow-hidden shrink-0 cursor-pointer group relative"
										style={{
											background: "#f0f4fa",
											border: "2px dashed #d5e3f5",
										}}
										onClick={() => fileInputRef.current?.click()}
									>
										{imagePreview ? (
											<>
												<img
													src={imagePreview}
													alt="Preview"
													className="w-full h-full object-cover"
												/>
												<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
													<Upload className="w-5 h-5 text-white" />
												</div>
											</>
										) : (
											<div className="w-full h-full flex flex-col items-center justify-center gap-1">
												<Upload className="w-5 h-5" style={{ color: "#b0bdd0" }} />
												<span className="text-[8px] uppercase tracking-wider" style={{ color: "#b0bdd0" }}>
													Upload
												</span>
											</div>
										)}
									</div>
									<div className="text-xs" style={{ color: "#7a8aaa" }}>
										<p>Click to upload a photo</p>
										<p className="mt-1">JPEG, PNG, or WebP · Max 2MB</p>
									</div>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/jpeg,image/png,image/webp"
									onChange={handleImageChange}
									className="hidden"
								/>
							</div>

							{/* Name */}
							<div>
								<label
									className="block text-[10px] uppercase tracking-widest font-semibold mb-1.5"
									style={{ color: "#1a6fc4" }}
								>
									Full Name *
								</label>
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all"
									style={{
										borderColor: "#d5e3f5",
										color: "#1a2340",
										background: "#f8fafd",
									}}
									placeholder="Dr. Full Name"
								/>
							</div>

							{/* Qualification */}
							<div>
								<label
									className="block text-[10px] uppercase tracking-widest font-semibold mb-1.5"
									style={{ color: "#1a6fc4" }}
								>
									Qualification *
								</label>
								<input
									type="text"
									required
									value={formData.qualification}
									onChange={(e) =>
										setFormData({ ...formData, qualification: e.target.value })
									}
									className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all"
									style={{
										borderColor: "#d5e3f5",
										color: "#1a2340",
										background: "#f8fafd",
									}}
									placeholder="MBBS, MD (Specialty)"
								/>
							</div>

							{/* Specialty & Experience row */}
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label
										className="block text-[10px] uppercase tracking-widest font-semibold mb-1.5"
										style={{ color: "#1a6fc4" }}
									>
										Specialty *
									</label>
									{useCustomSpecialty ? (
										<div className="space-y-2">
											<input
												type="text"
												required
												value={formData.speciality}
												onChange={(e) =>
													setFormData({ ...formData, speciality: e.target.value })
												}
												className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all"
												style={{
													borderColor: "#d5e3f5",
													color: "#1a2340",
													background: "#f8fafd",
												}}
												placeholder="Type specialty..."
											/>
											<button
												type="button"
												onClick={() => {
													setUseCustomSpecialty(false);
													setFormData({ ...formData, speciality: "" });
												}}
												className="text-[10px] uppercase tracking-wider font-semibold transition-colors"
												style={{ color: "#1a6fc4" }}
											>
												← Choose from list
											</button>
										</div>
									) : (
										<div className="space-y-2">
											<select
												required
												value={formData.speciality}
												onChange={(e) =>
													setFormData({ ...formData, speciality: e.target.value })
												}
												className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all appearance-none"
												style={{
													borderColor: "#d5e3f5",
													color: "#1a2340",
													background: "#f8fafd",
												}}
											>
												<option value="">Select...</option>
												{SPECIALTY_SUGGESTIONS.map((s) => (
													<option key={s} value={s}>
														{s}
													</option>
												))}
											</select>
											<button
												type="button"
												onClick={() => setUseCustomSpecialty(true)}
												className="text-[10px] uppercase tracking-wider font-semibold transition-colors"
												style={{ color: "#e05c1a" }}
											>
												+ Type custom specialty
											</button>
										</div>
									)}
								</div>

								<div>
									<label
										className="block text-[10px] uppercase tracking-widest font-semibold mb-1.5"
										style={{ color: "#1a6fc4" }}
									>
										Experience *
									</label>
									<input
										type="text"
										required
										value={formData.experience}
										onChange={(e) =>
											setFormData({ ...formData, experience: e.target.value })
										}
										className="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all"
										style={{
											borderColor: "#d5e3f5",
											color: "#1a2340",
											background: "#f8fafd",
										}}
										placeholder="e.g. 15+ Years"
									/>
								</div>
							</div>

							{/* Submit */}
							<div className="flex gap-3 pt-4">
								<button
									type="button"
									onClick={closeModal}
									className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
									style={{
										color: "#7a8aaa",
										background: "#f0f4fa",
										border: "1px solid #e0ecf8",
									}}
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={saving}
									className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
									style={{
										background: saving
											? "#7a8aaa"
											: "linear-gradient(135deg, #1a6fc4, #0e4a8a)",
										boxShadow: saving
											? "none"
											: "0 6px 20px rgba(26,111,196,0.3)",
									}}
								>
									{saving ? (
										<>
											<div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
											Saving...
										</>
									) : (
										<>
											<Save className="w-4 h-4" />
											{editingDoctor ? "Update Doctor" : "Add Doctor"}
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* ────────── DELETE CONFIRMATION MODAL ────────── */}
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
							Delete Doctor?
						</h3>
						<p className="text-sm mb-8" style={{ color: "#7a8aaa" }}>
							Are you sure you want to remove{" "}
							<strong style={{ color: "#1a2340" }}>{deleteConfirm.name}</strong>?
							This action cannot be undone.
						</p>
						<div className="flex gap-3">
							<button
								onClick={() => setDeleteConfirm(null)}
								className="flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
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
