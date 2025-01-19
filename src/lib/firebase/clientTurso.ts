import {createClient} from "@libsql/client";


export const client = createClient({
    url: process.env.NEXT_PUBLIC_DB_URL?? "",
    authToken: process.env.NEXT_PUBLIC_DB_TOKEN ?? ""
})

export default client;
