# Docker file to build develpment environment for the Storage Fusion REST API

# Pull base image
FROM centos:centos6

MAINTAINER Storage Fusion <peter.ullah@storagefusion.com>

# Add Yum repository
RUN yum -y update && yum clean all

RUN rpm -Uvh http://mirror.webtatic.com/yum/el6/latest.rpm

# Install packages that all downstream images may need
RUN \
    yum install -y \
    yum-utils \
    epel-release \
    nodejs \
    vim \
    git.x86_64 \
    && package-cleanup --dupes \
    && package-cleanup --cleandupes \
    && yum clean all \
    # these seem to need installing seperately...
    && yum install -y npm \
    && yum install -y wget \
    && yum install -y tar \
    && yum install -y bzip2 \
    && yum install -y fontconfig freetype libfreetype.so.6 libfontconfig.so.1 libstdc++.so.6 \
    && yum install -y libpng.x86_64 libpng-devel.x86_64 \
    && yum install -y ruby.x86_64 ruby-devel.x86_64 \
    && yum install -y rubygems.noarch rubygems-devel.noarch \
    && gem update --system \
    && gem install compass \ 
    && mkdir -p /app


WORKDIR /app 

COPY package.json /app/package.json
COPY bower.json /app/bower.json
COPY Gruntfile.js /app/Gruntfile.js

RUN \
    npm install -g grunt \
    && npm install -g grunt-cli \
    && npm install -g bower \
    && npm install \ 
    && bower install --allow-root   

EXPOSE 9000