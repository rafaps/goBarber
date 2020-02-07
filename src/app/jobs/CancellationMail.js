import { format, parseISO, subHours } from 'date-fns';
import Mail from '../../lib/Mail';

class CancellationMail {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { appointment } = data;

        await Mail.sendMail({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Appointment was Cancelled',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parseISO(appointment.date, 10),
                    "'day' dd 'of' MMMM', at' H:mm'h'"
                ),
            },
        });
    }
}

export default new CancellationMail();
