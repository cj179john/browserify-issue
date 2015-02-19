# Docker file to build develpment environment for the Storage Fusion Collector

# Pull base image
FROM prod.web-app.storagefusion.local:5000/collector-base

MAINTAINER Storage Fusion <peter.ullah@storagefusion.com>

# COPY code into the image
COPY app /app/app
COPY test /app/test
COPY build/test.sh /test.sh

RUN chmod u+x /test.sh
