import mongoose from 'mongoose'

export const ConnectDB = async () => {
  if (process.env.NODE_ENV !== 'production') {
    // mongoose.models = {}
  }

  require('./User')
  require('./Product')
  require('./ProductOrder')

  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  const mongoDBConn = `mongodb://localhost/xyzpos`

  await mongoose.connect(process.env.MONGODB_LOCAL_URL || mongoDBConn, {
    connectTimeoutMS: 15000,
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  console.log('Connecting to db')
}
