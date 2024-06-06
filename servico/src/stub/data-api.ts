import axios from "axios";
import { CarModelCreateInputType } from "../routes/car-model-router";
import { CarCreateInputType } from "../routes/car-router";

class DataApi {

    static async saveCarModel(carModel: CarModelCreateInputType) {
        await axios({
            method: 'post',
            url: 'http://localhost:8010/api-data/carro-modelo',
            headers: {
                'content-type': 'application/json',
            },
            data: carModel
        })
            .then(response => {
                carModel = response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return carModel;
    }

    static async findCarModelById(id: String) {
        let carModel = null;
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/carro-modelo/' + id,
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => {
                carModel = response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return carModel;
    }
    
    static async saveCar(car: CarCreateInputType) {
        await axios({
            method: 'post',
            url: 'http://localhost:8010/api-data/carro',
            headers: {
                'content-type': 'application/json',
            },
            data: car
        })
            .then(response => {
                car = response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return car;
    }

    static async getUserByEmail(email: string): Promise<any> {
        let user = null;
        await axios({
            method: 'get',
            url: 'http://172.18.0.2:3001/data/user/' + email,
            headers: {
                'content-type': 'application/json',
            }
        })
            .then(response => {
                user = response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return user;
    }

    static async addProduct(userId: string, description: string, quantity: number) {
        await axios({
            method: 'post',
            url: 'http://172.18.0.2:3001/data/products/',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                userId, description, quantity
            }
        })
            .then(response => {
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    static async removeProduct(userId: string, productDescription: string) {
        await axios({
            method: 'delete',
            url: 'http://172.18.0.2:3001/data/products/' + userId,
            headers: {
                'content-type': 'application/json',
            },
            data: {
                productDescription
            }
        })
            .then(response => {
            })
            .catch(error => {
                throw new Error(error);
            });
    }

    static async listProduct(userId: string) {
        let products: any[] = [];
        await axios({
            method: 'get',
            url: 'http://172.18.0.2:3001/data/products/' + userId,
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(response => {
                products = response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return products;
    }

}

export default DataApi;