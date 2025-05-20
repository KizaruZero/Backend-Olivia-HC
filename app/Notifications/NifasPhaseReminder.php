<?php

namespace App\Notifications;

use App\Models\Nifas;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;


class NifasPhaseReminder extends Notification
{
    use Queueable;

    protected $nifas;
    protected $phaseName;
    protected $phaseDescription;

    /**
     * Create a new notification instance.
     */
    public function __construct(Nifas $nifas, $phaseName, $phaseDescription)
    {
        $this->nifas = $nifas;
        $this->phaseName = $phaseName;
        $this->phaseDescription = $phaseDescription;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database']; // Kirim ke email dan simpan di database
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        \Log::info('Mencoba mengirim email ke: ' . $notifiable->email, [
            'user_id' => $notifiable->id,
            'phase' => $this->phaseName
        ]);

        return (new MailMessage)
            ->subject('Pengingat ' . $this->phaseName . ' - Program Edukasi Ibu Hamil')
            ->greeting('Halo ' . $notifiable->name . ',')
            ->line('Ini adalah pengingat untuk masa nifas Anda.')
            ->line('Anda ' . $this->phaseDescription . '.')
            ->line('Berikut beberapa hal yang perlu Anda perhatikan pada fase ini:')
            ->line('- Kontrol ke dokter/bidan')
            ->line('- Perhatikan tanda bahaya nifas')
            ->line('- Pastikan nutrisi yang baik untuk Anda dan bayi')
            ->action('Lihat Detail di Website', url('/dashboard'))
            ->line('Terima kasih telah menggunakan layanan kami!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'nifas_id' => $this->nifas->id,
            'phase_name' => $this->phaseName,
            'message' => 'Anda ' . $this->phaseDescription,
        ];
    }
}