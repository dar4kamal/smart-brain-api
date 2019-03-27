const handleSignin = (db, bcrypt) => (req,res) => {    
    if (req.body) {
        const { email , password } = req.body;
        db.select('*').from("login")
        .where('email', '=', email)
        .returning("*")
        .then(user => {
            const isValid = bcrypt.compareSync(password, user[0].password);            
            if(isValid) {
                return db.select("*").from("users")
                .where("email", "=", email)
                .returning('*')
                .then(user => {
                    res.json({
                        status: "success",
                        user: user[0]
                    })
                })
            } else {
                res.json({status: "Wrong Credentials"})
            }
        })
        .catch(err => res.json({status:"Unable To Signin"}))
    } else {
        res.json({status:"Nothing sent to Verify Signin"})
    }
}

module.exports = { handleSignin }