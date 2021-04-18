develop="develop"
production="production"

export $(grep -v '^#' .env | xargs)

if [ -z $1 ]
then 
   echo "Please enter a valid deployment environment"
else
  if [ $1 = $develop ]
  then
    clasp setting scriptId $DEVELOP_SCRIPT_ID
    echo "Deploying to [develop]..."
    clasp push
  elif [ $1 = $production ]
  then 
    clasp setting scriptId $PRODUCTION_SCRIPT_ID
    echo "Deploying to [production]..."
    clasp push
  fi
  clasp setting scriptId $DEVELOP_SCRIPT_ID
fi