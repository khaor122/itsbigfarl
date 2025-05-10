import bcrypt from 'bcryptjs'

async function main() {
  const plainPassword = 'yourpassword123' // replace with your desired password
  const hashed = await bcrypt.hash(plainPassword, 10)
  console.log('Hashed password:', hashed)
}

main()
