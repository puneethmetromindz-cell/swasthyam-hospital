import PageHeader from "../components/PageHeader";
import { Calendar, Stethoscope, Award, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Doctors() {
	const [doctors, setDoctors] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		supabase
			.from("doctors")
			.select("*")
			.order("id", { ascending: true })
			.then(({ data }) => {
				setDoctors(data || []);
				setLoading(false);
			});
	}, []);

	return (
		<div className="bg-[#f4f8ff] min-h-screen pb-24">
			<PageHeader
				title="Our Medical Experts"
				subtitle="Meet our diverse team of highly qualified specialists dedicated to your health and well-being."
			/>

			<div className="max-w-7xl mx-auto px-6 mt-16">
				{loading ? (
					/* ── Loading Skeletons ── */
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "#fff", border: "1px solid #e0ecf8" }}>
								<div className="h-72 bg-blue-50"></div>
								<div className="p-6 space-y-3">
									<div className="h-5 bg-blue-50 rounded-lg w-3/4"></div>
									<div className="h-4 bg-blue-50 rounded-lg w-1/2"></div>
									<div className="h-px bg-blue-100 my-4"></div>
									<div className="h-4 bg-blue-50 rounded-lg w-2/3"></div>
									<div className="h-4 bg-blue-50 rounded-lg w-1/2"></div>
									<div className="h-12 bg-blue-50 rounded-xl mt-4"></div>
								</div>
							</div>
						))}
					</div>
				) : doctors.length === 0 ? (
					/* ── Empty State ── */
					<div className="text-center py-20">
						<ImageIcon className="w-20 h-20 mx-auto mb-6" style={{ color: "#d5e3f5" }} />
						<h3 className="text-2xl font-bold mb-2" style={{ color: "#1a2340" }}>Coming Soon</h3>
						<p className="text-lg" style={{ color: "#7a8aaa" }}>
							Our doctors directory is being updated. Please check back soon.
						</p>
					</div>
				) : (
					/* ── Doctor Cards Grid ── */
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{doctors.map((doc) => (
							<div
								key={doc.id}
								className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 flex flex-col"
								style={{
									background: "#ffffff",
									border: "1px solid #e0ecf8",
									boxShadow: "0 4px 20px rgba(26,111,196,0.06)",
								}}
							>
								{/* ── Image Section ── */}
								<div className="relative h-100 overflow-hidden" style={{ background: "linear-gradient(135deg, #e8f0fe 0%, #f0f4fa 100%)" }}>
									{doc.image_url ? (
										<img
											src={doc.image_url}
											alt={doc.name}
											className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
										/>
									) : (
										<div className="w-full h-full flex flex-col items-center justify-center gap-3">
											<div
												className="w-24 h-24 rounded-full flex items-center justify-center"
												style={{ background: "rgba(26,111,196,0.08)" }}
											>
												<ImageIcon className="w-12 h-12" style={{ color: "#a8c8e8" }} />
											</div>
											<p className="text-xs font-medium" style={{ color: "#b0bdd0" }}>Photo coming soon</p>
										</div>
									)}
									{/* Gradient overlay at bottom for tag readability */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

									{/* Specialty Tag */}
									<span
										className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md"
										style={{
											background: "#e05c1a",
											color: "#ffffff",
											boxShadow: "0 2px 8px rgba(224,92,26,0.4)",
										}}
									>
										{doc.speciality}
									</span>
								</div>

								{/* ── Details Section ── */}
								<div className="p-6 flex-1 flex flex-col">
									<h3
										className="text-xl font-bold mb-1 transition-colors duration-300 group-hover:text-[#1a6fc4]"
										style={{ color: "#1a2340" }}
									>
										{doc.name}
									</h3>
									<p className="text-sm mb-5" style={{ color: "#7a8aaa" }}>
										{doc.qualification}
									</p>

									{/* Divider */}
									<div className="h-px mb-5" style={{ background: "linear-gradient(to right, #e0ecf8, transparent)" }}></div>

									{/* Info rows */}
									<div className="space-y-3 mb-6 flex-1">
										<div className="flex items-center gap-3">
											<div
												className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
												style={{ background: "rgba(192,138,0,0.08)" }}
											>
												<Stethoscope className="w-4 h-4" style={{ color: "#c08a00" }} />
											</div>
											<span className="text-sm" style={{ color: "#4a5a7a" }}>
												Department of {doc.speciality}
											</span>
										</div>
										<div className="flex items-center gap-3">
											<div
												className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
												style={{ background: "rgba(192,138,0,0.08)" }}
											>
												<Award className="w-4 h-4" style={{ color: "#c08a00" }} />
											</div>
											<span className="text-sm" style={{ color: "#4a5a7a" }}>
												{doc.experience} Experience
											</span>
										</div>
									</div>

									{/* CTA Button */}
									<Link
										to="/contact"
										className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5"
										style={{
											background: "linear-gradient(135deg, #1a6fc4, #0e4a8a)",
											color: "#ffffff",
											boxShadow: "0 4px 16px rgba(26,111,196,0.25)",
										}}
									>
										<Calendar className="w-4 h-4" />
										Book Appointment
									</Link>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
