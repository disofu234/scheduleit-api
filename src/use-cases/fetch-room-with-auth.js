module.exports = function makeFetchRoomWithAuth(roomsDb) {
  return async function fetchRoomWithAuth(roomId) {
    const {
      users,
      ...roomMetadata
    } = await roomsDb.findRoomWithAuth(roomId);

    const userList = transformUserObjectToList(users);
    const availabilities = userList.map(users => users.availability);

    return {
      ...roomMetadata,
      users: transformUserObjectToList(users),
      timesWhenAllParticipantsAreAvailable: getTimesWhenAllParticipantsAreAvailable(availabilities)
    };
  };
};

const transformUserObjectToList = users => Object.entries(users).map(([id, userInfo]) => ({ id, ...userInfo }));

const getTimesWhenAllParticipantsAreAvailable = availabilities => availabilities.reduce(intersectTwoAvailabilities, initializeIntersectionObject());

const intersectTwoAvailabilities = (availability1, availability2) => {
  const availability1Leaves = getArrOfObjLeaves(availability1);
  const availability2Leaves = getArrOfObjLeaves(availability2);

  const leavesIntersectionArray = [];
  for (i = 0; i < availability1Leaves.length; i++) {
    leavesIntersectionArray.push(availability1Leaves[i] && availability2Leaves[i]);
  };
  
  return constructAvailabilityObject(populateByArray(leavesIntersectionArray));
}

const getArrOfObjLeaves = obj => {
  const objValues = obj.values();
  if (isBoolean(objValues[0])) {
    return objValues;
  } else {
    const unflattenedObjLeaves = objValues.map(obj => getArrOfObjLeaves(obj));
    return unflattenedObjLeaves.flat()
  };
};

const populateByArray = arr => {
  let timesFunctionHasBeenCalled = 0;

  return () => {
    timesFunctionHasBeenCalled++;
    return arr[timesFunctionHasBeenCalled];
  };
};