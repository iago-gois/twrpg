import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

const cinzel = Cinzel({
	variable: "--font-serif",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	icons: {
		icon: "/twrpg_icon_white.png",
		shortcut: "/twrpg_icon_white.png",
		apple: "/twrpg_icon_white.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html suppressHydrationWarning lang="en">
			<body
				className={`${cinzel.variable} ${inter.variable} font-sans antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
