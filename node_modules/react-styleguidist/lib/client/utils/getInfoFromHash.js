import "core-js/modules/es.array.filter";
import isNaN from 'lodash/isNaN';
import { hasInHash, getHashAsArray } from './handleHash';

function filterNumbers(item) {
  return isNaN(parseInt(item, 10)) && item !== '';
}
/**
 * Returns an object containing component/section name and, optionally, an example index
 * from hash part or page URL:
 * #!/Button → { targetName: 'Button' }
 * #!/Button/1 → { targetName: 'Button', targetIndex: 1 }
 *
 * @param {string} hash
 * @returns {object}
 */


export default function getInfoFromHash(hash) {
  var shouldIsolate = hasInHash(hash, '#!/');

  if (shouldIsolate || hasInHash(hash, '#/')) {
    var hashArray = getHashAsArray(hash, shouldIsolate ? '#!/' : '#/');
    var index = parseInt(hashArray[hashArray.length - 1], 10);
    return {
      isolate: shouldIsolate,
      hashArray: hashArray.filter(filterNumbers),
      targetName: hashArray[0],
      targetIndex: isNaN(index) ? undefined : index
    };
  }

  return {};
}