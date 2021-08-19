const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://sidharth23:Unlock@M008@cluster0.yneh6.mongodb.net/devhive',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})