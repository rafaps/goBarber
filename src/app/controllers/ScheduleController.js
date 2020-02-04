import { startOfDay, endOfDay, parseISO, addHours } from 'date-fns';

import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController {
    async index(req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkUserProvider) {
            return res.status(401).json('User is not a provider');
        }

        const { date } = req.query;
        const parsedDate = parseISO(date);

        const appointment = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [
                        addHours(startOfDay(parsedDate), 10),
                        addHours(endOfDay(parsedDate), 10),
                    ],
                },
            },
            order: ['date'],
        });

        return res.json(appointment);
    }
}

export default new ScheduleController();
