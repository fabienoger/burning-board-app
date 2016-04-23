FROM ubuntu:14.04

# OUTILS DE BASE
RUN sudo apt-get update && \
  sudo apt-get -y install curl nginx
# Install meteor
RUN curl https://install.meteor.com/ | sh

EXPOSE 3000

RUN mkdir /meteor

#ADD ./ /meteor

WORKDIR /meteor

# launch app
CMD meteor
