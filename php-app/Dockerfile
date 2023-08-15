# Verwenden Sie ein offizielles PHP-Image als Basis
FROM php:8-apache

# Installieren Sie benötigte PHP-Erweiterungen
RUN docker-php-ext-install pdo pdo_mysql
RUN docker-php-ext-install mysqli

# Setzen Sie das Arbeitsverzeichnis im Container
WORKDIR /var/www/html

# Kopieren Sie Ihre Anwendungsdateien in das Arbeitsverzeichnis im Container
COPY ./php-app/ .

# Exponieren Sie den Port, den der Apache-Server im Container verwendet
EXPOSE 80

# Starten Sie den Apache-Server
CMD ["apache2-foreground"]
