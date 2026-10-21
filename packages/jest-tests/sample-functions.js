function div(a, b) {
  return a / b;
}

function containsNumbers(text) {
  for (let i = 0; i < text.length; i++) {
    if (/\d/.test(text.charAt(i))) return true;
  }
  return false;
}

exports.div = div;
exports.containsNumbers = containsNumbers;
