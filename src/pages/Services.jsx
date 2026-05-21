import PageHeader from "../components/PageHeader";
import {
	Cross,
	Thermometer,
	Microscope,
	Truck,
	ActivitySquare,
} from "lucide-react";
 import ambulanceimg from "../assets/ambulance.jpg";
 import icu from "../assets/icu.jpeg";
 import pharmacy from "../assets/Pharmacy (1).jpeg"
 import { Link } from "react-router-dom";

const FACILITIES = [
	{
		title: "Intensive Care Unit (ICU)",
		description:
			"State-of-the-art multi-disciplinary ICU equipped with advanced life support systems, continuous patient monitoring, and staffed by critical care experts 24/7.",
		icon: ActivitySquare,
		image:
			icu,
	},
	{
		title: "Advanced Operation Theatres",
		description:
			"Ultra-clean, modular operation theatres with laminar airflow systems and the latest surgical equipment for complex and minimally invasive procedures.",
		icon: Cross,
		image:
			"https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
	},
	{
		title: "24/7 Advanced Diagnostics",
		description:
			"Comprehensive diagnostic imaging (MRI, CT, X-Ray, Ultrasound) and a fully automated pathology lab for rapid, precise results.",
		icon: Microscope,
		image:
			"https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&q=80",
	},
	{
		title: "24/7 Pharmacy",
		description:
			"Well-stocked in-house pharmacy ensuring immediate availability of all prescribed medications and surgical items round the clock.",
		icon: Thermometer,
		image:
			pharmacy,
	},
	{
		title: "Emergency & Ambulance Services",
		description:
			"Rapid response emergency teams and fully equipped critical care ambulances for immediate patient transport and stabilization.",
		icon: Truck,
		image:
			ambulanceimg,
	},
];

export default function Services() {
	return (
		<div className="bg-[#f4f8ff] min-h-screen pb-24">
			<PageHeader
				title="Facilities & Services"
				subtitle="World-class medical infrastructure designed to support comprehensive healing and round-the-clock emergency care."
			/>

			<div className="max-w-7xl mx-auto px-6 mt-16 space-y-16">
				{FACILITIES.map((facility, index) => {
					const Icon = facility.icon;
					const isEven = index % 2 === 0;

					return (
						<div
							key={index}
							className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center p-8 glass-card card-lift my-12 relative overflow-hidden group`}
						>
							<div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-orange/5 blur-[100px] rounded-full group-hover:bg-brand-orange/10 transition-colors"></div>
							<div className="w-full lg:w-1/2 rounded border border-blue-100 relative overflow-hidden z-10">
								<div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay"></div>
								<img
									src={facility.image}
									alt={facility.title}
									className="w-full h-[300px] md:h-[400px] object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
								/>
							</div>

							<div className="w-full lg:w-1/2 relative z-10">
								<div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded flex items-center justify-center mb-6 shadow-inner">
									<Icon className="w-8 h-8 text-brand-gold" strokeWidth={1.5} />
								</div>
								<h2 className="text-3xl lg:text-4xl font-bold text-[#1a2340] mb-6">
									{facility.title}
								</h2>
								<p className="text-lg text-slate-600 leading-relaxed mb-8 font-light">
									{facility.description}
								</p>
								<Link to="/contact" className="btn-secondary inline-block">
									Enquire Now
								</Link>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
