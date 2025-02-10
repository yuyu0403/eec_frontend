FROM ubuntu:20.04

ARG SERVICE_PORT=5000
ENV SERVICE_PORT ${SERVICE_PORT}
EXPOSE ${SERVICE_PORT}

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && \
    apt install -y software-properties-common && \
    add-apt-repository ppa:deadsnakes/ppa && \
    apt -y install python3.9 python3-pip wget && \
    ln -fs /usr/share/zoneinfo/Asia/Taipei /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata

RUN wget http://140.96.83.224/fastai/ITRIroot256.crt && \
    cp ITRIroot256.crt /usr/local/share/ca-certificates/ && \
    update-ca-certificates

COPY /code.tar.gz .
RUN tar zxvf code.tar.gz; \
    rm -f code.tar.gz; \
    python3.9 -m pip install --no-cache-dir -r requirement.txt; \
    find /usr/local \
        \( -type d -a -name test -o -name tests \) \
        -o \( -type f -a -name '*.pyc' -o -name '*.pyo' \) \
        -exec rm -rf '{}' \+; 
        
CMD gunicorn -b 0.0.0.0:${SERVICE_PORT} \
    -k gevent -t 300 \
    --log-level info \
    app:app