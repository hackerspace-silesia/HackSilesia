#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# Add github deployment key
openssl aes-256-cbc -K $encrypted_27fd8e96ebe8_key -iv $encrypted_27fd8e96ebe8_iv -in github_deploy_key.enc -out github_deploy_key -d
chmod 600 github_deploy_key
eval `ssh-agent -s`
ssh-add github_deploy_key

# clear and re-create the out directory
rm -rf deploy || exit 0;

# run our compile script, discussed above
npm start

# go to the out directory and create a *new* Git repo
cd deploy
git init

# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "travis@hacksilesia.pl"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Automatic deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "git@github.com:${GH_REF}" master:gh-pages > /dev/null 2>&1
