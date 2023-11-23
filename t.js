import bcrypt from 'bcrypt'

(async () => {
    const hashedPassword = await bcrypt.hash('200420102020T', 12);
    console.log(hashedPassword)
})() //