<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Pengingat Kunjungan KF</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4b0082;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px;
        }
        .content {
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Pengingat Kunjungan Nifas</h1>
    </div>
    
    <div class="content">
        <p>Halo Bunda,</p>
        
        <p>Ini adalah pengingat untuk kunjungan masa nifas Anda:</p>
        
        <div style="background-color: #e7f3fe; border-left: 6px solid #2196F3; padding: 10px; margin: 15px 0;">
            <h3>Kunjungan KF {{ $phase }}</h3>
            <p><strong>Tanggal:</strong> {{ $date }}</p>
            <p>{{ $message }}</p>
        </div>
        
        <p>Periksa kesehatan Anda dan bayi secara rutin sangat penting untuk masa nifas yang sehat.</p>
        
        <p>Salam hangat,<br>
        Tim KIZARU BUNDA</p>
    </div>
    
    <div class="footer">
        <p>Email ini dikirim secara otomatis. Mohon jangan membalas email ini.</p>
    </div>
</body>
</html>