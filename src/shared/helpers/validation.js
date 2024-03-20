const VALID_STATUS_CODE = 200;
export const checkStatusCode = (statusCode) => {
  if (statusCode === VALID_STATUS_CODE) {
    return true;
  } else {
    throw new Error(`Invalid status code.
    Expected ${VALID_STATUS_CODE}, but received ${statusCode}.`);
  }
};

export const validateURL = (url) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );
  if (pattern.test(url)) {
    return true;
  } else {
    throw new Error(`Invalid url: ${url}`);
  }
};
