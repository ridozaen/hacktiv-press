# hacktiv-press
about hacktiv activities

## User
| Route          | HTTP   | Description                                                |
|----------------|--------|------------------------------------------------------------|
| `/api/register`  | POST   | Sign up with new user info                                 |
| `/api/login`     | POST   | Sign in while get an access token based on credentials     |

## Articles

Route | HTTP | Description
--- | --- | ---
`/api/articles` | GET | Get all articles
`/api/articles/:id` | GET | Get article by id
`/api/articles/author/:query` | GET | Get articles by author
`/api/articles/category/:query` | GET | Ger articles by category
`/api/articles/add` | POST | Post new article
`/api/articles/update/:id` | PUT | Update one existing article
`/api/articles/delete/:id` | DELETE | Delete one existing article