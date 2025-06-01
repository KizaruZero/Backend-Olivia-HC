<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Nifas;
use PDF;
use Carbon\Carbon;


class NifasCompletionCertificate extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $nifas;
    public $completionDate;
    public $startDate;

    public function __construct(User $user, Nifas $nifas)
    {
        $this->user = $user;
        $this->nifas = $nifas;
        $this->completionDate = now()->format('d F Y');
        $this->startDate = $nifas->start_date ? Carbon::parse($nifas->start_date)->format('d F Y') : '-';
    }

    public function build()
    {
        // Generate PDF
        $pdf = PDF::loadView('pdfs.nifas-completion-certificate', [
            'user' => $this->user,
            'nifas' => $this->nifas,
            'completionDate' => $this->completionDate,
            'startDate' => $this->startDate
        ]);

        return $this->subject('Sertifikat Penyelesaian Kunjungan Nifas - Rumah Nifas')
            ->view('emails.nifas-completion-certificate')
            ->attachData($pdf->output(), 'sertifikat-nifas.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}