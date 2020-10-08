import { delay } from '../common/util/util';
import { sampleData } from './SampleData';

export function fetchSamples() {
  return delay(1000).then(function () {
    return  Promise.resolve(sampleData);
  });
}
