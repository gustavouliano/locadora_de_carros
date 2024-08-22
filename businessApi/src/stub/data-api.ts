import axios from "axios";

export class DataApi {

    protected static async doRequest<T>(method: string, route: string, body: object = {}): Promise<any> {
        let attempts = 0;
        let data: any;
        let success = false;

        do {
            let uri = await DataApi.getUri();
            await axios({
                method,
                url: `http://${uri}/${route}`,
                headers: {
                    'content-type': 'application/json',
                },
                data: body
            }).then(response => {
                data = response.data;
                success = true;
            }).catch(error => {
                console.log(error);
                attempts++;
            });
            if (success){
                return data;
            }
        } while (attempts < 3);
        throw new Error('Não foi possível conectar-se à API de dados.');
    }

    private static async getUri() {
        let uri = '';
        await axios({
            method: 'get',
            url: 'http://scheduler-api:8020/api-scheduler/data'
        }).then(response => {
            uri = response.data.address;
        }).catch(error => {
            console.log(error);
            throw new Error();
        })
        return uri;
    }

}