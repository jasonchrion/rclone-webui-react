FROM node:14.19 AS builder

WORKDIR /workspace

COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmmirror.com && npm install

COPY . ./

RUN NODE_OPTIONS=--max_old_space_size=8192 npm run build

FROM alpine:3.15.4

ENV TZ "Asia/Shanghai"
WORKDIR /

COPY --from=builder /workspace/build ./rclone-webui-react

# rclone
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/' /etc/apk/repositories && \
    apk update && apk --no-cache add ca-certificates curl fuse && \
    curl -LO https://downloads.rclone.org/rclone-current-linux-amd64.zip && \
    unzip rclone-current-linux-amd64.zip && \
    mv rclone-*-linux-amd64/rclone /usr/bin/ && \
    rm -rf rclone-*-linux-amd64 rclone-current-linux-amd64.zip

EXPOSE 5572/tcp
ENTRYPOINT ["sh", "-c", "/usr/bin/rclone rcd --rc-addr=0.0.0.0:5572 --rc-allow-origin=* --rc-user=${RCUSER} --rc-pass=${RCPASS} --rc-serve --rc-files=rclone-webui-react --rc-web-gui-no-open-browser"]