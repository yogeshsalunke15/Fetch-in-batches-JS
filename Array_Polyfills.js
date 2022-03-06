
/**
 * This file demonstrates, how we can write our custom methods for Build in Array Methods
 * 
 */

 const products = [
   { name: 'apples', category: 'fruits' },
   { name: 'oranges', category: 'fruits' },
   { name: 'potatoes', category: 'vegetables' }
 ];

 /**
  * This method shows how can we group array of Object by any of attribute in object. 
  */
 const groupByCategory = products.reduce((group, product) => {
   const { category } = product;
   group[category] = group[category] ?? [];
   group[category].push(product);
   return group;
 }, {});
 


 const sampleArray  = [1,2,3,4,5,7,8,9,10];

	// Function has to be conventional anonymous function, arrow function don't work here, since don't have access to this inside.
    
    /**
     * This is custom method for built in Array Map
     * @param {*} callbackFun 
     * @returns 
     */
    Array.prototype.myMap = function(callbackFun){ 
        const resultArray = []; 
        for(let i=0; i<this.length; i++) {
            resultArray.push(callbackFun(this[i], i,this)); // i & this  => is optional parameters if don't need it in myMap function
        }
        return resultArray;
    }
	//calling cutom map function
    const updatedArray = sampleArray.myMap((x, index, fullArray)=>{
        console.log(index, 'index');
        console.log(fullArray, 'FullArray');
        return x*2;
    });



    /**
     * This is custom method for built in Array Filter	
     * @param {*} callbackFun 
     * @returns 
     */
    Array.prototype.myFilter = function(callbackFun){ 
        const resultArray = []; 
        for(let i=0; i<this.length; i++) {
            if(callbackFun(this[i], i,this)){
            resultArray.push(this[i]); 
            }
        }
        return resultArray;
    }
    const filteredArray = sampleArray.myFilter(element => element >3);
    console.log(filteredArray);



    /**
     * This is custom method for built in Array Reduce	
     * @param {*} callbackFun 
     * @param {*} accumulator 
     * @returns 
     */
    Array.prototype.myReduce = function(callbackFun, accumulator){
        if(this.length < 1) {
            throw new Error("Array is Empty")
        }
        if(!accumulator) {
            if(typeof this[0] === "string") {
                accumulator = '';
            } else if(typeof this[0] === "number") {
                accumulator = 0;
            }
        }

        for(let i=0; i<this.length; i++) {
            accumulator = callbackFun(accumulator, this[i]); 
        }
        return accumulator;
    }

    const reducedArray = sampleArray.myReduce((acc, element)=>{
    return acc + element;
    });
    console.log(reducedArray);



    /**
     * This is custom method for built in Array Reverse	
     * @returns  
     */
	Array.prototype.myReverse = function(){ 
        const resultArray = []; 
        for(let i=this.length-1; i>=0; i--) {
            resultArray.push(this[i]);
        }
        return resultArray;
    }
    const reversedArrray = sampleArray.myReverse();
    console.log(reversedArrray);
 
