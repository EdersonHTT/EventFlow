import { hashPassword } from "./bcrypt"

async function hashPass() {
    const hash = await hashPassword("123Admin@");
    console.log(hash);
}

hashPass();