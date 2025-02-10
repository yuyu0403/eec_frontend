#!/bin/bash

ABSPATH=`readlink -f $0`
DIRPATH=`dirname $ABSPATH`
cd ${DIRPATH}

### Load conf/config.ini configuration file ###
source <(grep = conf/config.ini)


## log levels: DEBUG,INFO,WARN,ERROR,FATAL ##
function log() {
  timestamp=`date "+%Y-%m-%d %H:%M:%S"`
  echo "[${USER}][${timestamp}][${1}]: ${2}"
}

main() {
  
  log "INFO" "### Check ${SERVICE_NAME} Service###"
  helm status ${SERVICE_NAME} -n ${SERVICE_NAMESPACE} > /dev/null 2>&1
  ret_val=$?
  if [[ ${ret_val} != 0 ]]; then
     log "ERROR" "The ${SERVICE_NAME} service doesn't exist"
     exit 1
  fi

  log "INFO" "### Wait until all pods are running ###"
  kubectl wait -n ${SERVICE_NAMESPACE} -l app.kubernetes.io/instance=${SERVICE_NAME} --all pod --for=condition=Ready --timeout=300s &>/dev/null
  ret_val=$?
  if [[ ${ret_val} -ne 0 ]]; then
    log "ERROR" "Timed out waiting"
    exit ${ret_val}
  fi

  helm test ${SERVICE_NAME} -n ${SERVICE_NAMESPACE} > /dev/null 2>&1
  ret_val=$?
  if [[ ${ret_val} -eq 0 ]]; then
     log "INFO" "Test connection has succeeded"
     exit ${ret_val}
  else
     log "ERROR" "Test connection has failed"
     exit ${ret_val}
  fi
}

main "$@"

