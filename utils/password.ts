import bcrypt from 'bcrypt'

const saltRounds = 10

export const generateHash = text => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(text, saltRounds, function (err, hash) {
      if (err) return reject(err)
      return resolve(hash)
    })
  ) as Promise<string>
}

export const compareHash = (text, hash) => {
  return bcrypt.compare(text, hash)
}
