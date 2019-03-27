const handleRegister = (db, bcrypt ) => (req,res) => {    
    if (req.body) {
        const { name, email , password } = req.body;
        if (!email || !name || ! password ){
            return res.json({status: "Missing Form Field"})
        }
        const hash = bcrypt.hashSync(password,null);
        db.transaction(trx => {
            trx.insert({
                password: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(savedEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: savedEmail[0],
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json({status: "success", user:user[0]})
                })
            })            
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch( _ => res.json({status: "Unable To Register"}))
    } else {
        res.json({status: "Nothing sent to Register"})
    }
}

module.exports = { handleRegister }
