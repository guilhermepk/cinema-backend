export class CreateSessionRequest {
  constructor(
    public readonly movie: string,
    public readonly showtime: string,
    public readonly room: string
  ) { }
}