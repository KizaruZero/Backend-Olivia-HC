<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Sertifikat Penyelesaian Kunjungan Nifas</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            padding: 20px 0;
            background: linear-gradient(135deg, #ffffff, #e6f3ff);
            border-radius: 8px 8px 0 0;
            margin: -20px -20px 20px -20px;
        }

        .header h1 {
            color: #2196f3;
            margin: 0;
            font-size: 24px;
        }

        .logo {
            width: 100px;
            height: 100px;
            margin: 0 auto 20px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .message {
            margin: 20px 0;
            color: #555;
        }

        .highlight {
            color: #2196f3;
            font-weight: bold;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }

        .pdf-notice {
            background-color: #e6f3ff;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
        }

        .pdf-notice p {
            margin: 5px 0;
            color: #2196f3;
        }

        .dates {
            margin: 20px 0;
            color: #555;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('storage/video_nifas/logo.png') }}" alt="Rumah Nifas Logo" class="logo">
            <h1>Rumah Nifas</h1>
        </div>

        <div class="content">
            <div class="message">
                <h2>Selamat {{ $user->name }}! 🎉</h2>
                <p>Anda telah berhasil menyelesaikan seluruh rangkaian Kunjungan KF Nifas dari fase 1-4.</p>
                <p>Perjalanan Anda dalam merawat kesehatan pasca melahirkan telah menjadi inspirasi bagi banyak ibu
                    lainnya.</p>
                <p>Teruslah menjadi ibu yang luar biasa dan jaga selalu kesehatan Anda dan si kecil.</p>
            </div>

            <div class="pdf-notice">
                <p>📄 Sertifikat Penyelesaian Anda telah disiapkan!</p>
                <p>Silakan unduh sertifikat digital Anda yang terlampir dalam email ini.</p>
                <p>Sertifikat ini dapat Anda simpan dan bagikan sebagai bukti penyelesaian program.</p>
            </div>

            <div class="dates">
                <p>Tanggal Mulai: {{ $startDate }}</p>
                <p>Tanggal Penyelesaian: {{ $completionDate }}</p>
            </div>
        </div>

        <div class="footer">
            <p>Terima kasih telah mempercayakan perawatan nifas Anda kepada Rumah Nifas.</p>
            <p>© {{ date('Y') }} Rumah Nifas. Hak Cipta Dilindungi.</p>
        </div>
    </div>
</body>

</html>
