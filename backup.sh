#!/bin/sh -x

filename=pierrepapierciseaux

zipfile=$filename.zip

currentDir=`pwd`

cd ..

zip -r $zipfile $filename -x "*.vscode/*" "*.editorconfig" "*.project" "*.settings/*" "*node_modules/*" "*.git/*" "*dist/*" ".gitignore"

mv -f $zipfile /home/stephane/backup

cd $currentDir
