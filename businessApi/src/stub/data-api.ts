import axios from "axios";
import { CarModelCreateInputType } from "../routes/car-model-router";
import { CarCreateInputType } from "../routes/car-router";
import { CustomerCreateInputType } from "../routes/customer-router";
import { RentalCreateInputType } from "../routes/rental-router";

class DataApi {

    static async saveCarModel(carModel: CarModelCreateInputType) {
        await axios({
            method: 'post',
            url: 'http://localhost:8010/api-data/carro-modelo',
            headers: {
                'content-type': 'application/json',
            },
            data: carModel
        }).then(response => {
            carModel = response.data;
        }).catch(error => {
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
        }).then(response => {
            carModel = response.data;
        }).catch(error => {
            console.log(error);
        });
        return carModel;
    }

    static async findCarModel() {
        let carModels: any[] = [];
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/carro-modelo',
            headers: {
                'content-type': 'application/json',
            }
        }).then(response => {
            carModels = response.data;
        }).catch(error => {
            console.log(error);
        });
        return carModels;
    }

    static async saveCar(car: CarCreateInputType) {
        await axios({
            method: 'post',
            url: 'http://localhost:8010/api-data/carro',
            headers: {
                'content-type': 'application/json',
            },
            data: car
        }).then(response => {
            car = response.data;
        }).catch(error => {
            throw new Error(error);
        });
        return car;
    }

    static async findCarById(id: String) {
        let car = null;
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/carro/' + id,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            car = response.data
        }).catch(error => {
            throw new Error(error);
        })
        return car;
    }

    static async findCar() {
        let cars: any[] = [];
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/carro',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            cars = response.data
        }).catch(error => {
            throw new Error(error);
        })
        return cars;
    }

    static async saveCustomer(customer: CustomerCreateInputType) {
        await axios({
            method: 'post',
            url: 'http://localhost:8010/api-data/cliente',
            headers: {
                'Content-Type': 'application/json'
            },
            data: customer
        }).then(response => {
            customer = response.data;
        }).catch(error => {
            console.log(error);
            throw new Error(error);
        })
        return customer;
    }

    static async findCustomers() {
        let customers: any[] = [];
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/cliente',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            customers = response.data;
        }).catch(error => {
            throw new Error(error);
        })
        return customers;
    }

    static async findCustomerById(id: String) {
        let customer = null;
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/cliente/' + id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            customer = response.data;
        }).catch(error => {
            throw new Error(error);
        });
        return customer;
    }

    static async saveRental(rental: RentalCreateInputType) {
        await axios({
            method: 'post',
            url: 'http://localhost:8010/api-data/locacao',
            headers: {
                'Content-Type': 'application/json'
            },
            data: rental
        }).then(response => {
            rental = response.data;
        }).catch(error => {
            throw new Error(error);
        })
        return rental;
    }

    static async findRentals() {
        let rentals: any[] = [];
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/locacao',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            rentals = response.data;
        }).catch(error => {
            throw new Error(error);
        })
        return rentals;
    }

    static async findRentalById(id: String) {
        let rental = null;
        await axios({
            method: 'get',
            url: 'http://localhost:8010/api-data/locacao/' + id,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            rental = response.data;
        }).catch(error => {
            throw new Error(error);
        });
        return rental;
    }

}

export default DataApi;