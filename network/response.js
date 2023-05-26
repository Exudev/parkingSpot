exports.success = function (req, res){
    res.send('Primera respuesta')
}

exports.error = function(req, res, message, status, details){
console.error('[response error:]'+details);
res.status(status||500).send({
    error:message,
    body:'',
});
}