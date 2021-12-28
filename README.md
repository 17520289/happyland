# Setup Project GoJapan Docomo Api 

## Installation

Clone the repository

    git clone http://git.hls-dev.asia/hl-solutions/happyland.git

Switch to the repo folder

    cd happyland

Install all the dependencies using composer

    composer install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Run the database migrations and seeder (**Set the database connection in .env before migrating**)

    php artisan migrate
    php artisan db:seed

Start the local development server

    php artisan serve

You can now access the server at http://localhost:8000

