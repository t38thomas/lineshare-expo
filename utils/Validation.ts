import { ValidateReturn } from "../Components/Generali/TextInput";

 
export type ValidationFunction = (str: string) => ValidateReturn

export class Validation {

    public static email(str: string): ValidateReturn {
        const regex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const msg: string = "Email non valida"

        if (regex.test(str)) return { valid: true } as ValidateReturn
        else return { valid: false, msg: msg } as ValidateReturn
    }

    public static password(str: string): ValidateReturn {
        const regex: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const msg: string = "Deve contenere almeno 8 caratteri tra cui almeno un numero";

        if (regex.test(str)) return { valid: true } as ValidateReturn
        else return { valid: false, msg: msg } as ValidateReturn
    }

    public static username(str: string): ValidateReturn {
        const regex: RegExp = /^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/
        const msg: string = "Username non valido";

        if (regex.test(str)) {
            //vede se già esiste nel database
            const usernameNonTrovatoNelDatabase = true; //fare la richiesta

            if (usernameNonTrovatoNelDatabase) return { valid: true }
            else return { valid: false, msg: "Username già in uso" }
        }
        else return { valid: false, msg: msg }
    }

    public static date(str: string): ValidateReturn {
        const regex: RegExp = /^([1-9]|0[1-9]|[12][0-9]|3[0-1])\/([1-9]|0[1-9]|1[0-2])\/\d{4}$/
        const msg: string = "Data non valida"

        if (regex.test(str)) return { valid: true } as ValidateReturn
        else return { valid: false, msg: msg } as ValidateReturn
    }


    public static phoneNumber(str: string): ValidateReturn {
        const regex: RegExp = /^(\((00|\+)39\)|(00|\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\d{7}$/
        const msg = "Numero non valido"

        if(regex.test(str)) return { valid: true } as ValidateReturn
        else return { valid: false, msg: msg } as ValidateReturn
    }

    public static oneChar(str: string) : ValidateReturn{
        const msg = "Il campo non può essere vuoto";

        if(str.trim().length > 0) return {valid: true} as ValidateReturn
        else return {valid: false, msg: msg} as ValidateReturn
    }

    public static hex(str:string):ValidateReturn{
        const regex: RegExp = /^#(?:[0-9a-fA-F]{3}){1,2}$/
        const msg = "Esadecimale non valido";

        if(regex.test(str)) return { valid: true } as ValidateReturn
        else return { valid: false, msg: msg } as ValidateReturn
    }


}