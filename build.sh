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
  
  log "INFO" "### Build ${IMAGE_NAME} Image ###"
  tar -C ${CODE_PACKAGE_PATH} --exclude='*.pyc' \
    -zcvf code.tar.gz .
  docker build --network=host -t "${BUILD_IMAGE_NAME}":"${BUILD_IMAGE_TAG}" \
	 --build-arg SERVICE_PORT="${SERVICE_PORT}" . \
	 --no-cache=${BUILD_NO_CACHE} 
  ret_val=$?
  if [[ ${ret_val} != 0 ]]; then
     log "ERROR" "Failed to build ${BUILD_IMAGE_NAME}:${BUILD_IMAGE_TAG} image"
     exit 1
  fi
  # ## Push image to harbor
  # docker push ${BUILD_IMAGE_NAME}:${BUILD_IMAGE_TAG}
  # ret_val=$?
  # if [[ ${ret_val} != 0 ]]; then
  #    log "ERROR" "Failed to push ${BUILD_IMAGE_NAME}:${BUILD_IMAGE_TAG} image to harbor"
  #    exit 2
  # fi
}

main "$@"

