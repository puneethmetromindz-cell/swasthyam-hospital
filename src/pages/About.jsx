import { HeartPulse, Sparkles, PhoneCall } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Link } from "react-router-dom";
import swasthyamimg from "../assets/swasthyam-hospital.webp";

export default function About() {
	return (
		<div className="bg-[#f4f8ff] min-h-screen pb-20">
			<PageHeader
				title="About Us"
				subtitle="Learn about our mission, vision, and the legacy of healthcare excellence at Swasthyam."
			/>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 sm:mt-16 text-slate-600">
				{/* Our Journey */}
				<div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
					<div className="order-2 lg:order-1">
						<div className="inline-block bg-blue-50 border border-blue-100 px-4 py-1 rounded-full text-[12px] uppercase tracking-widest text-brand-gold mb-4">
							Our Journey
						</div>
						<h2 className="text-3xl md:text-4xl font-bold text-[#1a2340] mb-5">
							A Legacy of{" "}
							<span className="text-brand-gold">Trusted Healing</span>
						</h2>

						{/* FIX: Both paragraphs now same size — text-base leading-relaxed */}
						<p className="text-base leading-relaxed mb-4 text-slate-700">
							Swasthyam Super Specialty Hospital was founded with a singular
							vision: to bring world-class healthcare within reach of everyone.
							Located in the heart of Muddinpalya, Bangalore, we combine
							advanced medical infrastructure with a deeply compassionate
							approach to patient care.
						</p>
						<p className="text-base leading-relaxed mb-8 text-slate-500">
							Our multidisciplinary team of highly experienced specialists,
							dedicated nurses, and state-of-the-art facilities ensure that
							every patient receives comprehensive, personalized treatment. From
							critical care to routine diagnostics, "Your Health, Our Priority"
							is more than a tagline — it is the guiding principle of our entire
							institution.
						</p>

						{/* Stat cards — full width on mobile */}
						<div className="grid grid-cols-3 gap-3 sm:gap-4">
							<div className="glass-card card-lift p-4">
								<h4 className="text-[#1a2340] font-bold text-xl sm:text-2xl mb-1">
									24/7
								</h4>
								<p className="text-[10px] text-brand-gold uppercase tracking-wider leading-tight">
									Emergency Care
								</p>
							</div>
							<div className="glass-card card-lift p-4">
								<h4 className="text-[#1a2340] font-bold text-xl sm:text-2xl mb-1">
									24/7
								</h4>
								<p className="text-[10px] text-brand-gold uppercase tracking-wider leading-tight">
									Lab, Pharmacy, ICU, X-ray
								</p>
							</div>
							<div className="glass-card card-lift p-4">
								<h4 className="text-[#1a2340] font-bold text-xl sm:text-2xl mb-1">
									30+
								</h4>
								<p className="text-[10px] text-brand-gold uppercase tracking-wider leading-tight">
									Expert Doctors
								</p>
							</div>
						</div>
					</div>

					{/* Hospital image */}
					<div className="order-1 lg:order-2 relative">
						<div className="aspect-square rounded-full bg-white absolute -top-10 -right-10 blur-3xl opacity-50 z-0"></div>
						<div className="aspect-[4/5] rounded-tl-[50px] rounded-br-[50px] overflow-hidden relative z-10 border border-brand-orange/20 shadow-[0_0_50px_rgba(249,115,22,0.1)]">
							<img
								src={swasthyamimg}
								alt="Hospital Facility"
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
						</div>
					</div>
				</div>

				{/* Mission & Vision */}
				<div className="grid md:grid-cols-2 gap-6 sm:gap-8 mt-16 sm:mt-24">
					<div className="glass-card card-lift p-7 sm:p-10 relative overflow-hidden group">
						<div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
						<Sparkles
							className="w-10 h-10 sm:w-12 sm:h-12 text-brand-gold mb-5"
							strokeWidth={1.5}
						/>
						<h3 className="text-sm font-bold text-[#1a2340] mb-4 uppercase tracking-widest border-b border-brand-gold/30 pb-2 inline-block">
							Our Vision
						</h3>
						<p className="text-slate-600 leading-relaxed pt-2 text-sm sm:text-base">
							To be the premier healthcare destination in Bangalore, recognized
							globally for clinical excellence, compassionate patient care, and
							cutting-edge medical innovations.
						</p>
					</div>
					<div className="glass-card card-lift p-7 sm:p-10 relative overflow-hidden group">
						<div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
						<HeartPulse
							className="w-10 h-10 sm:w-12 sm:h-12 text-brand-orange mb-5"
							strokeWidth={1.5}
						/>
						<h3 className="text-sm font-bold text-[#1a2340] mb-4 uppercase tracking-widest border-b border-brand-orange/30 pb-2 inline-block">
							Our Mission
						</h3>
						<p className="text-slate-600 leading-relaxed pt-2 text-sm sm:text-base">
							To provide accessible, high-quality, and evidence-based
							healthcare. We are committed to patient safety, ethical practices,
							and continuous advancement in medical knowledge.
						</p>
					</div>
				</div>

				{/* Founder Message */}
				<div className="mt-16 sm:mt-24 pt-14 sm:pt-20 border-t border-blue-50">
					<div className="max-w-4xl mx-auto relative overflow-hidden glass-card card-lift p-7 sm:p-10 md:p-14 rounded-3xl">
						<div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-orange/10 blur-3xl rounded-full pointer-events-none"></div>

						<div className="relative z-10 text-center mb-8 sm:mb-10">
							<p className="text-brand-orange uppercase tracking-[0.3em] text-xs font-semibold mb-3">
								Dedicated to Healing & Hope
							</p>
							<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a2340] leading-tight">
								Compassion. Healing. Excellence.
							</h3>
						</div>

						<div className="relative z-10">
							<blockquote className="text-base sm:text-lg md:text-2xl text-slate-700 italic font-light leading-relaxed text-center max-w-3xl mx-auto relative px-4 sm:px-0">
								<span className="absolute -top-8 left-0 text-6xl sm:text-7xl text-brand-gold/20 font-serif leading-none">
									"
								</span>
								"We built Swasthyam with a simple philosophy: to treat every
								patient with the same dedication and expertise we would offer to
								our own family members. Our hospital represents a sanctuary of
								healing where cutting-edge technology meets profound human
								empathy."
								<span className="absolute -bottom-12 right-0 text-6xl sm:text-7xl text-brand-gold/20 font-serif leading-none">
									"
								</span>
							</blockquote>
						</div>
					</div>
				</div>

				{/* CTA */}
				<div className="mt-16 sm:mt-24 bg-gradient-to-tr from-brand-blue/20 to-transparent border border-brand-blue/30 rounded p-8 sm:p-12 text-center relative overflow-hidden">
					<div className="geometric-accent opacity-30"></div>
					<div className="relative z-10">
						<h2 className="text-2xl sm:text-3xl font-bold text-[#1a2340] mb-4">
							Experience Premium Healthcare
						</h2>
						<p className="text-base text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
							Our specialists are ready to provide you with the best medical
							care. Book your consultation today.
						</p>
						<Link
							to="/contact"
							className="btn-primary inline-flex items-center justify-center gap-2"
						>
							<PhoneCall className="w-5 h-5" />
							Contact Us Now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
