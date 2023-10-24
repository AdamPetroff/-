# author: https://blog.harrison.dev/2016/06/19/integration-testing-with-docker-compose.html
# this script is used to run tests for the backend
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
cleanup () {
  docker-compose -p ci kill
  docker-compose -p ci rm -f
}
trap 'cleanup ; printf "${RED}Tests Failed For Unexpected Reasons${NC}\n"' HUP INT QUIT PIPE TERM
docker-compose -p ci -f docker-compose.testing.yml build && docker-compose -p ci -f docker-compose.testing.yml up -d
if [ $? -ne 0 ] ; then
  printf "${RED}Docker Compose Failed${NC}\n"
  exit -1
fi

docker-compose -f docker-compose.testing.yml -p ci run --rm backend-test sh -c "npm run test" | tee output.log
TEST_EXIT_CODE=${PIPESTATUS[0]}

docker logs ci-backend-test-1
if [ -z ${TEST_EXIT_CODE+x} ] || [ "$TEST_EXIT_CODE" -ne 0 ] ; then
  # docker logs ci_seed_1
  # docker logs ci_db_1
  # docker logs ci_fun_1
  printf "${RED}Tests Failed${NC} - Exit Code: $TEST_EXIT_CODE\n"
else
  printf "${GREEN}Tests Passed${NC}\n"
fi
cleanup
exit $TEST_EXIT_CODE