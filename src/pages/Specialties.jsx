import PageHeader from "../components/PageHeader";
import {
	ChevronRight,
	Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

import generalMedicineImg from "../assets/General-medicine.jpg";
import icuEmergencyImg from "../assets/icu-emergency.jpg";
import gynaecologyImg from "../assets/gynaecology.jpg";
import orthopedicsImg from "../assets/orthopedics.jpg";
import pediatricsImg from "../assets/pediatrics.jpg";
import neurologyImg from "../assets/neurology.jpg";
import urologyImg from "../assets/urology.jpg";
import nephrologyImg from "../assets/nephrology.jpg";
import cardiologyImg from "../assets/cardiology.jpg";
import pulmonaryImg from "../assets/pulmonary-medicine.jpg";

const SPECIALTIES = [
	{
		id: "general-medicine",
		name: "General Medicine",
		description:
			"Diagnosis and treatment of adult diseases, preventive care, and management of chronic conditions.",
		color: "from-emerald-500/20 to-emerald-600/5",
		image: generalMedicineImg,
	},
	{
		id: "icu",
		name: "ICU, Emergency, Accident & Trauma",
		description:
			"24/7 access to trauma experts and intensive care specialists equipped with life-saving technology.",
		color: "from-red-600/30 to-red-900/10",
		image: icuEmergencyImg,
	},
	{
		id: "gynecology",
		name: "Gynecology & Obstetrics",
		description:
			"Complete women's healthcare, high-risk pregnancy management, and minimally invasive surgeries.",
		color: "from-purple-500/20 to-purple-600/5",
		image: gynaecologyImg,
	},
	{
		id: "orthopedics",
		name: "Orthopedics",
		description:
			"Comprehensive care for bones, joints, and spine. Joint replacements, trauma care, and sports medicine.",
		color: "from-orange-500/20 to-orange-600/5",
		image: orthopedicsImg,
	},
	{
		id: "pediatrics",
		name: "Pediatrics",
		description:
			"Compassionate care for infants, children, and adolescents spanning general and specialized pediatrics.",
		color: "from-pink-500/20 to-pink-600/5",
		image: pediatricsImg,
	},
	{
		id: "neurology",
		name: "Neurology",
		description:
			"Expert treatment for stroke, epilepsy, movement disorders, and comprehensive neuro-rehabilitation.",
		color: "from-blue-500/20 to-blue-600/5",
		image: neurologyImg,
	},
	{
		id: "urology",
		name: "Urology",
		description:
			"Advanced care for kidney stones, urinary tract disorders, prostate conditions, and minimally invasive urological treatments.",
		color: "from-cyan-500/20 to-cyan-600/5",
		image: urologyImg,
	},
	{
		id: "nephrology",
		name: "Nephrology",
		description:
			"Specialized kidney care including dialysis, chronic kidney disease management, hypertension treatment, and renal transplant support.",
		color: "from-indigo-500/20 to-indigo-600/5",
		image: nephrologyImg,
	},
	{
		id: "cardiology",
		name: "Cardiology",
		description:
			"Comprehensive heart care including angioplasty, heart failure management, preventive cardiology, and advanced cardiac diagnostics.",
		color: "from-red-500/20 to-rose-600/5",
		image: cardiologyImg,
	},
	{
		id: "pulmonary-medicine",
		name: "Pulmonary Medicine",
		description:
			"Expert respiratory care for asthma, COPD, lung infections, sleep disorders, and advanced pulmonary diagnostics.",
		color: "from-sky-500/20 to-cyan-600/5",
		image: pulmonaryImg,
	},
];

export default function Specialties() {
	return (
		<div className="bg-[#f4f8ff] min-h-screen pb-24">
			<PageHeader
				title="Centres of Excellence"
				subtitle="Comprehensive multi-specialty care combining expert physicians, state-of-the-art technology, and compassionate healing."
			/>

			<div className="max-w-7xl mx-auto px-6 mt-16">
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					{SPECIALTIES.map((specialty) => (
						<div
							key={specialty.id}
							className="glass-card card-lift overflow-hidden group hover:border-brand-gold/50 transition-all hover:-translate-y-1 flex flex-col h-full relative"
						>
							<div
								className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${specialty.color} blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity`}
							></div>

							<div className="w-full h-72 sm:h-80 overflow-hidden bg-blue-50 flex-shrink-0">
								{specialty.image ? (
									<img
										src={specialty.image}
										alt={specialty.name}
										className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
									/>
								) : (
									<div className="w-full h-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-blue-200">
										<span className="text-blue-300 text-xs font-medium uppercase tracking-widest">
											Add Image
										</span>
										<span className="text-blue-200 text-[10px]">
											{specialty.id}.jpg
										</span>
									</div>
								)}
							</div>

							<div className="p-8 relative z-10 flex-1 flex flex-col">
								<h3 className="text-xl font-bold text-[#1a2340] mb-3 group-hover:text-brand-gold transition-colors">
									{specialty.name}
								</h3>

								<p className="text-slate-500 leading-relaxed mb-8 flex-1 text-sm">
									{specialty.description}
								</p>

								<div className="mt-auto flex items-center justify-between pt-4 border-t border-blue-100">
									<Link
										to="/contact"
										className="text-[11px] font-bold uppercase tracking-widest text-brand-gold hover:text-brand-orange transition-colors flex items-center gap-1 group-hover:gap-2"
									>
										Learn More <ChevronRight className="w-4 h-4" />
									</Link>

									<a
										href="tel:9008608842"
										className="bg-brand-orange/20 hover:bg-brand-orange p-2.5 rounded text-brand-orange hover:text-[#1a2340] transition-colors"
									>
										<Phone className="w-4 h-4" />
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}