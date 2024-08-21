import axios from "axios";

export class DataApi {

    protected static async doRequest<T>(method: string, route: string, body: object = {}){
        let data: any;
        await axios({
            method,
            url: `http://data-api:8010/api-data/${route}`,
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