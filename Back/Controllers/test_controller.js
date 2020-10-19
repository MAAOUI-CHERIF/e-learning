module.exports = {
    getUnicorn(req, res){
        res.send('Hi chaaaaaaaaaaaaaaaaaaaaaaaaaarliiiiiiiiiie')
    },
    getPoney(req,res){
        res.send("Moi j'adore partir à poil à l'aventure dans la forêt!")
    },
    getUnicornId(req,res){
        res.send("Tu as gagné la licorne : " + req.params.licorneid)
    }
}