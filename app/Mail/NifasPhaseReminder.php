<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NifasPhaseReminder extends Mailable
{
    use Queueable, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;
    }


    public function build()
    {
        return $this->view('emails.nifas-phase-reminder')
            ->subject('Pengingat Fase Nifas');
    }
}