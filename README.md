## Description

Cymulate’s Phishing Awareness vector is designed to evaluate your employees’
security awareness. It simulates phishing campaigns and detects weak links in your
organization. Since it is designed to reduce the risk of spear-phishing, ransomware or
CEO fraud, the solution can help you to avoid data breaches, minimize malware-related
downtime and save money on incident response.

## Features

User Authentication: Users can register, login, and manage their profiles.
Notifications: Users receive notifications for security awareness.


## Technologies Used

NestJS: Backend framework for building scalable and efficient server-side applications.
JWT: JSON Web Tokens for secure authentication and authorization.

## Installation

.cd task_backend

```bash
$ npm install
```

Copy .env.example to .env file(create new)


## Environment Configuration

PORT: The port on which the server will listen for incoming HTTP requests.
JWT_SECRET: Secret key used to sign JSON Web Tokens (JWTs) for authentication. 
JWT_ExpiresIn: The expiration time for JWT tokens.
EMAIL_SENDER: The email address from which emails will be sent.
EMAIL_PASS: The password or API key used to authenticate with the email service provider's SMTP server.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stay in touch

- Author - [Alexander Aleksanyan]