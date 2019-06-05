FROM centos/nodejs-8-centos7

LABEL "io.openshift.s2i.build.image"="centos/nodejs-8-centos7" \
      "io.openshift.s2i.build.source-location"="."

ARG DEV_MODE="true"
ARG GITHUB_AUTH_TOKEN

USER root

COPY docker/centos/.s2i/bin/assemble /usr/libexec/s2i

COPY . /tmp/src

RUN PATH=$PATH:/opt/rh/rh-nodejs8/root/usr/bin npm install -g yarn

RUN chown -R 1001:0 /tmp/src /opt/app-root/src

USER 1001

RUN /usr/libexec/s2i/assemble

EXPOSE 5683
EXPOSE 8080

CMD /usr/libexec/s2i/run
