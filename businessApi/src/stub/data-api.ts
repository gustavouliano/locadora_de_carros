import axios from "axios";

export class DataApi {

    protected static async doRequest<T>(method: string, route: string, body: T | {} = {}){
        let data: any;
        await axios({
            method,
            url: `http://localhost:8010/${route}`,
            headers: {
                'content-type': 'application/json',
            },
            data: body
        }).then(response => {
            data = response.data;
        }).catch(error => {
            console.log(error);
            throw new Error();
        });
        return data;
    }

}