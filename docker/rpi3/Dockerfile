FROM balenalib/raspberrypi3-node:8

USER root

COPY --from=ctcoss/spark-server --chown=nobody:root /opt/app-root/src/ /opt/app-root
COPY --from=ctcoss/spark-server --chown=nobody:root /usr/libexec/s2i /usr/libexec/s2i

WORKDIR /opt/app-root/src

USER nobody

EXPOSE 5683
EXPOSE 8080

ENV NPM_RUN=start                                   \
    DEV_MODE=false                                  \
    HOME=/opt/app-root/src                          \
    NPM_CONFIG_PREFIX=/opt/app-root/src/.npm-global \
    PATH="$PATH:/opt/app-root/src/node_modules/.bin"

CMD /usr/libexec/s2i/run
