import { Validation } from "./Validation";


export type DateType = Date | string;

export interface Mese {
    nome: string,
    giorni: number
}
export const mesi: Mese[] = [

    {
        nome: "Gennaio",
        giorni: 31
    },
    {
        nome: "Febbraio",
        giorni: 28
    },
    {
        nome: "Marzo",
        giorni: 31
    },
    {
        nome: "Aprile",
        giorni: 30
    },
    {
        nome: "Maggio",
        giorni: 31
    },
    {
        nome: "Giugno",
        giorni: 30
    },
    {
        nome: "Luglio",
        giorni: 31
    },
    {
        nome: "Agosto",
        giorni: 31
    },
    {
        nome: "Settembre",
        giorni: 30
    },
    {
        nome: "Ottobre",
        giorni: 31
    },
    {
        nome: "Novembre",
        giorni: 30
    },
    {
        nome: "Dicembre",
        giorni: 31
    },
]
export const settimana = [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledi",
    "Giovedì",
    "Venerdì",
    "Sabato",
]

export type SettingsNamedMonthFormatType = {
    /**
     * day - abilita le stringhe "Oggi" "Domani" "Ieri"
     * 
     * week - abilita le stringhe "Oggi" "Domani" "Ieri" e per una settimana antecedente i giorni della settimana
     */
    enableSingleString?: "day" | "week"

    /**
     * formato del tipo martedì, 30 lug
     */
    enableDayName?: boolean

}

export class DateFormat {



    /**
     * from iso string
     * dd/mm/yyyy 
     */
    static numericFormat(date: DateType, separator?: string, ignoreRegex?: boolean): string {

        if (typeof date === "string") {
            if (Validation.date(date).valid) {

                let generatedDate: string = "";
                date.split("/").forEach((x: string, index: number, array: string[]) => {
                    generatedDate += format(Number.parseInt(x));
                    if (index !== array.length - 1) generatedDate += separator ?? "/"
                })
                return generatedDate;
            }
            else if (!Number.isNaN(new Date(date).getMilliseconds())) {
                return this.numericFormat(new Date(date))
            }
            else {
                throw Error(`Formato date non valido\nmi aspettavo: 'dd/mm/yyyy' ,isostring oppure un oggetto Date\nho ricevuto: '${date}'\nNota: l'errore è spesso causato dal passaggio da datePiker normale a rangePicker, ricaricare la pagina e il problema sarà risolto`)
            }
        }

        function format(n: number, offset?: number) {
            if (offset) n += offset

            if (n < 10) return "0" + n.toString()
            else return n.toString()
        }

        const s = separator ?? "/"

        return format(date.getDate()) + s + format(date.getMonth(), 1) + s + date.getFullYear().toString()
    }

    /**
     * Metodo che data in input una data la ritorna nel formato `1 Gen 2024`
     * @param date data in formato `Date` o `string` 
     * @returns data nel nuovo formato (es. 17 Mag 2024)
     */
    static namedMonthFormat(date: DateType, settings?: SettingsNamedMonthFormatType): string {

        const numericFormat = this.numericFormat(date)
        const parts = numericFormat.split("/");

        if (settings) {
            if (settings.enableSingleString) {
                if (new Date(date).toDateString() === new Date().toDateString()) return "Oggi"
                else if (new Date(date).toDateString() === new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24).toDateString()) return "Ieri"
                else if (new Date(date).toDateString() === new Date((new Date()).valueOf() + 1000 * 60 * 60 * 24).toDateString()) return "Domani"

                if (settings.enableSingleString === "week") {
                    for (let i = 6; i > 1; i--) {           // 5 4 3 2 1
                        if(new Date(date).toDateString() === new Date((new Date()).valueOf() - (i * 1000) * 60 * 60 * 24).toDateString()){
                            return this.getNamedDay(date);
                        }
                    }
                }
            }

            if (settings.enableDayName) {
                return this.getNamedDay(date) + ", " + parts[0] + " " + this.getNamedMonth(date, { smallName: true }).toLowerCase()
            }
        }


