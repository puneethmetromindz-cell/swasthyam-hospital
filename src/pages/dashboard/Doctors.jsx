import { useEffect, useState } from "react";
import { supabase } from "../../supabase";

export default function DashboardDoctors() {
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		fetchDoctors();
	}, []);

	async function fetchDoctors() {
		const { data } = await supabase.from("doctors").select("*");

		setDoctors(data || []);
	}

	return (
		<div>
			<h1 className="text-3xl font-bold mb-6">Doctors</h1>

			<div className="space-y-4">
				{doctors.map((doctor) => (
					<div key={doctor.id} className="bg-white p-4 rounded shadow">
						<h2 className="text-xl font-semibold">{doctor.name}</h2>

						<p>{doctor.specialty}</p>
					</div>
				))}
			</div>
		</div>
	);
}
