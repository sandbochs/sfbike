[ ![Codeship Status for sandbochs/sfbike](https://www.codeship.io/projects/f758c4c0-8d8e-0131-79d8-6e593527c391/status?branch=master)](https://www.codeship.io/projects/16035)

## San Francisco Bicycle Parking Locator
   - Full Stack implementation
   - Technical Choices:

- Backend: Rails API (1.5 years experience) - Rails is a great framework for providing an API for a front end application to talk to. It allows developers to quickly supply a prototype application with backend models and persistence.

- Frontend: AngularJS (1 year experience) - Given a short timeframe it would be better to build a working prototype than to try and develop something without knowing Backbone.js. I chose to use a tool I know well because in the end shipped working code is better than dodgy mostly working code. Additionally, AngularJS' robust directive mechanism, and out of the box bi-directional bindings allow for fast iteration.

 - Compilation: GruntJS: As this application leans heavily on the client side to do most of the work, it seemed reasonable to use a javascript task runner for the source management aspects.

 - Dependency management: Bundler and Bower. The default tools in the Rails and Angular community respectively.

 - Continuous Integration: http://codeship.io - Run specs quickly and integrate with Github with no effort.

 - Deployment: Heroku - Painless deployment with Rails.

   - Trade-offs / Limitations / Thoughts:
- Given the limited time:
     - Test coverage is relatively incomplete. Particularly the missing request / end to end specs are a relatively large oversight
     - Error handling and messaging are not implemented.
     - UI is barebones; Pure CSS framework is hardly being utilized.
     - No API rate limiting

- Current feature set could be implemented entirely in the front end.
- Code is heavily tied to the google.maps object. Would be great to abstract the geolocation logic into a module that could interface with multiple location based services and be accessible through a standard API.

   - Features to add:
- Display Query history
- Return cached results based on previously saved/run queries (across entire table) within a small bounding box.
- Click on marker to get directions
- Media queries for mobile compatibility
   - [http://www.linkedin.com/in/elliotshiu](http://www.linkedin.com/in/elliotshiu)

### API Reference

##### /queries/ - POST

Create a query; receive geolocated data and nearby bicycle parking.

 - Params:
  - address - "string"
  - latitude - "number"
  - longitude - "number"

The server will geolocate based on latitude and longitude then address. If neither are specified, the request's source IP address is used to get an approximate location. The location data is then used to find nearby bicycle parking.

Example response:

```
   { latitude: 37.1234, longitude: -122.38233, address: '1234 Foo St.' , city: 'San Francisco', city_code: 'CA',
postal_code: 94104, nearby_parking: [{ location: 'Blockbuster', address: '456 Bar Ave.', latitude: 37.442, longitude: -122.87621, distance: 0.1223 }]}
```

##### /bicycle

### Development environment setup

To develop on sfbike, the following dependencies are required:

#### Bundler
     > gem install bundler

#### NodeJS
Install the latest Node JS from http://nodejs.org/download then run the following:

    > npm install -g grunt-cli
    > npm install -g bower
    > npm install
    > bower install

#### Install gems
    > bundle install

#### PostgreSQL
    > brew install postresql


Ensure /usr/local/bin is before /usr/bin in your PATH environment variable or you will get this error:

    > psql -d postgres
    > psql: could not connect to server: No such file or directory

Create the pgbike user.

    > createuser -s pgbike

#### Javascript Compilation

To build assets into their proper directories:

    > grunt build

To automatically build assets while developing run:

    > grunt guard

#### Testing

Setup database for testing

    > rake db:migrate db:test:prepare

Run Rspecs
   
    > rake spec

Run Jasmines

    > grunt test