export class CreateSessionRequest {
  constructor(
    public readonly movie: string,
    public readonly showtime: string,
    public readonly room: string
  ) { }

  toString(): string {
    return `{"movie": "${this.movie}", "showtime": "${this.showtime}", "room": "${this.room}"}`;
  }
}