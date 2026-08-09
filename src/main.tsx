import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { ThemeProvider } from "next-themes";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<HashRouter>
				<App />
			</HashRouter>
		</ThemeProvider>
	</StrictMode>,
);
