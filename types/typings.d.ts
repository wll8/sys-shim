import CommonClient from "rpc-websockets/dist/lib/client"

declare namespace GlobalType {
  interface CommonClient_ extends CommonClient {}
}

export = GlobalType;
export as namespace GlobalType;
