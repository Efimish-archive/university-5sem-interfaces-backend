# Сервер для информационной системы для магазина электроники

## Маршруты

| Method |         Path         |  Auth |
| :----- | :------------------: | ----: |
| POST   |     /auth/login      |    no |
| POST   |    /auth/register    |    no |
| POST   |     /auth/logout     |  user |
| GET    |        /users        | admin |
| GET    |     /users/{id}      | admin |
| PUT    |     /users/{id}      | admin |
| DELETE |     /users/{id}      | admin |
| GET    |        /items        |  user |
| GET    |     /items/{id}      |  user |
| POST   |        /items        | admin |
| PUT    |     /items/{id}      | admin |
| DELETE |     /items/{id}      | admin |
| GET    |        /cart         |  user |
| POST   |     /cart/items      |  user |
| PUT    | /cart/items/{itemId} |  user |
| DELETE | /cart/items/{itemId} |  user |
| DELETE |        /cart         |  user |
| GET    |       /orders        |  user |
| GET    |     /orders/{id}     |  user |
| POST   |       /orders        |  user |
| PUT    |     /orders/{id}     | admin |
| GET    |     /orders/all      | admin |

user
user cart
order
item

## Запуск

```bash
bun start
bun dev # live reloading
```
