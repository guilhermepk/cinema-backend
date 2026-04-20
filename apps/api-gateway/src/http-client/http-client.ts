import { Injectable, ServiceUnavailableException } from "@nestjs/common";
import axios from "axios";
import { AxiosError } from "axios";

@Injectable()
export class HttpClient {
  private client: axios.AxiosInstance;

  constructor(
    baseURL: string
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
      if (error instanceof AxiosError && error.code) {
        const { code } = error;
        const serviceUnavailableErrors = ['ECONNREFUSED', 'ECONNABORTED'];

        if (serviceUnavailableErrors.includes(code)) {
          throw new ServiceUnavailableException('Serviço indisponível. Tente novamente mais tarde');
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