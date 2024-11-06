import { AxiosError } from "axios";

export default class CustomAxiosResponse {
    constructor(
        public err?: AxiosError | null,
        public res?: any,
    ){}
}