export default function Footer() {
    return (
        <footer className="bg-gray-50 py-12 border-t border-gray-200">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <p className="text-gray-500">
                            © 2024 BundaSehat+. All rights reserved.
                        </p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-gray-700 font-medium mb-2">
                            Kontak Darurat:
                        </p>
                        <a
                            href="tel:+622112345678"
                            className="text-blue-600 font-semibold hover:underline flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            021-1234-5678
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
