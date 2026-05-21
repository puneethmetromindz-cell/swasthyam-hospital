import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center" style={{ background: "#f4f8ff" }}>
				<div className="flex flex-col items-center gap-4">
					<div
						className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
						style={{ borderColor: "#1a6fc4", borderTopColor: "transparent" }}
					></div>
					<p className="text-sm uppercase tracking-widest font-semibold" style={{ color: "#7a8aaa" }}>
						Loading...
					</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return <Navigate to="/dashboard/login" replace />;
	}

	return <Outlet />;
}
