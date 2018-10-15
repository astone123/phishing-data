[![Build Status](https://travis-ci.org/astone123/phishing-data.svg?branch=master)](https://travis-ci.org/astone123/phishing-data)

# Phishing Data 🎣

This project helps to visualize data about phishing sites that have been reported to [PhishTank](http://www.phishtank.com/).

## What Is Phishing?

Phishing is a type of cyber attack where an attacker tries to gain personal information such as account credentials, usually by impersonating a trusted individual or business entity.

## Why Does This Matter?

According to [PhishMe's Enterprise Phishing Resiliency and Defense Report in 2017](https://cofense.com/wp-content/uploads/2017/11/Enterprise-Phishing-Resiliency-and-Defense-Report-2017.pdf), the number of phishing attacks worldwide had increased by 65% in the previous year. 

These attacks, when successful, can cause considerable damage to both individuals and businesses. Internet users must constantly remain vigilant to phishing attacks because they can come in unexpected forms and catch users off guard.

[PhishTank](http://www.phishtank.com/) allows for reporting of phishing sites that attackers use to steal credentials from users. This application takes the data reported on PhishTank and helps to visualize it in a different way.

## Just Show Me the Site

If you don't want to install this project locally, you can interact with the latest build of the site at https://phishing-client.cfapps.io/

## Stack
- React
- Node JS/Express

## Requirements

Running this project locally requires that you have [Docker](https://www.docker.com/) installed on your machine.

## Installation

To run this project locally, clone this repository

```
git clone https://github.com/astone123/phishing-data.git
```

and run

```
./start.sh
```

from the root directory of the project. Once the Docker containers have built, the app should be accessible at `http://localhost:3000`.

## Running Tests

To run tests for the client or server apps, `cd` into the directory that you want to run tests for, then install dependencies with 

```
npm i
```

Once dependencies are installed, run tests with
```
yarn test
```
