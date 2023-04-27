const bcrypt = require('bcryptjs')
let chats = [
    //this is what it should look like
    /*{
        message: ['hakuna matata', 'hakuyta'],
        pin: 1234
    },
    {
        message: ['lets go', 'vamos'],
        pin: 1235
    }*/
]

module.exports = {
    createNewMessage : (req, res) => {
        console.log(res.body)
        //destructing the body
        const { pin, message } = req.body
        //look if the pin already exist
        for (let i = 0; i < chats.length; i++) {
            //if it does then we can just append to the array
            //compareSync will return true if pin matches and false otherwise
            const existing = bcrypt.compareSync(pin, chats[i].pinHash)//returns true or false
                if(existing) {
                    chats[i].messages.push(message)
                    let messagesToReturn = {...chats[i]}
                    delete messagesToReturn.pinHash
                    res.status(200).send(messagesToReturn)

                    return
                }


           /* 
           **use above instead**
           if(chats[i].pin === +pin) {
                chats[i].messages.push(message)
                return
            }*/
        }
        // encrypt pin prior to sending it to the database/array
        // if it doesn't we will create a new object and push to the array
        const salt = bcrypt.genSaltSync(10)
        //creating pinHash from pin using the hashSync method
        const pinHash = bcrypt.hashSync(pin, salt)
        const newObj = {
            pinHash,
            messages: [message]

        }
        
        //pushing to db/array
        chats.push(newObj)
        //creating a new object to send to the front-end so we can remove the pinHash
        let messagesToReturn = {...newObj}
        delete messagesToReturn.pinHash
        console.log(chats)
        res.status(200).send(messagesToReturn)

    },
}