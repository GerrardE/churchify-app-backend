const validateUniqueResponse = error => error.errors.reduce((result, currentValue) => {
  if (currentValue.type === 'unique violation') {
    result[currentValue.path] = `${currentValue.path} has already been taken`;
  } else if (currentValue.path) {
    result[currentValue.path] = currentValue.message;
  } else {
    result.global = currentValue.message;
  }
  return result;
}, {});

export default validateUniqueResponse;
