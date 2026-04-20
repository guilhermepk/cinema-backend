- [ ] Document in `"Future Improvements"` the idea of using a `websocket` for the `"ReservationExpired"` topic to notify the frontend that the reservation has expired and improve `UX`, in a real-world scenario with a frontend.
- [ ] Use the same Kafka `key` for the `"ReservationCreated"` and `"PaymentConfirmed"` topics so they are routed to the same partition, ensuring that messages are processed in the order they were sent.

- [] Create session (and seats)
- [ ] Find all sessions
- [ ] Find one session
- [ ] Update session
- [ ] Delete session (and seats)

- [ ] Create reservation
- [ ] Pay reservation
- [ ] Delete reservation (cron)

- [] Cache with Redis