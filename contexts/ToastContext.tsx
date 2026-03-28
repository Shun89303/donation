// ToastContext.tsx
import BottomToast from "@/components/common/BottomToast";
import React, { createContext, useContext, useState } from "react";

type ToastContextType = {
	showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be inside ToastProvider");
	return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [message, setMessage] = useState<string | null>(null);

	const showToast = (msg: string) => {
		setMessage(msg);
		setTimeout(() => setMessage(null), 1500);
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{message && (
				<BottomToast
					visible
					message={message}
					onHide={() => setMessage(null)}
				/>
			)}
		</ToastContext.Provider>
	);
};
