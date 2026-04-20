export class CreateSessionResponse {
  constructor(
    public readonly id: string,
    public readonly movie: string,
    public readonly datetime: string,
    public readonly room: string,
  ) { }
}