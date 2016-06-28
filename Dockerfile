FROM ubuntu:14.04

# OUTILS DE BASE
RUN sudo apt-get update && \
  sudo apt-get -y install curl nginx nodejs npm
# Install meteor
RUN curl https://install.meteor.com/ | sh

EXPOSE 3000

RUN mkdir /meteor

#ADD ./ /meteor

WORKDIR /meteor

CMD npm install

# launch app
CMD meteor
