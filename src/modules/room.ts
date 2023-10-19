import { EStatusDoc, TQueryParamsGetData } from "@src/configs/interface.config"

export type TCreateLayout = {
    name: string
    row: number
    col: number
    status: string
}

export type TQueryLayout = TQueryParamsGetData<{
    status?: EStatusDoc
}>
