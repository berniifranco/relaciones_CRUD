const db = require('../database/models');

const actorsController = {
    list: (req, res) => {
        db.Actor.findAll()
            .then(function(actores) {
                res.render('actorsList', {actors: actores})
            })
    },
    detail: (req, res) => {
        db.Actor.findByPk(req.params.id, {
            include: [{association: 'peliculas_favoritas'}]
        })
            .then(function(actor) {
                res.render('actorsDetail', {actor: actor})
            })
    },
    add: (req, res) => {
        db.Movie.findAll()
            .then(function(movies) {
                res.render('actorsAdd', {allMovies: movies})
            })
    },
    create: (req, res) => {
        db.Actor.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie_id
        })
            .then(function() {
                res.redirect('/actors')
            })
    },
    edit: (req, res) => {
        db.Movie.findAll({
            include: [{association: 'actores_favoritos'}]
        })
            .then(function(movies) {
                db.Actor.findByPk(req.params.id, {
                    include: [{association: 'peliculas_favoritas'}]
                })
                    .then(function(Actor) {
                        res.render('actorsEdit', {Actor, allMovies: movies})
                    })
            });
    },
    update: (req, res) => {
        db.Actor.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            rating: req.body.rating,
            favorite_movie_id: req.body.favorite_movie_id
        }, {
            where: {
                id: req.params.id
            }
        })
            .then(function() {
                res.redirect('/actors/detail/' + req.params.id)
            })
    },
    delete: (req, res) => {
        db.Actor.findByPk(req.params.id)
            .then(function(actor) {
                res.render('actorsDelete', {actor})
            })
    },
    destroy: (req, res) => {
        db.Actor.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function(){
                res.redirect('/actors')
            })
    }
};

module.exports = actorsController;