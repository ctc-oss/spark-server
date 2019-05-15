FROM centos/nodejs-8-centos7

LABEL "io.openshift.s2i.build.image"="centos/nodejs-8-centos7" \
      "io.openshift.s2i.build.source-location"="."

ARG DEV_MODE="true"
ARG GITHUB_AUTH_TOKEN

USER root

COPY docker/centos/.s2i/bin/assemble /usr/libexec/s2i

COPY dist/ src/ package.json yarn.lock /tmp/src/

RUN chown -R 1001:0 /tmp/src /usr/libexec/s2i/assemble

USER 1001

RUN /usr/libexec/s2i/assemble

CMD /usr/libexec/s2i/run
