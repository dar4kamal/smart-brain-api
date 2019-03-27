const handleProfileGet = (db) => (req,res) => {
    if (req) {
        const { userId } = req.params;
        db.select('*').from('users').where({
            id: userId
        })
        .returning('*')
        .then(user => {
            if(user.length){
                res.json({status: "success", user: user[0]})
            } else {
                res.json({status: "User Doesn't Exist"})
            }
        })
        .catch(err => res.json({status: "Unable to Fetch User"}))
    } else {
        res.json({status: "Nothing sent ..."})
    }
}

module.exports = { handleProfileGet }
