<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Sertifikat Penyelesaian Kunjungan Nifas</title>
    <style>
        @page {
            margin: 0;
            size: 1920px 1080px;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f8f9ff;
            width: 1920px;
            height: 1080px;
            position: relative;
        }

        .certificate-container {
            width: 1720px;
            height: 880px;
            margin: 100px auto;
            background-color: white;
            border: 8px solid #6366f1;
            border-radius: 20px;
            position: relative;
        }

        .top-decoration {
            width: 100%;
            height: 12px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #6366f1);
            border-radius: 12px 12px 0 0;
        }

        .header-section {
            text-align: center;
            padding: 20px 60px 30px;
            border-bottom: 3px solid #e5e7eb;
            background-color: #f8fafc;
        }

        .logo {
            width: 100px;
            height: 100px;
            margin: 0 auto 10px;
        }

        .logo img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        .brand-name {
            font-size: 36px;
            color: #6366f1;
            font-weight: bold;
            margin: 0;
            letter-spacing: 2px;
        }

        .main-content {
            padding: 50px 80px;
            text-align: center;
        }

        .certificate-title {
            font-size: 48px;
            color: #1f2937;
            font-weight: bold;
            margin: 0 0 15px;
            text-transform: uppercase;
            letter-spacing: 3px;
        }

        .certificate-subtitle {
            font-size: 28px;
            color: #6366f1;
            margin: 0 0 40px;
            font-weight: 600;
        }

        .recipient-section {
            margin: 40px 0;
            padding: 30px;
            background-color: #f1f5f9;
            border: 3px solid #6366f1;
            border-radius: 15px;
        }

        .recipient-label {
            font-size: 20px;
            color: #64748b;
            margin: 0 0 10px;
        }

        .recipient-name {
            font-size: 42px;
            color: #6366f1;
            font-weight: bold;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .achievement-grid {
            display: table;
            width: 100%;
            margin: 40px 0;
        }

        .achievement-row {
            display: table-row;
        }

        .achievement-item {
            display: table-cell;
            text-align: center;
            padding: 20px;
            border-right: 2px solid #e5e7eb;
            vertical-align: middle;
        }

        .achievement-item:last-child {
            border-right: none;
        }

        .achievement-number {
            font-size: 36px;
            color: #6366f1;
            font-weight: bold;
            margin: 0 0 10px;
        }

        .achievement-label {
            font-size: 16px;
            color: #64748b;
            margin: 0;
            font-weight: 600;
        }

        .completion-message {
            background-color: #f0f9ff;
            padding: 30px;
            border-radius: 15px;
            border-left: 6px solid #6366f1;
            margin: 40px 0;
        }

        .completion-message p {
            font-size: 18px;
            line-height: 1.6;
            color: #374151;
            margin: 10px 0;
        }

        .highlight {
            color: #6366f1;
            font-weight: bold;
        }

        .footer-section {
            padding: 20px 80px;
            margin-top: 20px;
            border-top: 3px solid #e5e7eb;
            background-color: #f8fafc;
        }

        .footer-content {
            display: flex;
            justify-content: center;
            /* Change from space-between to center */
            align-items: center;
            gap: 60px;
            /* Add spacing between elements */
        }

        .date-section {
            text-align: left;
            width: 25%;
        }

        .seal-section {
            text-align: center;
            width: 20%;
        }

        .signature-section {
            text-align: right;
            width: 25%;
        }

        .date-item {
            margin-bottom: 10px;
        }

        .date-label {
            font-size: 14px;
            color: #64748b;
            margin: 0;
        }

        .date-value {
            font-size: 18px;
            color: #6366f1;
            font-weight: bold;
            margin: 2px 0 0;
        }

        .certificate-seal {
            width: 80px;
            height: 80px;
            background-color: #6366f1;
            border-radius: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: white;
            font-weight: bold;
            border: 4px solid #1e40af;
        }

        .disclaimer {
            text-align: center;
            font-size: 12px;
            color: #64748b;
            margin-top: 10px;
            padding-bottom: 10px;
        }

        /* Decorative corners */
        .corner-decoration {
            position: absolute;
            width: 60px;
            height: 60px;
            border: 4px solid #6366f1;
        }

        .corner-tl {
            top: 30px;
            left: 30px;
            border-right: none;
            border-bottom: none;
            border-radius: 15px 0 0 0;
        }

        .corner-tr {
            top: 30px;
            right: 30px;
            border-left: none;
            border-bottom: none;
            border-radius: 0 15px 0 0;
        }

        .corner-bl {
            bottom: 30px;
            left: 30px;
            border-right: none;
            border-top: none;
            border-radius: 0 0 0 15px;
        }

        .corner-br {
            bottom: 30px;
            right: 30px;
            border-left: none;
            border-top: none;
            border-radius: 0 0 15px 0;
        }
    </style>
</head>

<body>
    <div class="certificate-container">
        <div class="top-decoration"></div>

        <!-- Decorative corners -->
        <div class="corner-decoration corner-tl"></div>
        <div class="corner-decoration corner-tr"></div>
        <div class="corner-decoration corner-bl"></div>
        <div class="corner-decoration corner-br"></div>

        <div class="header-section">
            <div class="logo">
                <img src="{{ public_path('storage/video_nifas/logo.png') }}" alt="Logo Rumah Nifas">
            </div>
            <h1 class="brand-name">RUMAH NIFAS</h1>
        </div>

        <div class="main-content">
            <h1 class="certificate-title">Sertifikat Penyelesaian</h1>
            <h2 class="certificate-subtitle">Kunjungan KF Nifas</h2>

            <div class="recipient-section">
                <p class="recipient-label">Diberikan kepada:</p>
                <h2 class="recipient-name">{{ $user->name }}</h2>
            </div>

            <div class="achievement-grid">
                <div class="achievement-row">
                    <div class="achievement-item">
                        <h3 class="achievement-number">4</h3>
                        <p class="achievement-label">Fase Kunjungan</p>
                    </div>
                    <div class="achievement-item">
                        <h3 class="achievement-number">100%</h3>
                        <p class="achievement-label">Tingkat Penyelesaian</p>
                    </div>
                    <div class="achievement-item">
                        <h3 class="achievement-number">KF1-4</h3>
                        <p class="achievement-label">Kunjungan Lengkap</p>
                    </div>
                </div>
            </div>
            <div class="achievement-grid">
                <div class="achievement-row">
                    <div class="achievement-item">
                        <h3 class="achievement-number">{{ $startDate }}</h3>
                        <p class="achievement-label">Tanggal Mulai</p>
                    </div>
                    <div class="achievement-item">
                        <h3 class="achievement-number">100%</h3>
                        <p class="achievement-label">42 Hari</p>
                    </div>
                    <div class="achievement-item">
                        <h3 class="achievement-number">{{ $completionDate }}</h3>
                        <p class="achievement-label">Tanggal Selesai</p>
                    </div>
                </div>
            </div>

            <div class="completion-message">
                <p><span class="highlight">Selamat!</span> Anda telah berhasil menyelesaikan seluruh rangkaian Kunjungan
                    KF Nifas dengan sempurna.</p>
                <p>Perjalanan Anda dalam merawat kesehatan pasca melahirkan telah menjadi <span
                        class="highlight">inspirasi</span> bagi banyak ibu lainnya.</p>
                <p>Teruslah menjadi ibu yang <span class="highlight">luar biasa</span> dan jaga selalu kesehatan Anda
                    dan si kecil.</p>
            </div>

        </div>


        <div class="disclaimer">
            <p>Sertifikat ini diterbitkan secara digital oleh Rumah Nifas • © {{ date('Y') }} Rumah Nifas. Hak Cipta
                Dilindungi.</p>
        </div>
    </div>
</body>

</html>
