const generateResponse = (res, success=true, code=200, message="", result=[], error=false) => {
  return res.json({
    success,
    code,
    message,
    result,
    error,
  });
};
export default generateResponse