        return parts[0] + " " + this.getNamedMonth(date, { smallName: true }) + " " + parts[2]
    }

    static hoursFormat(date: Date) {
        return String(date.getHours()).padStart(2, '0') + ":" + String(date.getMinutes()).padStart(2, '0')
    }

    /**
     * 
     * @param date
     * @return lunedì, martedì, mercoledì, giovedì, venerdì, sabato, domenica
     */
    static getNamedDay(date: DateType, options?: { smallName?: boolean }): string {
        date = new Date(date);
        let out: string = settimana[date.getDay()];

        if (options) {
            if (options.smallName) out = out.slice(0, 3);
        }

        return out;
    }

    /**
     * 
     * @param date
     * @return Gennaio, Febbraio, Marzo ... Dicembre
     */
    static getNamedMonth(date: DateType, options?: { smallName?: boolean }): string {
        const numericFormat = this.numericFormat(date)
        let out: string = mesi[Number.parseInt(numericFormat.split("/")[1]) - 1].nome;

        if (options) {
            if (options.smallName) out = out.slice(0, 3);
        }

        return out;
    }

    static getDay(date: DateType): string {
        return this.numericFormat(date).split("/")[0]
    }

    static getMonth(date: DateType): string {
        return this.numericFormat(date).split("/")[1]
    }

    static getYear(date: DateType): string {
        return this.numericFormat(date).split("/")[2]
    }

    /**
     * 
     * @param date iso string
     * @returns 
     */
    static TextDistance(date: string): string {

        let data = new Date(date);
        let dataOggi = new Date()



        if (this.numericFormat(date) === this.numericFormat(dataOggi)) {      //se è oggi

            let differenza = Math.round(((dataOggi.getTime() - data.getTime()) / 1000) / 60)          //minuti


            if (differenza >= 0) {           //evento già successo

                if (differenza <= .5) {       //30s
                    return "Adesso"
                }

                if (differenza < 60) {
                    if (differenza === 1) return `${differenza} minuto fa`
                    else return `${differenza} minuti fa`
                }

                //ore
                differenza = Math.round(differenza / 60);
                if (differenza === 1) return `${differenza} ora fa`;
                return `${differenza} ore fa`;
            }

            // evento che deve succedere
            differenza *= -1;

            if (differenza < 60) {
                if (differenza === 1) return `tra ${differenza} minuto`
                else return `tra ${differenza} minuti`
            }

            //ore
            differenza = Math.round(differenza / 60);
            if (differenza === 1) return `tra ${differenza} ora`;
            return `tra ${differenza} ore`;

        }
        else {                                                                  // se non è oggi

            let differenza = Math.round((dataOggi.getTime() - data.getTime()) / 86400000)          //giorni

            if (data < dataOggi) {                                              // evento già successo ma non oggi

                if (differenza < 7) {
                    if (differenza === 1) return `${differenza} giorno fa`;
                    return `${differenza} giorni fa`;
                }

                differenza = Math.round(differenza / 7)        //settimane

                if (differenza < 4.34524) {                    //4,34524 settimane in un mese
                    if (differenza === 1) return `${differenza} settimana fa`;
                    return `${differenza} settimane fa`;
                }

                differenza = Math.round(differenza / 4.34524)        //mesi

                if (differenza < 12.0082) {                    //4,34524 settimane in un mese
                    if (differenza === 1) return `${differenza} mese fa`;
                    return `${differenza} mesi fa`;
                }

                differenza = Math.round(differenza / 12.0082)        //anni

                if (differenza === 1) return `${differenza} anno fa`;
                return `${differenza} anni fa`;


            }
            differenza *= -1                                                    //evento che deve succedere ma non oggi

            if (differenza < 7) {
                if (differenza === 1) return `tra ${differenza} giorno`;
                return `tra ${differenza} giorni`;
            }

            differenza = Math.round(differenza / 7)        //settimane

            if (differenza < 4) {                    //4,34524 settimane in un mese
                if (differenza === 1) return `tra ${differenza} settimana`;
                return `tra ${differenza} settimane`;
            }

            differenza = Math.round(differenza / 4.34524)        //mesi

            if (differenza < 12) {                    //4,34524 settimane in un mese
                if (differenza === 1) return `tra ${differenza} mese`;
                return `tra ${differenza} mesi`;
            }

            differenza = Math.round(differenza / 12.0082)        //anni

            if (differenza === 1) return `tra ${differenza} anno`;
            return `tra ${differenza} anni`;

        }
    }

    static minuteFormat(millis: number) {

        let output = "";

        const seconds = ((millis % 60000) / 1000).toFixed(0);
        const minutes = Math.floor(millis / 60000);

        if (minutes == 0) output += "0:";
        else if (minutes < 10) output += "0" + minutes + ":";
        else output += minutes + ":";

        return minutes + ":" + (parseInt(seconds) < 10 ? '0' : '') + seconds;

        return output
    }
}