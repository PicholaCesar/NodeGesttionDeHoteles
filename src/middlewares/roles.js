
exports.AdminDeApp = function(req, res, next) {
    if(req.user.rol !== "AdminDeAPP") return res.status(403).send({mensaje: "Solo puede acceder el ADMINAPP"})
    
    next();
}

exports.Usuario = function(req, res, next) {
    if(req.user.rol !== "Usuario") return res.status(403).send({mensaje: "Solo puede acceder el Usuario"})
    
    next();
}

exports.AdminDeHotel = function(req, res, next) {
    if(req.user.rol !== "AdminDeHotel") return res.status(403).send({mensaje: "Solo puede acceder el AdminDeHotel"})
    
    next();
}