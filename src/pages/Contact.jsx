import PageHeader from "../components/PageHeader";
import { MapPin, Phone, Clock, Send, Mail } from "lucide-react";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "../supabase";

export default function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		department: "",
		date: "",
		message: "",
	});
	const [errors, setErrors] = useState({});
	const [submitted, setSubmitted] = useState(false);

	const validate = () => {
		const errs = {};
		if (!formData.name.trim()) {
			errs.name = "Full name is required";
		} else if (formData.name.trim().length < 2) {
			errs.name = "Name must be at least 2 characters";
		} else if (!/^[a-zA-Z\s.'-]+$/.test(formData.name.trim())) {
			errs.name = "Name can only contain letters, spaces, dots, hyphens";
		}

		const phoneClean = formData.phone.replace(/[\s\-+]/g, "");
		const phoneDigits = phoneClean.replace(/^91/, "");
		if (!formData.phone.trim()) {
			errs.phone = "Phone number is required";
		} else if (!/^\d{10}$/.test(phoneDigits)) {
			errs.phone = "Enter a valid 10-digit phone number";
		}

		if (
			formData.email.trim() &&
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
		) {
			errs.email = "Enter a valid email address";
		}

		if (!formData.department) {
			errs.department = "Please select a department";
		}

		if (!formData.message.trim()) {
			errs.message = "Please describe your reason for visit";
		} else if (formData.message.trim().length < 10) {
			errs.message = "Message must be at least 10 characters";
		}

		setErrors(errs);
		return Object.keys(errs).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);

		if (!validate()) return;

		const phoneClean = formData.phone
			.replace(/[\s\-+]/g, "")
			.replace(/^91/, "");

		const { error } = await supabase.from("contactdetails").insert([
			{
				full_name: formData.name.trim(),
				phone_number: phoneClean,
				email: formData.email.trim() || null,
				department: formData.department,
				date: formData.date || null,
				message: formData.message.trim(),
				status: "new",
				source: "contact_page",
			},
		]);

		if (error) {
			console.error(error);
			alert("Failed to submit appointment request");
			return;
		}

		alert("Appointment request submitted successfully!");

		setFormData({
			name: "",
			phone: "",
			email: "",
			department: "",
			date: "",
			message: "",
		});
		setErrors({});
		setSubmitted(false);
	};

	return (
		<div className="bg-[#f4f8ff] min-h-screen pb-24">
			<PageHeader
				title="Contact & Appointments"
				subtitle="Reach out to us for appointments, emergencies, or general patient inquiries. We're here to help."
			/>

			{/* 
				FIX 1: Changed px-6 → px-4 sm:px-6 so mobile gets full width breathing room.
				FIX 2: Added w-full to ensure the grid never overflows on small screens.
			*/}
			<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-10 sm:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-24">
				{/* Contact info & Map */}
				<div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
					{/* 
						FIX 3: Reduced padding on mobile (p-5 sm:p-8) so the card doesn't overflow.
						FIX 4: Wrapped all contact info items in a proper space-y-6 div — 
						       previously the first item was inside space-y-6 but the rest were siblings outside it.
					*/}
					<div className="glass-card card-lift p-5 sm:p-8">
						<h3 className="text-xl sm:text-2xl font-bold text-[#1a2340] mb-6 sm:mb-8 border-b border-blue-100 pb-4">
							Get in Touch
						</h3>

						<div className="space-y-6">
							{/* Phone */}
							<div className="flex items-start gap-3 sm:gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
									<Phone
										className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold"
										strokeWidth={1.5}
									/>
								</div>
								<div className="min-w-0">
									<h4 className="text-[#1a2340] font-semibold text-base sm:text-lg">
										Helpline Numbers
									</h4>
									<div className="mt-1 space-y-1">
										<p className="text-slate-600 text-sm">
											Appointments:{" "}
											<a
												href="tel:9901984418"
												className="text-brand-gold hover:text-brand-orange font-medium"
											>
												9901984418
											</a>
										</p>
										<p className="text-slate-600 text-sm flex flex-wrap gap-x-1">
											MD Contact:
											<a
												href="tel:8151938206"
												className="text-brand-gold hover:text-brand-orange font-medium"
											>
												8151938206
											</a>
											<span>,</span>
											<a
												href="tel:7829712073"
												className="text-brand-gold hover:text-brand-orange font-medium"
											>
												7829712073
											</a>
											<span>,</span>
											<a
												href="tel:9008608842"
												className="text-brand-gold hover:text-brand-orange font-medium"
											>
												9008608842
											</a>
										</p>
									</div>
								</div>
							</div>

							{/* Location */}
							<div className="flex items-start gap-3 sm:gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
									<MapPin
										className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold"
										strokeWidth={1.5}
									/>
								</div>
								<div className="min-w-0">
									<h4 className="text-[#1a2340] font-semibold text-base sm:text-lg">
										Hospital Location
									</h4>
									<p className="text-slate-600 text-sm mt-1">
										Swasthyam Super Specialty Hospital,
										<br />
										Muddinpalya, Bangalore
									</p>
								</div>
							</div>

							{/* Email */}
							<div className="flex items-start gap-3 sm:gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
									<Mail
										className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold"
										strokeWidth={1.5}
									/>
								</div>
								<div className="min-w-0">
									<h4 className="text-[#1a2340] font-semibold text-base sm:text-lg">
										Email Address
									</h4>
									{/* FIX 5: break-all ensures long email doesn't overflow on narrow screens */}
									<a
										href="mailto:swasthyamhospitals@gmail.com"
										className="text-brand-gold hover:text-brand-orange font-medium text-sm mt-1 inline-block break-all"
									>
										swasthyamhospitals@gmail.com
									</a>
								</div>
							</div>

							{/* Hours */}
							<div className="flex items-start gap-3 sm:gap-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 border border-blue-100 rounded flex items-center justify-center shrink-0">
									<Clock
										className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold"
										strokeWidth={1.5}
									/>
								</div>
								<div className="min-w-0">
									<h4 className="text-[#1a2340] font-semibold text-base sm:text-lg">
										Working Hours
									</h4>
									<p className="text-slate-600 text-sm mt-1 mb-1 flex flex-wrap items-center gap-2">
										Emergency & ICU:{" "}
										<span className="text-brand-orange font-bold uppercase tracking-widest text-[10px] px-2 py-0.5 bg-brand-orange/10 rounded">
											24/7 OPEN
										</span>
									</p>
									<p className="text-slate-600 text-sm">
										OPD Timings: 9:00 AM - 8:00 PM
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
						<a
							href="tel:9901984418"
							className="flex-1 btn-secondary flex items-center justify-center text-sm"
						>
							Call Now
						</a>
						<a
							href="https://wa.me/919008608842?text=I want to book an appointment"
							target="_blank"
							rel="noopener noreferrer"
							className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-3 px-6 rounded-lg font-bold uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-colors"
						>
							<FaWhatsapp className="w-5 h-5" />
							WhatsApp Us
						</a>
					</div>

					{/* Map */}
					<div className="rounded overflow-hidden border border-blue-100 h-[260px] sm:h-[300px] relative bg-slate-100">
						<div className="absolute inset-0 border border-brand-gold/20 z-10 pointer-events-none rounded"></div>
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1000!2d77.490845!3d12.970187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!1wMTLCsDU4JzEyLjciTiA3N8KwMjknMjcuMCJF!5e0!3m2!1sen!2sin!4v1703668102377!5m2!1sen!2sin"
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen={true}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>

				{/* Form */}
				{/* FIX 6: Removed h-full from the inner card — it caused the card to stretch 
				    beyond content on mobile and created overflow issues. */}
				<div className="order-1 lg:order-2">
					<div className="glass-card card-lift p-5 sm:p-8 md:p-10 relative overflow-hidden">
						<div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[100px] pointer-events-none"></div>

						<h2 className="text-2xl sm:text-3xl font-bold text-[#1a2340] mb-2 relative z-10">
							Book an Appointment
						</h2>
						<p className="text-slate-500 mb-6 sm:mb-8 relative z-10 text-sm">
							Fill out the form below and our team will get back to you to
							confirm your slot.
						</p>

						<form
							onSubmit={handleSubmit}
							noValidate
							className="space-y-4 sm:space-y-5 relative z-10"
						>
							<div>
								<label className="block text-[10px] uppercase tracking-widest text-brand-gold mb-1.5">
									Full Name *
								</label>
								<input
									type="text"
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className={`w-full bg-blue-50 border rounded px-4 py-3 text-[#1a2340] focus:outline-none focus:border-brand-orange transition-all text-sm ${submitted && errors.name ? "border-red-400" : "border-blue-100"}`}
									placeholder="John Doe"
								/>
								{submitted && errors.name && (
									<p className="text-red-500 text-xs mt-1">{errors.name}</p>
								)}
							</div>

							<div>
								<label className="block text-[10px] uppercase tracking-widest text-brand-gold mb-1.5">
									Phone Number *
								</label>
								<input
									type="tel"
									value={formData.phone}
									onChange={(e) =>
										setFormData({ ...formData, phone: e.target.value })
									}
									className={`w-full bg-blue-50 border rounded px-4 py-3 text-[#1a2340] focus:outline-none focus:border-brand-orange transition-all text-sm ${submitted && errors.phone ? "border-red-400" : "border-blue-100"}`}
									placeholder="+91 9XXXXXXXXX"
								/>
								{submitted && errors.phone && (
									<p className="text-red-500 text-xs mt-1">{errors.phone}</p>
								)}
							</div>

							<div>
								<label className="block text-[10px] uppercase tracking-widest text-brand-gold mb-1.5">
									Email Address
								</label>
								<input
									type="email"
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className={`w-full bg-blue-50 border rounded px-4 py-3 text-[#1a2340] focus:outline-none focus:border-brand-orange transition-all text-sm ${submitted && errors.email ? "border-red-400" : "border-blue-100"}`}
									placeholder="your@email.com"
								/>
								{submitted && errors.email && (
									<p className="text-red-500 text-xs mt-1">{errors.email}</p>
								)}
							</div>

							{/* FIX 7: grid-cols-1 always on mobile, md:grid-cols-2 only on medium+ */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
								<div>
									<label className="block text-[10px] uppercase tracking-widest text-brand-gold mb-1.5">
										Select Department *
									</label>
									<select
										value={formData.department}
										onChange={(e) =>
											setFormData({ ...formData, department: e.target.value })
										}
										className={`w-full bg-blue-50 border rounded px-4 py-3 text-[#1a2340] focus:outline-none focus:border-brand-orange transition-all appearance-none text-sm ${submitted && errors.department ? "border-red-400" : "border-blue-100"}`}
									>
										<option value="" className="bg-white text-[#1a2340]">
											Choose Department
										</option>
										<option
											value="cardiology"
											className="bg-white text-[#1a2340]"
										>
											Cardiology
										</option>
										<option
											value="orthopedics"
											className="bg-white text-[#1a2340]"
										>
											Orthopedics
										</option>
										<option
											value="neurology"
											className="bg-white text-[#1a2340]"
										>
											Neurology
										</option>
										<option
											value="pediatrics"
											className="bg-white text-[#1a2340]"
										>
											Pediatrics
										</option>
										<option value="general" className="bg-white text-[#1a2340]">
											General Medicine
										</option>
										<option
											value="gynecology"
											className="bg-white text-[#1a2340]"
										>
											Gynecology & Obstetrics
										</option>
										<option value="urology" className="bg-white text-[#1a2340]">
											Urology
										</option>
										<option
											value="nephrology"
											className="bg-white text-[#1a2340]"
										>
											Nephrology
										</option>
										<option
											value="pulmonary"
											className="bg-white text-[#1a2340]"
										>
											Pulmonary Medicine
										</option>
										<option
											value="icu_trauma"
											className="bg-white text-[#1a2340]"
										>
											ICU & Trauma
										</option>
									</select>
									{submitted && errors.department && (
										<p className="text-red-500 text-xs mt-1">
											{errors.department}
										</p>
									)}
								</div>
								<div>
									<label className="block text-[10px] uppercase tracking-widest text-brand-gold mb-1.5">
										Preferred Date
									</label>
									<input
										type="date"
										value={formData.date}
										onChange={(e) =>
											setFormData({ ...formData, date: e.target.value })
										}
										className="w-full bg-blue-50 border border-blue-100 rounded px-4 py-3 text-[#1a2340] focus:outline-none focus:border-brand-orange transition-all text-sm date-input-visible"
									/>
								</div>
							</div>

							<div>
								<label className="block text-[10px] uppercase tracking-widest text-brand-gold mb-1.5">
									Reason for Visit *
								</label>
								<textarea
									rows={4}
									value={formData.message}
									onChange={(e) =>
										setFormData({ ...formData, message: e.target.value })
									}
									className={`w-full bg-blue-50 border rounded px-4 py-3 text-[#1a2340] focus:outline-none focus:border-brand-orange transition-all resize-none text-sm ${submitted && errors.message ? "border-red-400" : "border-blue-100"}`}
									placeholder="Describe your symptoms or reason for visit..."
								></textarea>
								{submitted && errors.message && (
									<p className="text-red-500 text-xs mt-1">{errors.message}</p>
								)}
							</div>

							<button
								type="submit"
								className="btn-primary w-full flex items-center justify-center gap-2 mt-2 sm:mt-4"
							>
								<Send className="w-5 h-5" strokeWidth={1.5} />
								Request Appointment
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
