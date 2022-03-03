
let domElement = document.querySelector(".loader");

const customEvent = new Event('fetchDataComplete');

domElement.addEventListener('fetchDataComplete', function (evnt) {
  console.log(evnt);
  domElement.style.display = 'none';
  const h1 = document.querySelector(".dontShow");
  h1.style.display = 'block';

 }, false);



/**
 * Run millions of api request in batches.
 * This JS logic helps to hit api in batch of 500 and then next batch of 500
 * @param {*} data 
 * @param {*} startIndex 
 * @param {*} lastIndex 
 * @returns 
 */
const getUrlsData = async (data, startIndex, lastIndex) => {
    const promises = [];
    let promiseCount = 0;
    for(let i= startIndex; i< lastIndex; i++){
      if(urlsData[i]) {
          promises[promiseCount] = fetch(urlsData[i]);
          promiseCount++;
      }
    }
    if(promises.length) {
        const promiseArray = await Promise.all(promises);
        const responseData = await Promise.all(promiseArray);
        const parsedData = await Promise.all(responseData.map(resp => resp ? resp.json() : ''));
        return parsedData.flat();
    }
  }

  const batchOf = 500;
  let batchExecutionCount = 0;
  const urlsData = Array(2000).fill('https://api.github.com/orgs/nodejs');
  let urlDataLength = urlsData.length;
  let startIndex = 0;
  let lastIndex ;
  async function fetchBatchOf500() {
    if(batchExecutionCount > 0) {
        startIndex = (batchOf *batchExecutionCount) + 1;
    }
    lastIndex = startIndex + batchOf;
    if(startIndex > urlDataLength ){
      console.log("Array looping Completed !");
      domElement.dispatchEvent(customEvent);
      alert("Waaw -- data is ready, please check the console !");
      return;
    }
    const batchData = await getUrlsData(urlsData, startIndex, lastIndex);
    console.log(batchData, '--batchData--');
    batchExecutionCount += 1;
    console.log('batchExecutionCount => ', batchExecutionCount);
    setTimeout(fetchBatchOf500, 1000);    
  }

  fetchBatchOf500();

  