const handleShowUsers = (db) => (req,res) => {
    db.select("*").from('users')
    .returning('*')
    .then(users => {
        res.json({status: "success", users:users});
    })
    .catch(err => res.json({status: "Unable to Fetch Users"}))
}

module.exports = { handleShowUsers }
