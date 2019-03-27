const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '1336263a14d84012a80c6a481096d610'
});

const handleRank = (db) => (req,res) => {
    if (req.body) {
        const { email, rank, imageUrl } = req.body;
        
        db('history')
        .returning('*')
        .insert({
            rank: rank,
            email: email,
            imageurl: imageUrl
        })
        .then(userHistory => {            
            db('users')
            .join('history', 'users.email', 'history.email')
            .where('users.email', "=", userHistory[0].email)
            .where('history.imageurl', '=', userHistory[0].imageurl)
            .returning('users.email', 'users.id', 'users.name', 'history.rank', 'history.imageurl')
            .then(user => {                
                if(user.length){
                    res.json({status: "success" ,user: user[0]})
                } else {
                    res.json({status: "User Doesn't Exist"})
                }
            })
            .catch(err => res.json({status: "Unable to Fetch User"}))
            })
        .catch(err => res.json({status: "Unable to Update History"}))        
    } else {
        res.json({status: "Nothing sent ...."})
    }
}

const handleFaceApi = (req, res) => {
    app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        if(data) {
            res.json({status: "success", data: data})
        }
    })
    .catch(err => res.json({status: "Unable to Detect"}))
}

module.exports = { handleRank , handleFaceApi }
