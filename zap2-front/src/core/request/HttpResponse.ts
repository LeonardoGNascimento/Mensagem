export class HttpResponse<T> {
  constructor(public data: T, public status: number, public hasErro: boolean) {}
}
