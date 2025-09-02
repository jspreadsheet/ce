module.exports = function (source) {
  let result = source.replace(
    /import\s+jSuites\s+from\s+(?:'|")jsuites(?:'|");?/gm,
    ""
  );

  result = result.replace(
    /import\s+formula\s+from\s+(?:'|")@jspreadsheet\/formula(?:'|");?/gm,
    ""
  );

  return result;
};
