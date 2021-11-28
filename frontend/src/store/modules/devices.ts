import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import { deviceApi } from '@/api/interface'
import store from '@/store'
import { Device } from 'wgrest/dist/models'

export interface IDeviceState {
  devices: Device[]
}

@Module({ dynamic: true, store, name: 'device' })
class Devices extends VuexModule implements IDeviceState {
  public devices: Device[] = []

  @Mutation
  private SET_DEVICES(devices: any[]) {
    this.devices = devices
  }

  @Action
  // eslint-disable-next-line camelcase
  public async getDevicesList(query: { per_page?: number, page?: number }): Promise<void> {
    // eslint-disable-next-line camelcase
    const { per_page = 100, page = 0 } = query
    const { data } = await deviceApi.listDevices(per_page, page)
    this.SET_DEVICES(data)
  }
}

export const DevicesModule = getModule(Devices)
