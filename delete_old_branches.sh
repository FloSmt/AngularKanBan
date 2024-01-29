#!/bin/bash
###############################################################
#Master branch, auf den alle gemerged sein sollen
masterBranch="main";

#Branches, die auf keinen Fall gelöscht werden sollen
dontDelete=(
"develop"
"master"
"release/0.1"
"release/1.0"
"release/1.1"
"release/1.1-test"
"release/2.0"
"release/3.0");

#wenn true, werden lokale Branches verwendet (false = remote)
cleanLocal="$2";

#Wie viele Tage muss der letzte Commit dieses Branches alt sein?
timeInDays="$3";

#Wenn true, ist der Testlauf aktiviert (keine Löschung)
dryRun="$1";

#input: <dryRun> <local/remote> <timeInDays>

################################################################

#checkt, ob branch gelöscht werden darf
function isDeletionAllowed()
{
  branch="$1"; #Eingabe aktueller Branch

  for item in "${dontDelete[@]}"; do
    if [ "$branch" == "origin/$item" ] || [ "$branch" == "origin" ] || [ "$branch" == "$masterBranch" ]; then
        #Branch darf nicht gelöscht werden
        return 0;
    fi
  done
  return 1;
};

#checkt, ob Branch alt genug ist
function isOldBranch()
{
  branch="$1"; #Eingabe aktueller Branch
  maxAge="$2"; #Eingabe mindestalter des letzten Commits auf Branch

  let diff=$(date +%s)-$(git show --no-patch --format="%ct" "$branch"); #differenz Heute-letzter Commit

  if [ "$diff" -gt "$maxAge" ]; then
    return 1;
  fi

  return 0;
};


let index=0;
let timeInSeconds;

if  [[ $timeInDays =~ '^[0-9]+$' ]]; then
  timeInSeconds=$timeInDays*24*60*60;
else
  echo "Wrong Input: <dryRun> <local/remote> <timeInDays> (timeInDays has to be a Number)";
  sleep 20;
  exit;
fi

path="";

if [ "$cleanLocal" == "local" ] || [ "$cleanLocal" == "l" ]; then
    path="refs/heads/";
    echo "cleanup LOKAL Branches:";

elif [ "$cleanLocal" == "remote" ] || [ "$cleanLocal" == "r" ]; then
    path="refs/remotes";
    echo "cleanup REMOTE Branches:";
else
    echo "Wrong Input: <dryRun> <local/remote> <timeInDays>";
    sleep 20;
    exit;
fi


echo  "Search deletable Branches...";

#geht alle Branches durch, die bereits zu masterBranch gemerged wurden
for branch in $(git for-each-ref --merged="$masterBranch" --format='%(refname:short)' "$path"); do

  isDeletionAllowed $branch;
  #Steht der Branch in der Liste oben?
  if [ $? -eq 1 ]; then

    isOldBranch $branch $timeInSeconds;
    #ist der Branch alt genug?
    if [ $? -eq 1 ]; then
      name="${branch/'origin/'/''}"; #'origin/' wird ersetzt
      index=$((index+1));
      #ist der Testlauf aktiviert?
      if [ "$dryRun" == "true" ]; then
          echo "$name - will be deleted!";
      else
        #Branches löschen
        if [ "$clearLocal" == "true" ]; then
          echo "TR";
            git branch -d "$name";
        else
            echo "t";
            git push origin --delete "$name"
        fi

        echo "$name deleted!";
      fi
    fi
  fi
done

echo "$index Branches were deleted."

sleep 120;
