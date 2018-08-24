var Vacation = require('../models/vacation.js');

exports.vacations = function (req, res) {
    Vacation.find({ available: true }, function (err, vacations) {
        var context = {
            vacations: vacations.map(function (vacation) {
                return {
                    sku: vacation.sku,
                    name: vacation.name,
                    description: vacation.description,
                    price: vacation.price,
                    inSeason: vacation.inSeason,
                }
            })
        };
        res.render('vacations', context);
    });
};