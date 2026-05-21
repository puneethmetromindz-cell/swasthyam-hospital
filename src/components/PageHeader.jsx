export default function PageHeader({ title, subtitle }) {
	return (
		<div
			className="relative pt-20 pb-14 overflow-hidden"
			style={{
				background:
					"linear-gradient(135deg, #e8f2ff 0%, #f4f8ff 60%, #fff0e8 100%)",
				borderBottom: "1px solid #d5e3f5",
			}}
		>
			<div className="absolute inset-0 z-0">
				<div className="geometric-accent opacity-60"></div>
				<div className="geometric-accent-left opacity-40"></div>
			</div>
			<div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
				<p
					className="text-[12px] uppercase tracking-widest font-semibold mb-3 animate-fade-in"
					style={{ color: "#e05c1a" }}
				>
					Swasthyam Hospital
				</p>
				<h1
					className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight animate-fade-up"
					style={{ color: "#1a2340" }}
				>
					{title}
				</h1>
				{subtitle && (
					<p
						className="max-w-2xl mx-auto text-lg md:text-xl font-light animate-fade-up delay-200"
						style={{ color: "#4a5a7a" }}
					>
						{subtitle}
					</p>
				)}
			</div>
		</div>
	);
}
