import { HttpException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import axios from "axios";
import { AxiosError } from "axios";

const SERVICE_UNAVAILABLE_CODES = new Set(['ECONNREFUSED', 'ECONNABORTED']);

@Injectable()
export class HttpClient {
  private client: axios.AxiosInstance;

  constructor(
    baseURL: string,
    public readonly alias: string
  ) {
    this.client = axios.create({
      baseURL: baseURL,
      timeout: 5000
    });
  }

  private async tryOrFail<Return>(callback: () => Return): Promise<Return> {
    try {
      return await callback();
    } catch (error: unknown) {
      if (error instanceof AxiosError === false) throw error;

      const status = error.response?.status || error.status;

      if (status) {
        const originalErrorData: any = error.response?.data;
        const originalErrorIsValidObject: boolean = typeof originalErrorData === 'object' && originalErrorData !== null;

        const errorData = originalErrorIsValidObject ? { ...originalErrorData } : { message: error.message };
        errorData.origin = this.alias;

        throw new HttpException(errorData, status);
      } else if (error.code) {
        if (SERVICE_UNAVAILABLE_CODES.has(error.code)) {
          throw new ServiceUnavailableException('Serviço indisponível. Tente novamente mais tarde', { cause: `Serviço "${this.alias}": ${error.message}` });
        }
      }

      throw error;
    }
  }

  async post<Return = any, Payload = Object | undefined>(
    endpoint: string,
    data: Payload
  ): Promise<Return> {
    return this.tryOrFail(async () => {
      const response = await this.client.post<Return>(endpoint, data);
      return response.data;
    });
  }
}