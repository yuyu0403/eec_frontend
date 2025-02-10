#!/bin/bash

ABSPATH=`readlink -f $0`
DIRPATH=`dirname $ABSPATH`
cd ${DIRPATH}

### Load conf/config.ini configuration file ###
source <(grep = conf/config.ini)

### Add deploy script ###
## log levels: DEBUG,INFO,WARN,ERROR,FATAL ##
function log() {
  timestamp=`date "+%Y-%m-%d %H:%M:%S"`
  echo "[${USER}][${timestamp}][${1}]: ${2}"
}
# =============================

if ! $(kubectl get namespace ${SERVICE_NAMESPACE} > /dev/null 2>&1); then
    log "INFO" "Create Namespace: ${SERVICE_NAMESPACE}"
    kubectl create namespace ${SERVICE_NAMESPACE}
fi

log "INFO" "Installing ${SERVICE_NAME} with Helm"
helm upgrade ${SERVICE_NAME} deploy/helm \
    --install \
    --namespace ${SERVICE_NAMESPACE} \
    --create-namespace \
    --wait \
    --timeout=600s \
    --set fullnameOverride=${SERVICE_NAME} \
    --set image.repository=${IMAGE_NAME} \
    --set image.tag=${IMAGE_TAG} \
    --set service.type="ClusterIP" \
    --set service.port=${SERVICE_PORT} \
    --set service.targetPort=${SERVICE_TARGET_PORT} \
    --set ingress.enabled=true \
    --set ingress.annotations.'kubernetes\.io/ingress\.class'="nginx" \
    --set ingress.hosts[0].host=${DEFAULT_DOMAIN}  \
    --set ingress.hosts[0].paths[0].path="/portal(/|$)(.*)" \
    --set ingress.hosts[0].paths[0].pathType="Prefix" \
    --set ingress.annotations.'nginx\.ingress\.kubernetes\.io/rewrite-target'="/\$2" \
    --set ingress.tls[0].secretName=rpm-tls-secrets \
    --set ingress.tls[0].hosts[0]=${DEFAULT_DOMAIN} \
    --set ingress.annotations.'nginx\.ingress\.kubernetes\.io/auth-signin'="https://${DEFAULT_DOMAIN}/oauth2/start?rd=/portal" \
    --set ingress.annotations.'nginx\.ingress\.kubernetes\.io/auth-url'="https://${DEFAULT_DOMAIN}/oauth2/auth"
