export default function Branding3DLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-transparent m-0 p-0 overflow-hidden text-black dark:text-white">
                {children}
            </body>
        </html>
    );
}
