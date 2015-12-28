exports.findConnections = function findConnections(list, userId, result, distance) {
  result = result || {};
  distance = distance || 0;
  result[userId] = distance;
  list[userId].edges.forEach(function (id) {
    if (!result.hasOwnProperty(id)) {
      findConnections(list, id, result, distance + 1)
    }
  })
  return result;
}

exports.adjacencyList = function (connections) {
  var output = {};
  connections.forEach(function (user) {
    populate(output, user.user_id, user.name, user.other_id)
    populate(output, user.other_id, user.other_name, user.user_id)
  })
  return output;
}

function populate(output, user_id, name, other_id) {
  if (!output.hasOwnProperty(user_id)){
    output[user_id] = {
        name: name,
        edges: [other_id]
    }
  } else {
    output[user_id].edges.push(other_id)
  }
}
