#!/bin/bash

ENV_FILE="./../visao-computacional/.env"
if test -f "$ENV_FILE"; then
  source $ENV_FILE
  if [[ -z "$BUCKET_NAME" ]]; then
    echo "BUCKET_NAME not found on $ENV_FILE"
  else
    if ! command -v aws &> /dev/null
    then
      echo "Make sure to have AWS installed and properly configurated"
      exit 1
    else
      aws s3 sync ./images/ s3://${BUCKET_NAME}
      echo "File sync completed!"
    fi
  fi
else 
  echo "Unable to locate '$ENV_FILE'"
fi

# this script will sync files from ./images/ to s3: upload to s3 missing files
