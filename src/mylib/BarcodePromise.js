// Based on https://github.com/metafloor/bwip-js/issues/101#issuecomment-435954848

import bwipjs from 'bwip-js';

const callStack = [];

function next() {
  const { cb, canvas, options } = callStack[0];
  bwipjs(canvas, options, (err, cvs) => {
    if (err) cb(err);
    else cb(null, cvs);
    callStack.shift();
    if (callStack.length) next();
  });
}

function registerNewCallback(cb, canvas, options) {
  callStack.push({ cb, canvas, options });
  if (callStack.length === 1) next();
}

export default /**
 * @arg {string | HTMLCanvasElement} canvas
 * @arg {object} options
 * @return {Promise<HTMLCanvasElement>}
 */
(canvas, options) => {
  return new Promise((resolve, reject) => {
    registerNewCallback(
      (err, cvs) => {
        if (err) reject(err);
        else resolve(cvs);
      },
      canvas,
      options
    );
  });
};
