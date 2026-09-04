import { hashPassword } from "./bcrypt"

function hashPass() {
    const hash = hashPassword("123Adwd@");
    console.log(hash);
}

hashPass();