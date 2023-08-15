# Verwenden Sie ein Basisimage, das für Ihre Anwendung geeignet ist
FROM ubuntu:latest

# Führen Sie die notwendigen Befehle aus, um Ihre API-Abhängigkeiten zu installieren
# Zum Beispiel:
RUN apt-get update && apt-get install -y curl

# Setzen Sie das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopieren Sie Ihre API-Anwendungsdateien in das Arbeitsverzeichnis im Container
COPY ./api/ .

# Definieren Sie, wie Ihre API gestartet wird
# Zum Beispiel:
CMD ["node", "app.js"]
