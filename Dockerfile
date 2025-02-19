# docker buildx build  --builder=bigdata-builder --platform=linux/amd64,linux/arm64 --provenance=false \
#  --build-arg http_proxy=http://10.16.10.246:1080 --build-arg https_proxy=http://10.16.10.246:1080 --build-arg no_proxy='harbor.dameng.io,git.dameng.com,192.168.115.208' \
#  --push -t harbor.dameng.io/dmcca/rclone-webui:2.0.5 .

FROM node:14.19 AS builder

WORKDIR /workspace

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN NODE_OPTIONS=--max_old_space_size=8192 npm run build

FROM alpine:3.17.4

ARG TARGETARCH

ENV TZ "Asia/Shanghai"
WORKDIR /

COPY --from=builder /workspace/build ./rclone-webui-react

# rclone
RUN set -ex && \
    apk update && apk --no-cache add ca-certificates curl fuse fuse3 && \
    curl -LO https://downloads.rclone.org/rclone-current-linux-${TARGETARCH}.zip && \
    unzip rclone-current-linux-${TARGETARCH}.zip && \
    mv rclone-*-linux-${TARGETARCH}/rclone /usr/bin/ && \
    rm -rf rclone-*-linux-${TARGETARCH} rclone-current-linux-${TARGETARCH}.zip

EXPOSE 5572/tcp
ENTRYPOINT ["sh", "-c", "/usr/bin/rclone rcd --rc-addr=0.0.0.0:5572 --rc-allow-origin=* --rc-user=${RCUSER} --rc-pass=${RCPASS} --rc-serve --rc-files=rclone-webui-react --rc-web-gui-no-open-browser"]
