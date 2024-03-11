#!/bin/bash
#Get environment from script input parameters
while getopts "e:" flag
do
    case "${flag}" in
        e) environment=${OPTARG};;
    esac
done

#Error handler
handle_error(){
    echo "ERROR: Deployment failure occured at line $1!!"
    exit 1
}
#Catch errors
trap 'handle_error $LINENO' ERR

#Run Jest Tests
npm run test
echo "Jest tests passed and code coverage threshold met!"

#Deploy components to specificed environment
echo "Deploying to environment" $environment
sf project deploy start -x manifest/package.xml -o $environment