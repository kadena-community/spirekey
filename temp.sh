set -e

timestamp=`date +%Y%m%d%H%M%S`

for i in `seq 1 3`;
do
    fresh_dir="$HOME/.fresh-chrome$(( ( RANDOM )  + 1 ))"
    echo "$fresh_dir"
    exec open -na "Google Chrome" --args "--user-data-dir=$fresh_dir" "--incognito" "--no-first-run" &
    sleep 1
done