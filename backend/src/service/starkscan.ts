import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'
import { Provider } from 'starknet'
import { StarknetChainId } from 'starknet/dist/constants'

export class StarkscanService {
  private provider: Provider
  private axiosClient: AxiosInstance

  constructor(provider: Provider) {
    this.provider = provider

    switch (this.provider.chainId) {
      case StarknetChainId.MAINNET:
        this.axiosClient = axios.create({ baseURL: 'https://api.starkscan.co' })
        break
      case StarknetChainId.TESTNET:
      default:
        this.axiosClient = axios.create({
          baseURL: 'https://api-testnet.starkscan.co',
        })
        break
    }
    axiosRetry(this.axiosClient, { retries: 3 })
  }

  getAxiosClient() {
    return this.axiosClient
  }
}
