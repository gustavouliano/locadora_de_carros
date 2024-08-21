import { CarModelCreateInputType } from "../routes/car-model-router";
import { CarCreateInputType } from "../routes/car-router";
import { CustomerCreateInputType } from "../routes/customer-router";
import { RentalCreateInputType } from "../routes/rental-router";
import { DataApi } from "./data-api";

class DataApiRequests extends DataApi {

    static async saveCarModel(carModel: CarModelCreateInputType) {

        return await this.doRequest('post', 'carro-modelo', carModel);
    }

    static async findCarModelById(id: String) {
        return await this.doRequest('get', 'carro-modelo/' + id);
    }

    static async findCarModel() {
        return await this.doRequest('get', 'carro-modelo');
    }

    static async saveCar(car: CarCreateInputType) {
        return await this.doRequest('post', 'carro', car);
    }

    static async findCarById(id: String) {
        return await this.doRequest('get', 'carro/' + id);
    }

    static async findCar() {
        return await this.doRequest('get', 'carro');
    }

    static async saveCustomer(customer: CustomerCreateInputType) {
        return await this.doRequest('post', 'cliente', customer)
    }

    static async findCustomers() {
        return await this.doRequest('get', 'cliente');
    }

    static async findCustomerById(id: String) {
        return await this.doRequest('get', 'cliente/' + id);
    }

    static async saveRental(rental: RentalCreateInputType) {
        return await this.doRequest('post', 'locacao', rental);
    }

    static async findRentals() {
        return await this.doRequest('get', 'locacao');
    }

    static async findRentalById(id: String) {
        return await this.doRequest('get', 'locacao/' + id);
    }

}

export default DataApiRequests;